
var preload = {
    beautyCss: [
        {
            name:'link',
            rel: 'stylesheet',
            id: 'actionEditor.css',
            type: "text/css",
            href: "beauty/action.css",
            class: 'preloadCSS'
        },
        {
            name: 'link',
            rel: 'stylesheet',
            id: 'FontSheet',
            type: "text/css",
            href: "https://fonts.googleapis.com/css2?family=Bai+Jamjuree&family=Montserrat&family=Open+Sans&family=Poppins",
            class: 'preloadCSS'
        }
    ],
    // scripts: [
    //     {
    //         name: 'script',
    //         type: 'text/javascript',
    //         class: 'preloadScript',
    //         id: 'actionSpaceView.js',
    //         //type: "text/javascript",
    //         src: "function/actionSpaceView.js"
    //     },
    //     {
    //         name: 'script',
    //         type: 'text/javascript',
    //         class: 'preloadScript',
    //         id: 'actionSpaceView.js',
    //         //type: "text/javascript",
    //         src: "function/actionEventController.js"
    //     },
    // ],
    // form: [
    //     {
    //         name: 'script',
    //         type: 'text/javascript',
    //         class: 'preloadScript',
    //         id: 'actionSpaceForm',
    //         src: "form/actionSpaceForm.js"
    //     }
    //
    // ]
}

window.onload = loadActionEditor;

function loadActionEditor() {
   //  var actionSpacePreloads = new Entity(preload, document.getElementsByTagName('actionSpace')[0]);
   //  console.log("actionSpacePreloads Loaded", actionSpacePreloads.entity);
   // // var actionSpace = document.getElementsByTagName('actionSpace')[0].appendChild(preLoadFiles.entity);
   //  var actionSpace = new Entity(actionSpaceConfig, document.getElementsByTagName('actionSpace')[0]);
   //  console.log("actionEditor Loaded", actionSpacePreloads.entity);


    const model = new ActionSpaceEntityModel(),
        view = new ActionView(model),
        controller = new ActionSpaceDataController(this,view,model)

}
