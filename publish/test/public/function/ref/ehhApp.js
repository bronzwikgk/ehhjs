const app = {
    SW: null,
    deferredPrompt: null,
    isOnline: true,
    max: 10,
    baseURL: null,
    init: () => {
      if ('serviceWorker' in navigator) {
        app.initServiceWorker().catch(console.error);
  
        document.getElementById('randImg').addEventListener('click', app.setImg);
      }
    },
    initServiceWorker: async () => {
      let swRegistration = await navigator.serviceWorker.register('/sw.js', {
        updateViaCache: 'none',
        scope: '/',
      });
      app.SW =
        swRegistration.installing ||
        swRegistration.waiting ||
        swRegistration.active;
      //the registration object could be in any state
  
      app.sendMessage({ baseURL: app.baseURL });
      // listen for new service worker to take over
      //could be first one or a new one taking over
      navigator.serviceWorker.addEventListener('controllerchange', async () => {
        app.SW = navigator.serviceWorker.controller;
      });
      navigator.serviceWorker.addEventListener('message', app.onMessage, false);
    },
    onMessage: (ev) => {
      //message from SW received
      let { data } = ev;
      console.log(ev.ports);
      console.log(data);
    },
    sendMessage: (msg) => {
      //msg is a JS Object
      //tell SW that we are online or offline
      app.SW.postMessage(msg);
    },
    setImg: () => {
      let rand = Math.floor(Math.random() * 20) + 100;
      let url = `https://picsum.photos/id/${rand}/300/300`;
      let img = document.getElementById('randImg');
      img.addEventListener('error', (err) => {
        //error loading image
        //try again
        if (app.max > 0) {
          app.setImg();
        }
      });
      img.addEventListener('load', (ev) => {
        //img has loaded...
        //reset our max attempts to 10
        app.max = 10;
      });
      app.max--;
      img.src = url;
      //this line will call the service worker.
    },
  };
document.addEventListener('DOMContentLoaded', app.init);
  

app.connectSocket = function () {

  window.ws = new WebSocket('ws://localhost:3030');

  ws.onopen = () => {
    console.log('Now connected');

    ws.onclose = () => {
      console.log('ws.onclose');
      setTimeout(function () {
        app.connectSocket();
      }, 2000);

    };

    ws.onerror = () => {
      console.log('could not connect to websocket');
    }

    ws.onmessage = (event) => {
      console.log('got message!');
      var msgObject = JSON.parse(event.data);
      console.log(msgObject);
      if (msgObject.type == 'reset') {
        location.reload();
      }

    };
  };

}
//
  