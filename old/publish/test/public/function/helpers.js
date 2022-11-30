export * from "./helpers/operate.js";
export * from "./actionEntity.js";
export * from "./actionEngine.js";
export * from "./helpers/copyAs.js";
export * from "./helpers/css2json.js";
export * from "./helpers/json2css.js";
export * from "./helpers/html2json.js";
export * from "./helpers/json2html.js";
export * from "./helpers/HttpService.js";

/**
 *  All the code in distributed code (teams and users),
 *  should have basic shunya api's, called as dot command.
 *      api's
 *            .log (toggleStatus,destination) where a call can enable logs to console by making a call
 *                      actionObject.log('enable',"[console,file]")
 *  
 *             .? || .help : prints the help aka comments or api eg. Clasp in console.
 *             .activeInstance : retuns the array of current instances of the current class.
 *             .versionNumber : current version number.
 *              .update: updates the code from the CDN.
 */