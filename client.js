import { Utility } from "./Utility/utility.js";
import { Message, MessageData } from "./Utility/message.js";
import { Request } from "./Utility/request.js";
import { ActionEvent } from "./Utility/event.js";
import { Messagable } from "./Interface/Messagable.js";

const utility = new Utility();

class Client extends Messagable {
  constructor(config) {
    super();
    this.config = config;
    this.config.type = "Client";
    this.requests = new Map();
    this.view = null; // Placeholder for ActionView instance

    // Listen for page actions
    window.addEventListener("click", this.handlePageAction);
    window.addEventListener("submit", this.handlePageAction);
    
    // Listen for SPA routing events
    window.addEventListener('hashchange', this.handleRouteChange);
    window.addEventListener('load', this.handleRouteChange);
  }

  setView(view) {
    this.view = view;
  }

  handlePageAction = (e) => {
    try {
      // Ignore clicks on SPA navigation links, as they are handled by hashchange
      if (e.target.tagName === 'A' && e.target.getAttribute('href')?.startsWith('#')) {
        return;
      }
      
      const actionEvent = new ActionEvent(e);
      if (!actionEvent.request) {
        return; // Not an element with a request attribute
      }
      
      e.preventDefault();

      const newRequest = new Request(actionEvent.request);
      const requestId = utility.getUniqueId(20);
      this.requests.set(requestId, newRequest);

      const message = new Message({
        requestId: requestId,
        type: "Request",
        messageData: new MessageData({
          actionMethod: actionEvent.request.name,
          args: [actionEvent.payload],
        }),
      });

      this.sendMessage("CONTROLLER_01", "Controller", message);
    } catch (error) {
      console.log(error);
    }
  };

  handleRouteChange = () => {
    const path = window.location.hash.slice(1) || '/home'; // Default to /home
    const route = this.config.ROUTES[path];

    if (!route) {
      console.error(`No route found for path: ${path}`);
      this.view.render('notFoundTemplate', { message: `Page not found: ${path}` }, '#app-content');
      return;
    }

    if (route.action) {
      const requestId = utility.getUniqueId(20);
      const message = new Message({
        requestId: requestId,
        type: "Request",
        messageData: new MessageData({ actionMethod: route.action })
      });
      
      this.requests.set(requestId, { 
        ...new Request({ name: route.action }), 
        template: route.template, 
        target: route.target 
      });

      // Assuming a single controller for simplicity. A real app might look up the controller from the route.
      this.sendMessage("USER_CONTROLLER", "Controller", message);
    } else {
      this.view.render(route.template, {}, route.target);
    }
  };

  handleController = (e) => {
    let message = new Message(e.data);
    if (message.getOriginType() != "Controller") {
      return;
    }
    if (!this.config.origins.Controller.includes(message.getOrigin())) {
      return;
    }
    let type = message.getType();
    if (type === "Response") {
      this.handleControllerResponse(message);
    }
  };

  handleControllerResponse = (msg) => {
    let requestId = msg.getRequestId();
    let messageData = msg.getMessageData();
    let status = messageData.getStatus();
    let data = messageData.data;
    let currRequest = this.requests.get(requestId);

    if (!currRequest) return;
    
    currRequest.setStatus(status);
    currRequest.setEndTime(Date.now());
    
    // Check if this was a routing request or a page action request
    if (currRequest.template && currRequest.target) {
      // This was a routing request
      if (status === "success" && this.view) {
        this.view.render(currRequest.template, data, currRequest.target);
      } else {
        // Handle render failure for a page
        this.view.render('errorTemplate', { message: 'Failed to load page data.' }, currRequest.target);
      }
    } else if (currRequest.onSuccess) {
      // This was a page action with an onSuccess attribute
      if (status === "success" && this.view) {
        const renderRegex = /render\(([^,]+),\s*data,\s*([^)]+)\)/;
        const match = currRequest.onSuccess.match(renderRegex);

        if (match) {
          const templateName = match[1].trim();
          const targetSelector = match[2].trim().replace(/['"`]/g, "");
          this.view.render(templateName, data, targetSelector);
        }
      }
    }
  };

  handleEntity = (e) => {};
}

export { Client };
