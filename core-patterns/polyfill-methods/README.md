Polyfill and Feature Detection
==============================

A polyfill is a piece of code that provides the functionality that
other browsers provide natively, creating a flatter API across
different browsers.

A classical example of functions that many frameworks are structure
around its forEach, ECMAScript 5 has a native forEach implementation.
Most of the frameworks will delegate to the native function if
available.

The API
-------

*each _.each(list, iterator, [context]) Alias: forEach*

Iterates over a list of elements, yielding each in turn to an iterator
function. The iterator is bound to the context object, if one is
passed. Each invocation of iterator is called with three arguments:
(element, index, list). If list is a JavaScript object, iterator's
arguments will be (value, key, list). Delegates to the native forEach
function if it exists.

```javascript
_.each([1, 2, 3], function(num){ alert(num); });
=> alerts each number in turn...
_.each({one : 1, two : 2, three : 3}, function(num, key){ alert(num); });
=> alerts each number in turn...
```

*map _.map(list, iterator, [context]) Alias: collect*

Produces a new array of values by mapping each value in list through a
transformation function (iterator). If the native map method exists,
it will be used instead. If list is a JavaScript object, iterator's
arguments will be (value, key, list).
```javascript
_.map([1, 2, 3], function(num){ return num * 3; });
=> [3, 6, 9]
_.map({one : 1, two : 2, three : 3}, function(num, key){ return num * 3; });
=> [3, 6, 9]
```

*reduce _.reduce(list, iterator, memo, [context]) Aliases: inject, foldl*

Also known as inject and foldl, reduce boils down a list of values
into a single value. Memo is the initial state of the reduction, and
each successive step of it should be returned by iterator.

```javascript
var sum = _.reduce([1, 2, 3], function(memo, num){ return memo + num; }, 0);
=> 6
```

Beyond the basic polyfill
-------------------------

Poyfill methods come with a price A great advice from the modernizr documentation:

> And good news for you, there is a polyfill for nearly every HTML5
> feature that Modernizr detects. Yup. So in most cases you can use a
> HTML5 or CSS3 feature and be able to replicate it in non-supporting
> browsers. Yes, not only can you use HTML5 today, but you can use it
> in the past, too!
> But that leads to a big, fat warning: just because you can use a
> polyfill doesn’t mean you should. You want to deliver the best user
> experience possible, which means it should be quick! Loading five
> compatibility scripts for IE7 so it looks and works the exact same
> as Chrome and Opera isn't a wise choice. There are no hard and fast
> rules, but keep in mind how adding more scripts to the page can
> impact the user experience. And remember, none of your users view
> your site in more than one browser; It’s okay if it looks and acts
> differently.
