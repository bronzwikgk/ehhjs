
class ActionController extends ActionRouter {
    constructor(routes) {
        super();
        
        this.routes = routes || this.routes;
        this.init();
    }
    async init() {
        
    }
    handleEvent(eventType, ...args) {
        switch (eventType) {
            case 'updateview':
                var view = args[0];
                var model = args[1];

                this.updateView(view, model);

                break;
        }
        console.log(eventType);
    }
    updateView(view, model) {
        view.update(model);
    }
}

