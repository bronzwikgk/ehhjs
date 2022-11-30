import { IndexedDB } from "./Extensions/indexedDB.js";
import { Message, MessageData } from "./Utility/message.js";
import { isSelfClosingTag, specialToUnicode } from "./Utility/htmlHelpers.js";
import { ActionWorker } from "./Interface/Worker.js";

class Entity extends ActionWorker {
  constructor(config) {
    if (config) {
      config.type = "Entity";
    }
    super(config);
    this.requests = new Map();
    this.config = config || null;
  }
  handleCore(e) {
    let message = new Message(e.data);
    if (message.getType() == "Configure") {
      if (!this.config) {
        this.config = message.messageData.getData().config;
        if (this?.config?.application?.indexedDB) {
          this.indexedDB = new IndexedDB(
            "ehh",
            this.config?.application?.indexedDB || {}
          );
        }
      } else {
        console.log("Reconfiguration is not allowed");
      }
    } else {
      let port = e.ports[0] || null;
      let message = new Message(e.data);
      let messageData = message.getMessageData();

      let actionMethod = messageData?.getActionMethod() || null;
      let args = messageData?.getArguments();

      // Special Case
      if (args) {
        this[actionMethod](...args, port);
      }
      // Normal Case
    }
  }
  handleController = async (e) => {
    let newRequest = new Message(e.data);
    if (newRequest.getOriginType() != "Controller") {
      return;
    }
    if (!this.config.origins.Controller.includes(newRequest.getOrigin())) {
      return;
    }

    let requestId = newRequest.getRequestId();
    let actionMethod = newRequest.getMessageData().getActionMethod();
    let args = newRequest.getMessageData().getArguments();

    let message = await this[actionMethod](...args);

    message.setRequestId(requestId);

    this.sendMessage("CONTROLLER_01", "Controller", message);
  };
  handleClient = async (e) => {
    console.log(e);
  };
  json2html(json) {
    var response = "";
    if (json.nodeType == 1) {
      response += `<${json.tagName}`;
      for (const key in json.attributes) {
        response += " ";
        response += key;
        if (typeof json.attributes[key].value == "string") {
          response += `= "${json.attributes[key].value}"`;
        } else if (typeof json.attributes[key].value == "object") {
          let res = JSON.stringify(json.attributes[key].value);
          res = this.htmlHelpers.requestUnparser(res);
          response += `= '${res}'`;
        }
      }
      response += ">";
      if ((!json.children || !json.children[0]) && json.textContent) {
        json.textContent = specialToUnicode(json.textContent);
        response += json.textContent;
      }
      if (json.children) {
        let children = json.children;
        for (let index = 0; index < children.length; index++) {
          const child = children[index];
          let res = this.json2html(child);
          response += res;
        }
      }
      if (isSelfClosingTag(json.tagName)) {
        response = response.slice(0, -1);
        response += `/>\n`;
      } else {
        response += `</${json.tagName}>\n`;
      }
    }
    return response;
  }
  construct() {
    if (this?.config?.application?.indexedDB) {
      this.indexedDB = new IndexedDB(
        "ehh",
        this.config?.application?.indexedDB || {}
      );
    }
  }
}

export { Entity };
