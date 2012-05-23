The pubsub or Event Emitter pattern
===================================

> Beyond events that are native to the browser, you can trigger and bind
> them to your own custom events. Indeed, it’s a great way of
> architecting libraries—a pattern a lot of jQuery plug-ins use. The W3C
> spec for custom events has been largely ignored by the browser
> vendors; you’ll have to use libraries like jQuery or Prototype for
> this feature. [Javascript Web Applications, Macman]

The goal of this kata is to build a simple and easy to use event
emitter library. The event emitter will allow us to create our own
custom events.

Let's take for example the NodeJS Event emitter API. Many objects in
Node emit events. All objects which emit events are instances of
EventEmitter, Event names are represented by string, and functions can then
be associated to event in order to be executed when an event is
emitted. These functions are called listeners or handlers.

Start by running the test suite, implemented the necessary functions
in the emitter.js file in order to make all the test pass.
```javascript
mocha specs/emitter-specs.js
```

The API
-------

**emitter.on(event, listener)**

Adds a listener to the end of the listeners array for the specified event.
```javascript
server.on('connection', function (stream) {
  console.log('someone connected!');
});
```

**emitter.emit(event, listener)**

Execute each of the listeners in order with the supplied arguments.
```javascript
emitter.emit('connection');
```

**emitter.once(event, listener)**

Adds a one time listener for the event. The listener is invoked only
the first time the event is fired, after which it is removed.
```javascript
server.once('connection', function (stream) {
  console.log('Ah, we have our first user!');
});
```

**emitter.removeListener(event, listener)**

Remove a listener from the listener array for the specified event.
Caution: changes array indices in the listener array behind the
listener.
```javascript
var callback = function(stream) {
  console.log('someone connected!');
};
server.on('connection', callback);
// ...
server.removeListener('connection', callback);
```

Code Reading Section
--------------------

Many frameworks implement their own emitter pattern. I.e

jQuery use a
```javascript
one: function( types, selector, data, fn ) {
  return this.on( types, selector, data, fn, 1 );
},
```

```javascript
if ( one === 1 ) {
  origFn = fn;
  fn = function( event ) {
    // Can use an empty set, since event contains the info
    jQuery().off( event );
    return origFn.apply( this, arguments );
  };
  // Use same guid so caller can remove using origFn
  fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
}
```

Now, that we have seen how jQuery use a unique guid to identify
functions, how this affect the proxy function that we study in the
"bind and bindAll" chapter? jQuery makes sure that even if you bind
the function returned from jQuery.proxy() it will still unbind the
correct function if passed the original. However, jQuery's event
binding subsystem assigns a unique id to each event handling function
in order to track it when it is used to specify the function to be
unbound. The function represented by $.proxy() is seen as a single
function by the event subsystem, even when it is used to bind
different contexts.

If we look in to the proxy function, we will see that jQuery will
clone the guid number and attached to it to the newly created
function.

```javascript
// Bind a function to a context, optionally partially applying any
// arguments.
proxy: function( fn, context ) {
  // ...

  // Set the guid of unique handler to the same of original handler, so it can be removed
  proxy.guid = fn.guid = fn.guid || proxy.guid || jQuery.guid++;

  return proxy;
},
```

Beyond the basic event emitter
------------------------------

Some PubSub implementations parse the event string to provide special
features. For example, jQuery have namespaced events i.e
"click.delete" event, Backbone.js have the "all"
event type, triggering all the handlers, or emit several events at the
same time.

The event aggregator pattern
----------------------------

Besides the native events, the user can trigger and bind its own
events. A common pattern in desktop applications and now in js client
side applications is the event aggregator. This pattern provides a
channel events from multiple objects into a single object to simplify
registration for clients.

> A system with lots of objects can lead to complexities when a client
> wants to subscribe to events. The client has to find and register for
> each object individually, if each object has multiple events then each
> event requires a separate subscription.
>
> An Event Aggregator acts as a single source of events for many
> objects. It registers for all the events of the many objects
> allowing clients to register with just the aggregator.
>
> The simplest Event Aggregator aggregates events from multiple objects
> into itself, passing that same event onto its observers. An Event
> Aggregator can also generalize the event, converting events that are
> specific to a source object into a more generic event. That way the
> observers of the aggregators don't need to register for as many
> individual event types. This simplifies the registration process for
> observers, at the cost of being notified of events that may not have
> any material effect on the observer.
> [Martin Fowler]
