class ActionEventController {
    constructor() {
        
    }
    
    /**
     * 
     * @param {*} event : event Name
     * @param {*} fn : callBack Function
     */
    addListener(event, fn) {
        /** 
         * The addListener event checks if the event is already registered.
         * If yes, returns the array, otherwise empty array.
         * A note: Multiple callbacks can be registered against that same event.
         */
        this.listeners[event] = this.listeners[event] || [];
        this.listeners[event].push(fn);
        return this;
    }
    createListeners(entity) {
        console.log(entity)
        let events = dataHelpers.find(entity, 'on')
        console.log(events)
        events.forEach((evt) => {
            window[evt] = this.conductEvent
        })
    }

    /**
     * This is just an alias to the ‘addListener’ method.
     *  We will be using the ‘on’ method more than the ‘addListener’ method for the sake of convenience.
     * @param {*} event 
     * @param {*} fn 
     */
    on(event, fn) {
        return this.addListener(event, fn);
    }

    removeListener(event, fn) {
        let lis = this.listeners[event];//Grab the array of listeners by ‘event’
        if (!lis) return this;//If none found return ‘this’ for chaining.
        /** 
         *If found, loop through all listeners.
          If the current listener matches with the ‘fn’ parameter use the splice method of the array to remove it. 
          Break from the loop.
         *
         */
        for (let i = lis.length; i > 0; i--) {
            if (lis[i] === fn) {
                lis.splice(i, 1);
                break;
            }
        }
        return this;// Return ‘this’ to continue chaining
    }
    /**
     * This is just an alias to the ‘removeListener’ method.
     *  We will be using the ‘off’ method more than the ‘removeListener method for sake of convenience.
     * Optional Parameters to remove certain Functions from one Event has to be implemented
     * @param {*} event :event Name
     * @param {*} fn :Function to be removed
     */
    off(event, fn) {
        return this.removeListener(event, fn);
    }
    /**
     * Adds a one-time listener function for the event named eventName.
     * The next time eventName is triggered, this listener is removed and then invoked.
     * Use for setup/init kind of events.
     * 
     * @param {*} eventName 
     * @param {*} fn 
     */
    once(eventName, fn) {
        this.listeners[event] = this.listeners[eventName] || [];
        const onceWrapper = () => {
            fn();
            this.off(eventName, onceWrapper);
        }
        this.listeners[eventName].push(onceWrapper);
        return this;
    }
    /**
     * Synchronously calls each of the listeners registered for the event named eventName,
     * in the order they were registered, passing the supplied arguments to each.
     * Returns true if the event had listeners, false otherwise.
     * 
     * @param {*} eventName 
     * @param  {...any} args 
     */
    emit(eventName, ...args) {
        let fns = this.listeners[eventName]; //Get the functions for said eventName parameter
        if (!fns) return false; //If no listeners, return false
        fns.forEach((f) => {
            f(...args); // For all function listeners, invoke the function with the arguments
        });
        return true; //Return true when done
    }

    conductEvent(e) {
        console.log(e.type, e.target);

    }
    //Returns the number of listeners listening to the event named eventName.

    listenerCount(eventName) {
        let fns = this.listeners[eventName] || [];
        return fns.length;
    }
    /**
     * Returns a copy of the array of listeners for the event named eventName,
     * including any wrappers (such as those created by .once()).
     * The once wrappers in this implementation will not be available if the event has been emitted once.
     * @param {*} event 
     */
    rawListeners(event) {
        return this.listeners[event];
    }
}