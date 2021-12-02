---
layout: post
title:  "Advent of Code with dbt + Postgres (part 1)"
date: 2021-12-02 14:02:00 +0800
categories: data
---

It's that time of year again for the Advent of Code! This year instead of taking the time to learn a new language, e.g. last year I enjoyed learning some Scala, I thought I would try to see how far I would be able to go by just using plain ol' SQL. 

Well... almost plain ol' SQL. Since [dbt](https://www.getdbt.com/) has become the norm for data transformation I was going to see how far along I would be able to go with dbt and SQL. 

## The Setup
Besides what `dbt init` gives us the only personal additions I included were a docker compose file to spin up a postgres instance to use (yes yes, probably overkill for this)

```yaml
version: '3.1'

services:
  aoc_db:
    image: postgres
    restart: always
    environment:
      POSTGRES_USER: johnmav
      POSTGRES_PASSWORD: test
    ports:
      - "5432:5432"
```

and a small makefile so it was easy to setup/teardown the postgres instance

```makefile
start-postgres:
	docker compose -f stack.yml up --remove-orphans
stop-postgres:
	docker compose -f stack.yml down
```

Other than that we have what dbt generates for us in a project.

## Puzzle 1 Part A
Day 1 of the Advent of Code Parts A/B can be found [here](https://adventofcode.com/2021/day/1)

dbt made it easy to load the puzzle inputs by simply copying the data into a `.csv` file and placing it into the `data/` directory, then updating `dbt_project.yml` with

```yaml
seeds:
  advent_of_code:
    +enabled: true
    +schema: seed_data
    puzzle_1:
      +column_types:
        depth: int
```

We can now run `dbt seed` in our terminal and voilá! Our puzzle input data is readily available in our postgres instance ready to be messed around with. We'll note that this new seeded data is not in our `public` schema but in our `public_seed_data` schema

Part A of Day 1's puzzle boiled down to map-reduce type puzzle where the mapping is simply looking at if the prior steps measurements was smaller or larger than the current step.

So to model out whether each step was an INCREASE or not from the last step we can create a query in our `models/` directory which I called `models/puzzle_1/puzzle_1_part_a.sql`

```sql
SELECT
    ROW_NUMBER() OVER () AS step,
    depth,
    CASE
        WHEN depth - LAG(depth) OVER () > 0
        THEN TRUE
        ELSE FALSE
    END AS increased
FROM {{ ref('puzzle_1') }}
```

A pretty simple query, for each step in our depth we check if the prior step was smaller, if so then we have an increase! The dbt magic is mostly in the `{{ ref('puzzle_1') }}` which simply just uses the reference to our seeded table. 

Once we have that created in our models we can run `dbt run` and we end up with a pretty simple table that indicates the step, the current depth, and whether or not we increased in depth. 

Finally to get our solution I added a new `.sql` file to our analysis directory `analysis/puzzle_1_part_a.sql`

```sql
SELECT
    COUNT(
        CASE WHEN increased
             THEN row_number
             ELSE NULL
        END
    ) AS depth_increase_count
FROM {{ ref('puzzle_1_part_a') }}
```

Once we run `dbt compile` this converts our sql into a usable query that we could potentially use in a dashboarding tool, notebook, sql editor whatever. Our compiled sql looks like 

```sql
SELECT
    COUNT(
        CASE WHEN increased
             THEN row_number
             ELSE NULL
        END
    ) AS depth_increase_count
FROM "postgres"."public"."puzzle_1_part_a"
```

## Puzzle 1 Part B
For Part B we are doing a similar approach but doing the same operation across a sliding window. We can simply create depth groups using a CTE and then use roughly the same query as we used in part A on the depth groups. 

```sql
WITH depth_groups AS (
	SELECT 
		ROW_NUMBER() OVER () AS group_number,
		SUM(depth) OVER (ROWS BETWEEN CURRENT ROW AND 2 FOLLOWING) AS depth_sum
	FROM {{ ref('puzzle_1') }}
)

SELECT
	group_number,
    depth_sum,
    CASE
        WHEN depth_sum - LAG(depth_sum) OVER () > 0
        THEN TRUE
        ELSE FALSE
    END AS increased
FROM depth_groups
```

So this works. But the section outside of the CTE is pretty similar to what we did in Part A. In an effort to not repeat ourselves and utilize some more features of both Jinja and dbt we can create a reusable macro. In the `macros/` directory lets create a `puzzle_1_compute_increases.sql` file that looks like 

```sql
{% raw %}
{% macro compute_increases(table_name, column_name) %}
SELECT
    ROW_NUMBER() OVER () AS step,
    {{ column_name }},
    CASE
        WHEN {{ column_name }} - LAG({{ column_name }}) OVER () > 0
        THEN TRUE
        ELSE FALSE
    END AS increased
FROM {{ table_name }}
{% endmacro %}
{% endraw %}
```

Simply our macro will take a table name and column name and perform the operations needed to compute whether a new depth is an increase over the last depth. 

Now our solution to part A simply becomes:

```sql
{% raw %}
{{ compute_increases(ref('puzzle_1'), 'depth') }}
{% endraw %}
```

and Part B becomes:

```sql
{% raw %}
WITH depth_groups AS (
	SELECT 
		SUM(depth) OVER (ROWS BETWEEN CURRENT ROW AND 2 FOLLOWING) AS depth_sum
	FROM {{ ref('puzzle_1') }}
)

{{ compute_increases('depth_groups', 'depth_sum') }}
{% endraw %}
```

Entirely too much for this simple problem? Probably! Could we name things better, always. But you can imagine as things get more complicated these reusable components of sql code can be quite handy to have in our toolbox.