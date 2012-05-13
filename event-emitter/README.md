The pubsub or Event Emitter pattern
===================================

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

**emitter.emit(event, [arg1], [arg2], [...])**

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

* LucidJs
* jQuery


Beyond the basic event emitter
------------------------------

Some PubSub implementations parse the event string to provide special
features. For example, jQuery have namespaced events i.e
"click.delete" event, Backbone.js have the "all"
event type, triggering all the handlers, or emit several events at the
same time.
