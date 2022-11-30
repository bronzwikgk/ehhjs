import { Utility } from "./Utility/utility.js";
import { Message, MessageData } from "./Utility/message.js";

const utility = new Utility();

class Core {
  constructor(config) {
    this.config = config;
    this.clients = {};
    if (this.config.METHOD === "INSTANCE") {
      this.controllers = {};
      this.entities = {};
    } else if (this.config.METHOD === "WORKER") {
      this.controllerPromises = {};
      this.entityPromises = [];
    }
  }
  async createWoker(url, config, destination) {
    return new Promise((resolve, reject) => {
      let v = new Worker(url, { type: "module" });
      v.postMessage(
        new Message({
          origin: "Core",
          destination: destination,
          type: "Configure",
          messageData: {
            data: { config: config },
            status: "success",
          },
        })
      );
      v.onerror = function (error) {
        console.log(error);
      };
      resolve(v);
    });
  }
  // connector -> That let others connect
  // connectee -> That connect with other
  createConnectionMessage(connector, connectee, messageOrigin, connectionType) {
    return new Message({
      requestId: utility.getUniqueId(20),
      origin: messageOrigin,
      destination: connectee,
      messageData: new MessageData({
        actionMethod: "connect",
        args: [connector, connectionType],
      }),
    });
  }
  async start() {
    // initiate all clients
    let clientConfigs = this.config.CLIENTS || null;
    for (const clientConfig of clientConfigs) {
      let { path, root, name } = clientConfig;
      let module = await import(path);
      let Client = module[root];
      let client = new Client(clientConfig);
      this.clients[name] = client;
    }

    let controllerConfigs = this.config.CONTROLLERS || null;
    let entityConfigs = this.config.ENTITIES || null;

    // Create Worker Promises or Create Instances depending on config

    // Controller
    for (const controllerConfig of controllerConfigs) {
      let { path, name, root, type } = controllerConfig;

      if (type === "Worker") {
        let worker = this.createWoker(path, controllerConfig, "Controller");
        this.controllerPromises[name] = worker;
      } else if (type === "Instance") {
        let controller = (await import(path))[root];
        this.controllers[name] = new controller(controllerConfig);
      }
    }
    // Entities
    for (const entityConfig of entityConfigs) {
      let { path, name, root, type } = entityConfig;
      if (type === "Worker") {
        let worker = this.createWoker(path, entityConfig, "Entity");

        this.entityPromises[name] = worker;
      } else if (type === "Instance") {
        let { path, name, root } = entityConfig;
        let entity = (await import(path))[root];
        this.entities[name] = new entity(entityConfig);
      }
    }

    this.assignMessageChannels();
  }
  async assignMessageChannels() {
    let assignedChannelsList = new Map();
    // Iterating through Client
    let clientConfigs = this.config.CLIENTS;
    for (const client of clientConfigs) {
      let ports = client.messagePorts;
      let clientName = client.name;
      for (const key in ports) {
        const element = ports[key];

        if (key == "Controller") {
          for (const controller of element) {
            let currentController =
              this?.controllerPromises?.[controller] ||
              this?.controllers?.[controller];

            let currentClient = this.clients[clientName];
            if (
              !assignedChannelsList.has(clientName + controller) &&
              !assignedChannelsList.has(controller + clientName)
            ) {
              this.connect(currentClient, currentController, {
                origin: clientName,
                destination: controller,
                originType: "Client",
                destinationType: "Controller",
              });

              assignedChannelsList.set(clientName + controller, true);
              assignedChannelsList.set(controller + clientName, true);
            }
          }
        } else if (key == "Entity") {
          for (const entity of element) {
            let currentEntity =
              this?.entityPromises?.[entity] || this?.entities?.[entity];
            let currentClient = this.clients[clientName];

            if (
              !assignedChannelsList.has(clientName + entity) &&
              !assignedChannelsList.has(entity + clientName)
            ) {
              this.connect(currentClient, currentEntity, {
                origin: clientName,
                destination: entity,
                originType: "Client",
                destinationType: "Entity",
              });

              assignedChannelsList.set(clientName + entity, true);
              assignedChannelsList.set(entity + clientName, true);
            }
          }
        }
      }
    }
    // Iterating through Controller
    let controllers = this.config.CONTROLLERS;
    for (const controller of controllers) {
      let ports = controller.messagePorts;
      let controllerName = controller.name;
      for (const key in ports) {
        const element = ports[key];

        if (key == "Client") {
          for (const client of element) {
            let currentController =
              this?.controllerPromises?.[controllerName] ||
              this?.controllers?.[controllerName];
            let currentClient = this.clients[client];
            if (
              !assignedChannelsList.has(client + controllerName) &&
              !assignedChannelsList.has(client + controllerName)
            ) {
              this.connect(currentClient, currentController, {
                origin: client,
                destination: controllerName,
                originType: "Client",
                destinationType: "Controller",
              });

              assignedChannelsList.set(client + controllerName, true);
              assignedChannelsList.set(controllerName + client, true);
            }
          }
        } else if (key == "Entity") {
          for (const entity of element) {
            let currentController =
              this?.controllerPromises?.[controllerName] ||
              this?.controllers?.[controllerName];
            let currentEntity =
              this?.entityPromises?.[entity] || this?.entities?.[entity];

            if (
              !assignedChannelsList.has(controllerName + entity) &&
              !assignedChannelsList.has(entity + controllerName)
            ) {
              this.connect(currentController, currentEntity, {
                origin: controllerName,
                destination: entity,
                originType: "Controller",
                destinationType: "Entity",
              });

              assignedChannelsList.set(controllerName + entity, true);
              assignedChannelsList.set(entity + controllerName, true);
            }
          }
        }
      }
    }
    // Iterating through Entities
    let entities = this.config.ENTITIES;
    for (const entity of entities) {
    }
  }
  async connect(originObject, destinationObject, options) {
    let { origin, destination, originType, destinationType } = options;
    let messageChannel = new MessageChannel();
    let port1 = messageChannel.port1;
    let port2 = messageChannel.port2;

    if (
      utility.isPromise(originObject) &&
      utility.isPromise(destinationObject)
    ) {
      let connectionMessage = this.createConnectionMessage(
        origin,
        destination,
        "Core",
        originType
      );

      destinationObject.then((worker) => {
        worker.postMessage(connectionMessage, [port1]);
      });

      let otherConnectionMessage = this.createConnectionMessage(
        destination,
        origin,
        "Core",
        destinationType
      );

      originObject.then((worker) => {
        worker.postMessage(otherConnectionMessage, [port2]);
      });
    } else if (
      utility.isPromise(originObject) &&
      !utility.isPromise(destinationObject)
    ) {
      console.log("Origin is Promise but destination is not ");
    } else if (
      !utility.isPromise(originObject) &&
      utility.isPromise(destinationObject)
    ) {
      let connectionMessage = this.createConnectionMessage(
        origin,
        destination,
        "Core",
        originType
      );

      destinationObject.then((worker) => {
        worker.postMessage(connectionMessage, [port1]);
      });

      originObject.setPort(port2, options);
    } else {
      originObject.setPort(port1, { destinationType, destination });
      destinationObject.setPort(port2, {
        destinationType: originType,
        destination: origin,
      });
    }
  }
}

export { Core };
