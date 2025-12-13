# EHHJS (`ehhjs`) Framework Documentation

## 1. Overview

**EHHJS** is a configuration-driven JavaScript framework designed for building complex web applications. Its name, derived from "Everything Happens Here," reflects its goal to be a comprehensive solution for various web application needs.

The framework's core design revolves around a **decoupled, message-passing architecture**. Instead of components calling each other's methods directly, they communicate asynchronously by sending messages through dedicated channels. This approach, combined with the ability to run major components in **Web Workers**, allows for highly responsive, performant, and scalable applications.

### Key Design Principles:

*   **Configuration over Code**: The application's structure, components, and their interconnections are defined in a central configuration object, not hard-coded.
*   **Component-Based**: The architecture is divided into four primary components: `Core`, `Client`, `Controller`, and `Entity`.
*   **Message-Passing**: Communication is handled via the standard `MessageChannel` API, ensuring clean separation of concerns.
*   **Parallelism with Web Workers**: Computationally intensive logic within `Controller` and `Entity` components can be seamlessly offloaded from the main UI thread to prevent blocking.

---

## 2. Core Components

The framework is built on four main types of components.

### 2.1. Core

The `Core` class (`core.js`) is the central orchestrator of the application. Its primary responsibility is to read the application configuration and instantiate and connect all the other components.

*   **Initialization**: On `start()`, it dynamically imports and initializes all `Clients`, `Controllers`, and `Entities` based on paths provided in the configuration.
*   **Worker Management**: It can spawn `Controllers` and `Entities` as Web Workers or as simple class instances, depending on the `type` specified in the config.
*   **Connection Wiring**: Its most critical role is to create `MessageChannel`s and distribute the ports to the corresponding components, establishing the communication lines for the entire application.

### 2.2. Client

The `Client` class (`client.js`) is the part of the framework that interfaces directly with the user and the DOM.

*   **Event Handling**: It listens for global DOM events (e.g., `click`) and translates them into framework-specific `Request` objects.
*   **Request Initiation**: When a user interacts with a designated element (e.g., `<button request="fetchData" onSuccess="displayData">`), the `Client` initiates a request cycle by sending a message to a `Controller`.
*   **Response Handling**: It maintains a map of pending requests and, upon receiving a response, executes the appropriate callback (`onSuccess` or `onFailure`) defined in the HTML.

### 2.3. Controller

The `Controller` class (`controller.js`) serves as the intermediary layer, routing communication between `Clients` and `Entities`.

*   **Request Routing**: It receives messages from a `Client`, processes the intent, and forwards a new message to the appropriate `Entity` for data or business logic execution.
*   **State Management**: It can hold the state for ongoing, multi-step user interactions.
*   **Worker Capability**: As an `ActionWorker`, it can run in a separate thread to handle complex routing logic without impacting the UI.

### 2.4. Entity

The `Entity` class (`entity.js`) is the business logic and data management layer.

*   **Data Abstraction**: It encapsulates all interactions with data sources. The framework includes a built-in `IndexedDB` extension, which entities can use for persistent client-side storage.
*   **Business Logic**: All core application logic, data manipulation, or heavy computation (like the included `json2html` transformer) resides here.
*   **Worker Capability**: Like controllers, entities are also `ActionWorker`s and can be run in the background to perform data-intensive tasks.

---

## 3. The Message-Passing System

EHHJS's architecture is built on a robust messaging system that decouples its components.

*   **`Messagable` Interface**: This base class (`Interface/Messagable.js`) provides the fundamental `sendMessage` and `setPort` methods that allow components to communicate.
*   **`ActionWorker` Interface**: This class (`Interface/Worker.js`) extends `Messagable` and provides the abstraction that allows `Controller` and `Entity` classes to run identically as either a standard instance or within a Web Worker.
*   **`MessageChannel`**: At startup, the `Core` class creates standard browser `MessageChannel`s to establish two-way communication paths between connected components.
*   **`Message` and `MessageData`**: These classes (`Utility/message.js`) define the standardized data structure for all communication, ensuring that every message contains information about its origin, destination, request ID, and payload.

---

## 4. Example Workflow: A User Click

Here is a step-by-step breakdown of a typical event lifecycle in the framework:

1.  **User Interaction**: A user clicks on an HTML element defined with specific request attributes:
    ```html
    <button request="getUser" onSuccess="renderUser(data)">Get User</button>
    ```
2.  **Client Captures Event**: The `Client`'s global `click` listener fires. It inspects the element's attributes, creates a `Request` object, and assigns it a unique ID.
3.  **Client Sends Message**: The `Client` constructs a `Message` and sends it to its connected `Controller` via the pre-established message port.
4.  **Controller Processes Message**: The `Controller` receives the message. Based on the `actionMethod` ("getUser"), it knows to query an `Entity`. It then creates a new message and forwards it to the appropriate `Entity`.
5.  **Entity Executes Logic**: The `Entity` receives the message from the `Controller`. It performs the requested action, such as fetching user data from `IndexedDB`.
6.  **Entity Responds**: The `Entity` creates a response `Message` containing the fetched data and a "success" status. It sends this message back to the `Controller`.
7.  **Controller Forwards Response**: The `Controller` receives the entity's response and forwards it back to the original `Client`, keeping the request ID intact.
8.  **Client Handles Response**: The `Client` receives the final response. It looks up the original `Request` by its ID and finds the `onSuccess` callback ("renderUser(data)"). It then invokes this function, passing the data from the entity's response.

---

## 5. Key Utilities

The framework includes several utilities that support its operation:

*   **`Request` (`request.js`)**: A class that encapsulates a user-initiated action, tracking its lifecycle, callbacks, and timing.
*   **`Utility` (`utility.js`)**: A collection of helper functions for common tasks like generating unique IDs, parsing method strings, and checking for Promises.
*   **`htmlHelpers.js`**: Functions for server-side or dynamic HTML generation.
*   **`indexedDB.js`**: A Promise-based wrapper that simplifies interactions with the browser's IndexedDB.

---

## 6. How to Use EHHJS (High-Level Guide)

1.  **Define a Configuration**: Create a master JavaScript object that defines your application's components. For each `Client`, `Controller`, and `Entity`, specify its `name`, the `path` to its module, and how it should connect to other components via `messagePorts`.
2.  **Instantiate the Core**: In your main application script, import the `Core` class and create a new instance, passing in your configuration object.
    ```javascript
    import { Core } from './core.js';
    import myConfig from './config.js';

    const app = new Core(myConfig);
    ```
3.  **Start the Application**: Call the `start()` method on the `core` instance. This will asynchronously load all modules and set up the communication channels.
    ```javascript
    app.start();
    ```
4.  **Build the HTML**: Create your HTML with elements that trigger framework actions using the `request`, `onSuccess`, and `onFailure` attributes.
    ```html
    <div id="root">
        <button request="loadItems" onSuccess="renderItems(data)">Load Items</button>
        <ul id="item-list"></ul>
    </div>
    ```
5.  **Implement Component Logic**: Write the code for your `Client`, `Controller`, and `Entity` classes to handle the specific actions and data transformations your application requires.
