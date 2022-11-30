/*

CapsLock.js

Allows the status of the caps lock key to be determined

Created by Kate Morley - http://code.iamkate.com/ - and released under the terms
of the CC0 1.0 Universal legal code:

http://creativecommons.org/publicdomain/zero/1.0/legalcode

*/

const CapsLock = (function(){

  const IS_MAC = /Mac/.test(navigator.platform);

  let capsLock  = false;
  let listeners = [];

  // Returns whether caps lock currently appears to be on.
  function isOn(){
    return capsLock;
  }

  // Adds a listener. When a change is detected in the status of the caps lock
  // key the listener will be called with the value true if caps lock is now on
  // and false if caps lock is now off. The parameter is:
  //
  // listener - the listener
  function addListener(listener){
    listeners.push(listener);
  }

  // Handles a key press event. The parameter is:
  //
  // e - the event
  function handleKeyPress(e){

    const charCode      = e.charCode;
    const shiftKey      = e.shiftKey;
    const priorCapsLock = capsLock;

    if (charCode >= 97 && charCode <= 122){
      capsLock = shiftKey;
    }else if (charCode >= 65 && charCode <= 90 && !(shiftKey && IS_MAC)){
      capsLock = !shiftKey;
    }

    if (capsLock !== priorCapsLock){
      listeners.forEach(listener => listener(capsLock));
    }

  }

  window.addEventListener('keypress', handleKeyPress);

  return {isOn, addListener};

})();
