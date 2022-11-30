class Messagable {
  constructor() {
    this.ControllerPorts = {};
    this.ClientPorts = {};
    this.EntityPorts = {};
  }
  sendMessage(destination, destinationType, message) {
    message.setOrigin(this.config.name);
    message.setOriginType(this.config.type);
    message.setDestination(destination);
    message.setDestinationType(destinationType);

    if (destination in this.EntityPorts) {
      this.EntityPorts[destination].postMessage(message);
    } else if (destination in this.ClientPorts) {
      this.ClientPorts[destination].postMessage(message);
    } else if (destination in this.ControllerPorts) {
      this.ControllerPorts[destination].postMessage(message);
    }
  }
  setPort(port, options) {
    let { destinationType, destination } = options;
    if (destinationType === "Client") {
      this.ClientPorts[destination] = port;
      this.ClientPorts[destination].onmessage =
        this["handle" + destinationType];
    } else if (destinationType === "Entity") {
      this.EntityPorts[destination] = port;
      this.EntityPorts[destination].onmessage =
        this["handle" + destinationType];
    } else if (destinationType === "Controller") {
      this.ControllerPorts[destination] = port;
      this.ControllerPorts[destination].onmessage =
        this["handle" + destinationType];
    }
  }
}

export { Messagable };
