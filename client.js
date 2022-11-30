import { Utility } from "./Utility/utility.js";
import { Message , MessageData } from "./Utility/message.js";
import {Request} from "./Utility/request.js"
import { Messagable } from "./Interface/Messagable.js";

const utility = new Utility();

class Client extends Messagable {
  constructor(config) {
    super();
    this.config = config;
    this.config.type = "Client";
    this.requests = new Map();
    window.addEventListener("click", this.handleEvent);
  }
  handleEvent = (e) => {
    try {
      e.preventDefault();
      const newRequest = new Request(e.target.attributes);
      e.requestId = utility.getUniqueId(20);
      this.requests.set(e.requestId, newRequest);
      let { message } = this[newRequest.getName()](e);

      this.sendMessage("CONTROLLER_01", "Controller", message);
    } catch (error) {
      console.log(error);
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
    let action;
    if (status === "success") {
      action = currRequest.onSuccess || null;
    } else if (status === "failure") {
      action = currRequest.onFailure || null;
    }
    if (!action) return;
    currRequest.setStatus(status);

    let methodPrototype = utility.generateMethodPrototype(action);

    let { message, request } = this[methodPrototype.method]([
      ...methodPrototype.args,
      data,
    ]);

    currRequest.setEndTime(Date.now());

    if (!request && message && message.getType().toUpperCase() === "RESPONSE") {
      // Handling Message that Ends in success and Does not follow with another request
      if (message.getMessageData().getStatus().toUpperCase() === "COMPLETED") {
        console.log("Request Ended with Success");
      }
      // Handling Message that Ends in failure and Does not follow with another request
      else if (
        message.getMessageData().getStatus().toUpperCase() === "FAILURE"
      ) {
        console.log("Request Ended with Failure");
      }
    } else if (
      request &&
      message &&
      message.getType().toUpperCase() === "RESPONSE"
    ) {
      // Handling Message that Ends in success and Does follow with another request
      if (message.getMessageData().getStatus().toUpperCase() === "COMPLETED") {
        this.handleFollowUpRequest(message, request);
      }
      // Handling Message that Ends in failure and Follow up with another request
      else if (
        message.getMessageData().getStatus().toUpperCase() === "FAILURE"
      ) {
        this.handleFollowUpRequest(message, request);
      }
    }
  };
  handleControllerRequest = (message) => {};
  handleFollowUpRequest = (message, request) => {
    let requestId = utility.getUniqueId(20);
    this.requests.set(requestId, request);
    message.setRequestId(requestId);
    message.setType("Request");
    this.sendMessage("CONTROLLER_01", "Controller", message);
  };
  handleEntity = (e) => {};
  addEvents(target, type, listener) {}
}

export { Client };
