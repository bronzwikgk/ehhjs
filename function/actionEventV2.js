
//console.log("app", app)
class ActionEvent {
    constructor(entity,activeListerners) {
       this._activeEntity = [],
       this._activeListners = [];
       this._events = {};
         this.createListeners(entity,activeListerners);
       }

    createListeners(entity,activeListerners) {
        this._activeEntity.push(window[entity]);
        entity=window[entity];
        
        Object.keys(activeListerners).forEach((key) => {
            
            console.log(key,entity[key],activeListerners, activeListerners[key]);
            entity[key] = activeListerners[key];
            //this.test(activeListerners.key);
            //entity[key] = activeListerners.key;
        })
    }
    test(){
        console.log("test",arguments);
    }
    addListener(eventName, fn) {
    console.log("add listner",eventName, fn);
        this._events[eventName] = this._events[eventName] || [];
        this._events[eventName].push(fn);
     //   console.log(this._events);
        return this;
    }
    on(eventName, fn) {
        return this.addListener(eventName, fn);
    }
    emit(eventName, ...args) {
        console.log('I was called');
        let fns = this._events[eventName];
        //  console.log("Emitted",eventName)
        if (!fns) return false;
        fns.forEach((f) => {
            f(...args);
        });
        return true;
    }
    handleEvent(e) {
        console.log("event Happened",e.type,e.target);
    }

}