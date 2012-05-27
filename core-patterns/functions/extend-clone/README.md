Extend and clone objects
===============================

A common feature in many JavaScript libraries is the hability of
extending and cloning objects. In computer sciences We can distinct
between a shallow copy and a deep copy of an object.

We are going to focus in how to perform a shallow copies. A shallow
copy constructs a new compound object and then (to the extent
possible) inserts references into it to the objects found in the
original.

The extend method is an essential part in many frameworks. In the code
reading of this kata we will go into how jQuery use extend internally
to add function to the jQuery namespace and how CoffeeScrip use
internally __extend to create class inheritance.

The API
-------
We are going to implement clone and extend function as they are
described in the underscore documentation.

**clone _.clone(object) **

Create a shallow-copied clone of the object. Any nested objects or
arrays will be copied by reference, not duplicated.

```javascript
_.clone({name : 'moe'});
=> {name : 'moe'};
```

**extend _.extend(destination, *sources)**

Copy all of the properties in the source objects over to the
destination object, and return the destination object. It's in-order,
so the last source will override properties of the same name in
previous arguments.

```javascript
_.extend({name : 'moe'}, {age : 50});
=> {name : 'moe', age : 50}
```

Code Reading Section
--------------------
