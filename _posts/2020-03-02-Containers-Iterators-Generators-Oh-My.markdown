---
layout: post
title:  "Containers, Iterators, and Generators... Oh My!"
date: 2020-03-02 21:12:00 +0800
categories: python, iterable
---

One thing that I often find myself having to refresh my memory on is the nuances between the several ways python provides objects and classes for you to loop through. I'm talking about containers, iterators, and generators. If you're like me and often find yourself trying to decide whether you should use `yield` or not hopefully this can help! 

Containers are pretty much exactly what they sound like! They "contain" elements. Lists, Sets, Dictionaries, Tuples, Strings are all common containers that you've probably used without even realizing that these are all just similar data structures for storing information. Lists and Strings for instance behave very similarly. Suppose we have: 

```python
list_a = ['C','O','N','T','A','I','N','E','R']
string_a = 'CONTAINER'
```

On the surface yes these may seem quite different however the methods we can use to examine the contents of both `list_a` and `string_a` are quite the same.

```python
>>> list_a[0]
'C'
>>> string_a[0]
'C'
>>> 'O' in string_a
True
>>> 'O' in list_a
True
>>> 
```

Generally an object in python should be treated as a container if you can inspect whether a specific element is contained in that object. 

Now what separates a container from an iterable? Well one thing that differentiates the two, is that an iteratable is _not_ necessarily a data structure. Containers are stored in memory, where as iteratables are objects which return an iterator.

An iterator holds the state of where we are within an iterable. 

Take for instance:

```python
a = [x*x for x in (1,2,3,4)]
```

This produces the iterable `[1,4,9,16]` now suppose we wish to get the first element, then the second element, etc... One way we could do this is by explicitly using an iterators `next` method.

```python
>>> b = iter(a)
>>> next(b)
1
>>> next(b)
4
>>> next(b)
9
>>> next(b)
16
```

This is more or less what happens when we use `for...in` i.e.

```python
for i in a:
    print(i)

>>> 1
>>> 4
>>> 9
>>> 16
```

Iterators in turn are stateful helper objects that produce the next value in an iterable using the `__next__()` method. Iterators hold internal state and therefore know what the "next" value will be the next time you need it. 

Now how do generators differ? Generators are actually quite like iterators but a little more nuanced and dare I say... fancy. 

Generators much like iterators will produce values much like an iterator and not rely on them being explicitly stored in the memory of that object. Generators use `yield` to define generator functions but we can also create generators using generator expressions. 

Remember that `[x*x for x in (1,2,3,4)]` we used above? That was a generator expression! Fun fact about Generators, all of them are iterators (but not the other way around). 

Using `yield` we can do the same thing with a generator function:

```python
>>> def my_generator(numbers):
...     for i in numbers:
...             yield i * i
... 
>>> my_generator((1,2,3,4))
<generator object my_generator at 0x1030c3450>
>>> list(my_generator((1,2,3,4)))
[1, 4, 9, 16]
```

So why use generators vs iterators? Well they typically allow you to write streaming code, are more memory and CPU efficient, and often times they take less lines of code!
