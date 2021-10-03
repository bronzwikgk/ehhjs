class ActionRouter extends ActionEngine {
    defaultroute = "/helloworld.json";
    routes = {
        "/": {
            name: 'Homepage', // kind of like document title
            id: 'ehhhomePage', // i don't get this
            actorRole: 'all', // defines rights to user?
            model: "/form/helloworld.json" // the file where we will find the model
        },
        "/index.html": {
            name: 'Homepage', // kind of like document title
            id: 'ehhhomePage', // i don't get this
            actorRole: 'all', // defines rights to user?
            model: "/form/helloworld.json" // the file where we will find the model
        },
        "/helloworld.json": {
            name: 'Homepage', // kind of like document title
            id: 'ehhhomePage', // i don't get this
            actorRole: 'all', // defines rights to user?
            model: "/form/helloworld.json" // the file where we will find the model
        }
    };
    async routeClientTo(client, url) {
        console.log(client, url);
        console.log(this.routes);
        var result = this.routes[url] || {model:url};
        result = JSON.parse(JSON.stringify(result));
        
        result.model = await Entity.getExtendedJson(result.model);
        console.log(result);
        console.log(await client.postMessage({
            command:"updatePage",
            module: result
        }));
    }
}