Bind and BindAll
================

A common pitfall any javascript programmer to pass a callback to a
function and use this inside of the function without knowing that in
the new scope this has change its semantics meaning.

This is common source of bugs in code using jQuery callback or
setTimeouts functions.

```javascript
var hello = function(){console.log("hello " + this.name)}
setTimeout(hello({name: "Pedro"}), 1000);
=> 'hi: moe'
setTimeout(bind(hello, {name: "Pedro"}), 1000);
```
In JavaScript, the meaning of this isn't always intuitive. Consider
this code:
```javascript
var PlayerList;

PlayerList = (function() {
  function PlayerList(el) {
    this.el = $(el).on('click', 'li', this.clicked);
  }

  PlayerList.prototype.clicked = function(e) {
    return this.highlight();
  };

  PlayerList.prototype.highlight = function() {
    // ...
  };

  return PlayerList;
})();
```
One might expect that this in the clicked method to be our PlayerList
instance, but instead, it'll be the row which is clicked. This means
that the call to highlight will fail, since the html row element
doesn't have a highlight method. That clicked exists as a method of
DataTable doesn't mean much.

One way to solve this it is creates a new function that, when called,
invokes `func` with the `this` binding of `thisArg` and prepends any
additional `bind` arguments to those passed to the bound function.
Lazy defined methods may be bound by passing the object they are bound
to as `func` and the method name as `thisArg`.

The bind function its also use to mimic partial application in
javascript.

The API
-------

This is the approach that underscore.js takes in its implementation of
the bind method. Let's take a look at the API of bind in uderscore.

**bind_.bind(function, object, [\*arguments])**

Bind a function to an object, meaning that whenever the function is
called, the value of this will be the object. Optionally, bind
arguments to the function to pre-fill them, also known as partial
application.
```javascript
var func = function(greeting){
    return greeting + ': ' + this.name;
};
func = _.bind(func, {name : 'moe'}, 'hi');
func();
=> 'hi: moe'
```

**bindAll_.bindAll(object, [*methodNames])**

Binds a number of methods on the object, specified by methodNames, to
be run in the context of that object whenever they are invoked. Very
handy for binding functions that are going to be used as event
handlers, which would otherwise be invoked with a fairly useless this.
If no methodNames are provided, all of the object's function
properties will be bound to it.
```javascript
var buttonView = {
  label   : 'underscore',
  onClick : function(){ alert('clicked: ' + this.label); },
  onHover : function(){ console.log('hovering: ' + this.label); }
};
_.bindAll(buttonView);
jQuery('#underscore_button').bind('click', buttonView.onClick);
=> When the button is clicked, this.label will have the correct value...
```

Code Reading
------------
The fat arrow operator in javascript was introduced to solve this
problem.
```coffeescript
class PlayerList
  constructor: (el) ->
    @el = $(el).on 'click', 'li', @clicked

  clicked: (e) =>
    this.highlight()

  highlight: =>
    ....
```
Lets take a look at the compile output of the PlayerList class, when
we use the fat arrow to define the method clicked.
```javascript
var PlayerList,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

PlayerList = (function() {

  PlayerList.name = 'PlayerList';

  function PlayerList(el) {
    this.highlight = __bind(this.highlight, this);

    this.clicked = __bind(this.clicked, this);
    this.el = $(el).on('click', 'li', this.clicked);
  }

  PlayerList.prototype.clicked = function(e) {
    return this.highlight();
  };

  PlayerList.prototype.highlight = function() {};

  return PlayerList;
})();
```
