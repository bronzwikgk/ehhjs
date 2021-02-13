/**
 * This file contains the json definition of actionSpaceEditor.
 * This will be used as a prototype to validate any creation of an instance of a new actionSpace.
 * All the attributes and parameter are defined here.
 */

/**
 * actionSpaceObject is the root Object of actionSpace.
 * It has all the scripts/divs/json/css needed for the actionSpace to function.
 *
 */

var currentDocument = document;

var actionSpaceConfig = {
    // topMenu: [
    //     {
    //         name: 'button',
    //         type: 'div',
    //         class: 'topbar-button',
    //         'innerHTML': '<i class="fas fa-align-right"></i>',
    //         'data-cmd': 'justifyRight'
    //     },
    //     {
    //         name: 'button',
    //         type: 'div',
    //         class: 'topbar-button',
    //         'innerHTML': '<i class="fas fa-align-left"></i>',
    //         'data-cmd': 'justifyLeft'
    //     },
    //     {
    //         name: 'button',
    //         type: 'button',
    //         class: 'topbar-button',
    //         'innerHTML': '<i class="fas fa-align-center"></i>',
    //         'data-cmd': 'justifyCenter'
    //     },
    //     {
    //         name: 'button',
    //         type: 'button',
    //         class: 'topbar-button',
    //         on: 'click',
    //         'innerHTML': '<i class="fas fa-align-justify"></i>',
    //         'data-cmd': 'justifyFull'
    //     },
    //     {
    //         name: 'button',
    //         type: 'button',
    //         class: 'topbar-button',
    //         'innerHTML': '<i class="fas fa-bold"></i>',
    //         'data-cmd': 'Bold'
    //     },
    //     {
    //         name: 'button',
    //         type: "button",
    //         class: 'topbar-button',
    //         'innerHTML': '<i class="fas fa-italic"></i>',
    //         "data-cmd": 'italic'
    //
    //     }, {
    //         name: 'button',
    //         type: "button",
    //         class: 'topbar-button',
    //         'innerHTML': '<i class="fas fa-underline"></i>',
    //         "data-cmd": 'underline'
    //
    //     },
    //     {
    //         name: 'button',
    //         type: "button",
    //         class: 'topbar-button',
    //         'innerHTML': '<i class="fas fa-list-ul"></i>',
    //         "data-cmd": 'insertUnorderedList'
    //
    //     }, {
    //         name: 'button',
    //         type: "button",
    //         class: 'topbar-button',
    //         'innerHTML': '<i class="fas fa-list-ol"></i>',
    //         "data-cmd": 'insertOrderedList'
    //     }, {
    //         name: 'button',
    //         type: "button",
    //         class: 'topbar-button',
    //         'innerHTML': '<i class="fas fa-link"></i>',
    //         "data-cmd": 'createLink'
    //     }, {
    //
    //         name: 'button',
    //         type: "button",
    //         class: 'topbar-button',
    //         'innerHTML': '<i class="fas fa-code"></i>',
    //         "data-cmd": 'showCode'
    //     }, {
    //         name: 'button',
    //         type: "button",
    //         class: 'topbar-button',
    //         'innerHTML': '<i class="fas fa-redo"></i>',
    //         "data-cmd": 'redo'
    //     }, {
    //         name: 'button',
    //         type: "button",
    //         class: 'topbar-button',
    //         'innerHTML': '<i class="fas fa-undo"></i>',
    //         "data-cmd": 'undo'
    //     }
    //
    //
    //
    // ],
    // sideNav: {
    //     class: 'sidenav',
    //     id: 'sidenav',
    //     div: [] // This has to be binded to Default Resource, configured in some UserViewTemplate.js dataset
    // },
    actionSpace:{
        id:'actionspace',
        actionEditorBlock:

            {
                name: 'div',
                class: 'actionEditor-block',
                id: 'actionEditor-block',
                lineNumbers: true,
                //mimeMode: ['html', 'richText', 'json', 'css', 'javascript'],
                //output: ['self', 'output'],
                state: 'idle',
                divBlock: [
                    {
                        name: 'div',
                        contentEditable: true,
                        class: 'div-block ',
                        lineNumbers: true,
                        innerText: "Write whatever you can think of...",
                        //mimeMode: ['html', 'richText', 'json', 'css', 'javascript'],
                        //output: ['self', 'output'],
                        state: 'idle',
                    },
                ]

            }

        ,
        actionOutPutBlock:
            [
                {
                    name: 'div',
                    class: 'actionOutput-block',
                    id: 'actionOutput-block',
                    lineNumbers: true,
                    //mimeMode: ['html', 'richText', 'json', 'css', 'javascript'],
                    //output: ['self', 'output'],
                    state: 'idle',
                    divBlock: [
                        {
                            name: 'div',
                            class: 'div-block ',
                            lineNumbers: true,
                            innerText: "Write whatever you can think of...",
                            //mimeMode: ['html', 'richText', 'json', 'css', 'javascript'],
                            //output: ['self', 'output'],
                            state: 'idle',
                        },
                    ]

                }

            ],
    },
}


console.log("loaded to dom", currentDocument,actionSpaceConfig);
