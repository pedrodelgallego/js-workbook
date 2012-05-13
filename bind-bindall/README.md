Bind and BindAll
================

A common pitfall any javascript programmer to pass a callback to a
function and use this inside of the function without knowing that in
the new scope this has change its semantics meaning.

This is common source of bugs in code using jQuery callback or
setTimeouts functions.
```javascript
$('.report').click(function() {
  $(this).after('<a href="#" id="confirm">Confirm</a>'); $('#confirm').click(function() {
    var action = $(this).data('action');
    // why is action undefined???
  });
});
```

One way to solve this it is creates a new function that, when called,
invokes `func` with the `this` binding of `thisArg` and prepends any
additional `bind` arguments to those passed to the bound function.
Lazy defined methods may be bound by passing the object they are bound
to as `func` and the method name as `thisArg`.

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
