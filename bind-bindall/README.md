Bind and BindAll
================

A common pitfall any javascript programmer to pass a callback to a
function and use this inside of the function without knowing that in
the new scope this has change its semantics meaning.

In JavaScript, the meaning of this isn't always intuitive. This is
common source of bugs in code using jQuery callback or setTimeouts
functions. Consider this example.

```javascript
var hello = function(){console.log("hello " + this.name)}
setTimeout(hello({name: "Pedro"}), 1000);
=> 'hello'
```

```javascript
var PlayersView = (function() {
  return PlayersView(el) {
    this.el = $(el).on('click', 'li', this.clicked);

    this.clicked = function(e) {
      // ...
    };
  }

  return PlayersView;
})();

// ...
$("players").click(playersView.clicked);
```
One might expect that this in the clicked method to be our PlayersView
instance, but instead, it'll be the row which is clicked. This means
that the call to highlight will fail, since the html row element
doesn't have a highlight method. That clicked exists as a method of
DataTable doesn't mean much.

jQuery provides us with a function that helps us to indicate explicitly what
context the function should be executed.

```javascript
$("players").click($.proxy(playersView.clicked));
```

This method is most useful for attaching event handlers to an element
where the context is pointing back to a different object.

One way to workaround the JavaScript context changes is to create a
new function that, when called, invokes `func` with the `this` binding
of `thisArg` and prepends any additional `bind` arguments to those
passed to the bound function.

The API
-------

Another library that implements this concept, underscore.js. it has
two methods that helps us to change the context in which a function is
going to be executed takes in its implementation of the bind method.
Let's take a look at the bind and bindAll methods in underscore.

**bind bind(function, object, [\*arguments])**

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

**bindAll bindAll(object, [*methodNames])**

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
class PlayersView
  constructor: (el) ->
    @el = $(el).on 'click', 'li', @clicked

  clicked: (e) =>
    # ...
```

Lets take a look at the compile output of the PlayersView class, when
we use the fat arrow to define the method clicked.

```javascript
var PlayersView,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
PlayersView = (function() {

  function PlayersView(el) {
    this.highlight = __bind(this.highlight, this);
    this.el = $(el).on('click', 'li', this.clicked);
  }

  PlayersView.prototype.clicked = function(e) {};

  return PlayersView;
})();
```
