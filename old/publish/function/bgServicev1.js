//onInstall to be added
//configs to be added
//this file works on a messaging system, while interacting with other  scripts eg content
//OnLoad the bgEventsListerners from config have to be intiated here
//https://developer.chrome.com/docs/extensions/mv2/match_patterns/
//https://developer.chrome.com/docs/extensions/reference/declarativeNetRequest/
var blockURLlist = ["*://*.zedo.com/*"]

var ruleSet = 

chrome.webRequest.onBeforeRequest.addListerner(callback, applyto){ 


}

chrome.webRequest.onBeforeRequest.addListener(callback, filter, opt_extraInfoSpec);



// match pattern for the URLs to redirect
var pattern = "https://mdn.mozillademos.org/*";
var filter = { urls: ["<all_urls>"] };

// cancel function returns an object
// which contains a property `cancel` set to `true`
function cancel(details) {
    //console.log("Canceling: " + requestDetails.url);
    return { cancel: true };
}

// add the listener,
// passing the filter argument and "blocking"
browser.webRequest.onBeforeRequest.addListener(
    cancel,
    { urls: [pattern], types: ["image"] },
    ["blocking"]
);

chrome.webRequest.onBeforeRequest.addListener(callback, filter, opt_extraInfoSpec);


var callback = function (details) {... };
var filter = { ...};
var opt_extraInfoSpec = [...];

chrome.webRequest.onBeforeRequest.addListener(
    function (details) { return { cancel: true }; },
    { urls: ["*://www.evil.com/*"] },
    ["blocking"]
);