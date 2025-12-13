// main.js
import { Core } from "./core.js";
import config from "./config.js";

const app = new Core(config);
app.start();

// Expose the app for debugging if needed
window.ehhjsApp = app;
