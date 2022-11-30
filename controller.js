import { Message , MessageData } from "./Utility/message.js";
import { ActionWorker } from "./Interface/Worker.js";

class Controller extends ActionWorker {
  constructor(config) {
    if(config){
      config.type = "Controller"
    }
    super(config);
    this.requests = new Map();
    this.config = config || null;
  }
  handleCore(e) {
    let message = new Message(e.data);
    if (message.getDestination() === "Core") {
      return;
    }
    if (message.getType() == "Configure") {
      if (!this.config) {
        this.config = message.messageData.getData().config;
        this.config.type = "Controller"
      }
    } else {
      let { data } = e;
      let port = e.ports[0];
      let { actionMethod } = data.messageData;
      let { args } = data.messageData;
      if (args) {
        this[actionMethod](...args, port);
      }
    }
  }
  handleEntity = (e) => {
    let newRequest = new Message(e.data);
    let requestId = newRequest.getRequestId();
    let type = newRequest.getType();
    let messageData = newRequest.getMessageData();

    let currRequest = this.requests.get(requestId);
    if (type === "Response") {
      let status = messageData.getStatus();
      let data = messageData.data;

      if (!currRequest) return;

      this.requests.set({ status });

      let message = new Message({
        requestId,
        type: "Response",
        messageData: {
          status,
          data,
        },
      });

      this.sendMessage("CLIENT_01", "Client", message);
    }
  };
  handleClient = (e) => {
    let newRequest = new Message(e.data);
    if (newRequest.getOriginType() != "Client") {
      return;
    }
    if (!this.config.origins.Client.includes(newRequest.getOrigin())) {
      return;
    }

    let requestId = newRequest.getRequestId();

    this.requests.set(newRequest.getRequestId(), {
      status: "pending",
    });

    let messageData = newRequest.getMessageData();

    let actionMethod = messageData.getActionMethod();
    let args = messageData.getArguments();

    let newMessageData = this[actionMethod](...args);
    newMessageData.setActionMethod(actionMethod);

    let newMessage = new Message({
      requestId,
      messageData: newMessageData,
    });


    this.sendMessage("ENTITY_01", "Entity", newMessage);
  };
  construct(){}
}

export { Controller };
