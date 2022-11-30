import { Messagable } from "./Messagable.js";

class ActionWorker extends Messagable {
  constructor(config) {
    super();
    this.config = config;
    if (this.config) {
      this.startAsInstance();
    } else {
      this.startAsWorker();
    }
  }
  startAsWorker() {
    // Worker have no access to window
    if (typeof window !== "undefined") {
      return;
    }
    self.onmessage = (e) => {
      try {
        let { origin } = e.data;
        if (!this.config) {
          this.handleCore(e);
        } else {
          this["handle" + origin](e);
        }
      } catch (error) {
        console.log(error);
      }
    };
  }
  startAsInstance() {
    this.construct();
  }
  connect(connection, connectionType, port) {
    if (connectionType === "Client") {
      this.ClientPorts[connection] = port;
      this.ClientPorts[connection].onmessage = this.handleClient;
    } else if (connectionType === "Entity") {
      this.EntityPorts[connection] = port;
      this.EntityPorts[connection].onmessage = this.handleEntity;
    } else if (connectionType === "Controller") {
      this.ControllerPorts[connection] = port;
      this.ControllerPorts[connection].onmessage = this.handleController;
    }
  }
}

export { ActionWorker };
