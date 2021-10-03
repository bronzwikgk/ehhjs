importScripts(
    "./function/helpers/HttpService.js",
    "./function/helpers/operate.js",
    "./function/actionEngine.js",
    "./function/actionRouter.js",
    "./function/actionController.js",
    "./function/actionSpace.js",
    "./function/actionEntity.js"
);

var controller = new ActionSpace();

self.addEventListener("install", function(event){
    fetch("index.html").then(function(response){
        caches.open('v1').then(function(cache) {
            cache.put("index.html", response);
        });
    });
})
self.addEventListener("fetch", event => {
    console.log("Nono pls no", event);
    if(event.request.method !== "GET") {
        return;
    }
    if (event.request.mode === 'navigate') {
        
        // event.respondWith(caches.match("index.html") || fetch("index.html").then(function(response) {
        //     cache.put(event.request, response.clone());
        //     return response;
        //   })
        // );
        //controller.routeClientTo(event.clientId, event.request);
        return;
    }
    // else add this to cache
    event.respondWith(
        caches.open('bin').then(function(cache) {
          return cache.match(event.request).then(function (response) {
            return response || fetch(event.request).then(function(response) {
              cache.put(event.request, response.clone());
              return response;
            });
          });
        })
      );
    return;
});

self.addEventListener('message', (event) => {
    self.clients.matchAll({
        includeUncontrolled: true,
        type: 'window',
    }).then((clients) => {
        if (clients && clients.length) {
            // Send a response - the clients
            // array is ordered by last focused
            var receiver = clients[0];
            
            if(event.data.command == "defaultroute"){
                
                controller.routeClientTo(receiver, controller.defaultroute);
            } else if(event.data.command == "route") {
                controller.routeClientTo(receiver, event.data.path);
            }
        }
    });
});