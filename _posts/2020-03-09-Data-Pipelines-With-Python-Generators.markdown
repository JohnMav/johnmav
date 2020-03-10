---
layout: post
title:  "Data Pipelines With Python Generators"
date: 2020-03-09 20:18:00 +0800
categories: python
---

In my [last post]({% post_url 2020-03-02-Containers-Iterators-Generators-Oh-My %}) we learned a little bit about generators. In this post we'll spend some time understanding generators and how they can be used to build out a simple data pipeline. 

In case you forgot generators are iterators which utilize `yield` to output 1 result at a time minimizing the impact on memory. Generators become useful in handling large batches of data and performing distinct operations on each input. 

Suppose we want to build a simple pipeline that took a set of first and last names structured like `last name, first name` and we wanted to structure them for insertion into a data warehouse. 

```csv
Xi, Zhang
O'rourke, Lenny
Moore, Trevor
Rivani, Lisa
```

The first step in our pipeline can simply read in each row and yield the result. 

```python
def read_csv(file_path):
    with open(file_path) as csvfile:
        csv_reader = csv.reader(csvfile, delimiter=',')
        for rows in csv_reader:
            yield rows
```

This will read in each set of csv rows and output them as `['last name' , 'first name']`. Now lets make each set of lists all lower case

```python
def process_name(rows):
    for row in rows:
        yield map(str.lower, row)
```

Now we can run this pipeline and see the result

```python
pipeline = process_name(read_csv('names.csv'))
for result in pipeline:
    print(result)
    ## We could also do our warehouse insert steps at this point in the pipeline.
```