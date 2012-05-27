The Event Aggregator Pattern
============================

As we have seen in the event emitter, the user can trigger and bind to
its own events. A common pattern in desktop applications and now in js
client side applications is the event aggregator. This pattern
provides a channel event for and from multiple objects into a single object
to simplify registration for clients.

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

Let's see how our chat will look like with an event aggregator:

```javascript
var pipe = new events.EventAggregator();
function User(){
  return {
    send: function(message){
      pipe.trigger("message", message, this);
    },
    receive: function(){
      pipe.on("message", function(message, user){
        console.log(user.name + ": " + "message");
      })
    },
    disconnect: function(){
     pipe.trigger("message", "has disconnect", this);
     pipe.trigger("disconnect", user);
    }
  }
}

var bob = new User("Bob");
var alice = new User("Alice");
```
