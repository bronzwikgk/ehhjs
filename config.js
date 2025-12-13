// config.js

// For this example, we define templates directly. In a real app,
// ActionView would fetch these from separate JSON files.
const homeTemplate = {
  nodeType: 1,
  tagName: "div",
  children: [
    {
      nodeType: 1,
      tagName: "h1",
      children: [{ nodeType: 3, textContent: "Welcome to the EHHJS SPA" }],
    },
    {
      nodeType: 1,
      tagName: "p",
      children: [
        {
          nodeType: 3,
          textContent:
            "This is a single-page application powered by the ehhjs framework.",
        },
      ],
    },
  ],
};

const usersTemplate = {
  nodeType: 1,
  tagName: "div",
  children: [
    {
      nodeType: 1,
      tagName: "h1",
      children: [{ nodeType: 3, textContent: "Users" }],
    },
    {
      nodeType: 1,
      tagName: "ul",
      attributes: { id: { value: "user-list" } },
      // This part would be dynamically generated from data
    },
    {
      nodeType: 1,
      tagName: "form",
      attributes: {
        id: { value: "add-user-form" },
        request: { value: "addUser" },
        onSuccess: { value: "render(userAddedTemplate, data, #user-list)" }
      },
      children: [
        {
          nodeType: 1,
          tagName: "input",
          attributes: { type: { value: "text" }, name: { value: "userName" }, placeholder: { value: "Enter user name" }, required: {value: true} },
        },
        {
          nodeType: 1,
          tagName: "button",
          attributes: { type: { value: "submit" } },
          children: [{ nodeType: 3, textContent: "Add User" }],
        },
      ],
    },
  ],
};

const userAddedTemplate = {
    nodeType: 1,
    tagName: "li",
    // placeholder for dynamic content
}


const notFoundTemplate = {
    nodeType: 1,
    tagName: "div",
    children: [
        {
            nodeType: 1,
            tagName: "h1",
            children: [{nodeType: 3, textContent: "404 - Not Found"}]
        }
    ]
};

const errorTemplate = {
    nodeType: 1,
    tagName: "div",
    children: [
        {
            nodeType: 1,
            tagName: "p",
            children: [{nodeType: 3, textContent: "Something went wrong."}]
        }
    ]
}

const config = {
  METHOD: "INSTANCE",
  VIEWS: [
    {
      name: "MAIN_VIEW",
      path: "./view.js",
      root: "ActionView",
      config: { 
          root: "#app-content",
          templates: {
              homeTemplate,
              usersTemplate,
              userAddedTemplate,
              notFoundTemplate,
              errorTemplate
          }
      },
    },
  ],
  CLIENTS: [
    {
      name: "SPA_CLIENT",
      path: "./client.js",
      root: "Client",
      view: "MAIN_VIEW", // Injects MAIN_VIEW instance into this client
      origins: { Controller: ["USER_CONTROLLER"] },
      ROUTES: { // ROUTES are now directly part of the Client's config
        "/home": {
          template: "homeTemplate",
          target: "#app-content",
        },
        "/users": {
          template: "usersTemplate",
          target: "#app-content",
          action: "getUsers", // This action will be handled by the Controller/Entity
        },
      },
    },
  ],
  CONTROLLERS: [
    {
      name: "USER_CONTROLLER",
      path: "./controller.js",
      root: "Controller",
      type: "INSTANCE",
      origins: { Client: ["SPA_CLIENT"], Entity: ["USER_ENTITY"] },
      // New: Method to handle addUser action
      addUser: (payload) => {
        // In a real app, this would involve validation and calling an entity method
        console.log("Controller received addUser:", payload);
        return new MessageData({ status: "success", data: { id: Date.now(), name: payload.userName } });
      },
    },
  ],
  ENTITIES: [
    {
      name: "USER_ENTITY",
      path: "./entity.js",
      root: "Entity",
      type: "INSTANCE",
      origins: { Controller: ["USER_CONTROLLER"] },
      application: {
        indexedDB: [{ store: "users" }],
      },
      // New: Method to handle getUsers action
      getUsers: () => {
        // In a real app, this would fetch from IndexedDB or an API
        const users = [{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }];
        return new MessageData({ status: "success", data: users });
      },
      // New: Method to handle addUser action (from controller)
      addUser: (payload) => {
        console.log("Entity received addUser:", payload);
        // In a real app, save to IndexedDB here
        return new MessageData({ status: "success", data: payload });
      }
    },
  ],
};

export default config;
