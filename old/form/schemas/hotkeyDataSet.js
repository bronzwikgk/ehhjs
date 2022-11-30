/**
 * This data Set Consist of all the hotKey's and Hot Range/words mapped to their defientions
 */

var hotKeyList = {
    "!": {
        name: 'option',
        keyIdentifier: "!",
        class: 'card',
        'innerText':"This inserts a HTML Template next to caret.",
        content: [`<!DOCTYPE html>
            < html lang="en" >
            <head>
                <meta charset="UTF-8">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                            <title>Document</title>
        </head>
                        <content>
                        </content>
        </html>`],
     //   "prefix": "!", 
    },

    "`": {
        name: 'option',
        keyIdentifier: "`",
        innerText: "This inserts a HTML Template next to caret.",
        content: ["'"],
        class: 'card',
       // "prefix": "`",

    },

    "(": {
        name: 'option',
        keyIdentifier: "(",
        content: [")"],
        class: 'card',
      //  "prefix": "(",

    },

    "{": {
        name: 'option',
        keyIdentifier: "{",
        content: ["}"],
        class: 'card',
      //  "prefix": "{",

    },
    "[": {
        name: 'option',
        keyIdentifier: "[",
        content: ["]"],
        class: 'card',
       // "prefix": "[",

    },
    "<": {
        name: 'option',
        keyIdentifier: "<",
        content: [">"],
        class: 'card',
        innerText:"Adds a reflection of < "
      //  "prefix": "<",

    },
    "for": {
        name: 'option',
        keyIdentifier: "for",
        innerText:"A Template for [for] function",
        class: 'card',
        onclick:`this.insertText`,
        'data': [" (let i = 0; i < size; i++) { \n }  \n "],
        //  "prefix": "<",
    },
    "function": {
        name: 'option',
        keyIdentifier: "function",
        innerText: "A Template for function",
        class: 'card',
        'data': ["  name (params)\n {\n }\n "],
        //  "prefix": "<",
    },
    "if": {
        name: 'option',
        keyIdentifier: "if",
        class: 'card',
        innerText:"This adss a template if Function",
        'content': ["  (condition) {\n }\n "],
        //  "prefix": "<",

    },
    "create": {
        name: 'option',
        keyIdentifier: "create",
        class: 'card',
        innerText:"create",
        'content': ["  (condition) {\n }\n "],
        //  "prefix": "<",
  
    }, "actionFlow": {
        name: 'option',
        keyIdentifier: "actionFlow",
        class: 'card',
        'content': ["  (condition) {\n }\n "],
        //  "prefix": "<",
    
    },

}


var hotKeyListViewSchemaModel = {
    hotKeyAutoSuggestList:{
    name: "ol",
        id: 'hotKeyAutoSuggestList',
    "textContent": "HotKey Found",
    "class": 'list',
    "listItems": [
    
       {
            name: 'div',
            id: 'hotKeyListItem',
           
            'role': 'code',
            //keyIdentifier: "!",
            "class": 'card autoSuggest material-icons',
            
            'textContent': "This inserts a HTML Template next to caret.",
            content: [`<!DOCTYPE html>
            < html lang="en" >
            <head>
                <meta charset="UTF-8">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                            <title>Document</title>
        </head>
                        <content>
                        </content>
        </html>`],
            //   "prefix": "!", 
        },

       {
            name: 'div',
            keyIdentifier: "`",
            textContent: "This inserts a HTML Template next to caret.",
            // content: ["'"],

            id: 'hotKeyList',
            //keyIdentifier: "!",
            "class": 'card autoSuggest',
            // "prefix": "`",

        },

       {
            name: 'div',
            textContent: "This inserts a HTML Template next to caret.",
            //  keyIdentifier: "(",
            //  content: [")"],
            id: 'hotKeyList',
            //keyIdentifier: "!",
            "class": 'card autoSuggest',
            //  "prefix": "(",

        },
       {
            name: 'div',
            // keyIdentifier: "{",
            // content: ["}"],
            class: 'card',
            //  "prefix": "{",
            textContent: "This inserts a HTML Template next to caret.",
            //  keyIdentifier: "(",
            //  content: [")"],
       
            //keyIdentifier: "!",
            id: 'hotKeyList',
            "class": 'card autoSuggest',
            //  "prefix": "(",

        },
        {
            name: 'div',
            textContent: "This inserts a HTML Template next to caret.",
            keyIdentifier: "[",
            content: ["]"],
            id: 'hotKeyList',
            "class": 'card autoSuggest',
            // "prefix": "[",

        },
        {
            name: 'div',
            keyIdentifier: "<",
      

            //  content: [">"],
            id: 'hotKeyList',
            "class": 'card autoSuggest',
            textContent: "Adds a reflection of < "
            //  "prefix": "<",

        },
        {
            name: 'div',
            keyIdentifier: "for",
            textContent: "A Template for [for] function",
            id: 'hotKeyList',
            "class": 'card autoSuggest',
            onclick: `this.insertText`,
            'data': [" (let i = 0; i < size; i++) { \n }  \n "],
            //  "prefix": "<",
        },
        {
            name: 'div',
            keyIdentifier: "function",
            textContent: "A Template for function",
            id: 'hotKeyList',
            "class": 'card autoSuggest',
            'data': ["  name (params)\n {\n }\n "],
            //  "prefix": "<",
        },
      {
            name: 'div',
            keyIdentifier: "if",
            id: 'hotKeyList',
            "class": 'card autoSuggest',
            textContent: "This adss a template if Function",
            'content': ["  (condition) {\n }\n "],
            //  "prefix": "<",

        },
        {
            name: 'option',
            keyIdentifier: "create",
            id: 'hotKeyList',
            "class": 'card autoSuggest',
            textContent: "create",
            'content': ["  (condition) {\n }\n "],
            //  "prefix": "<",

        },
         {
            name: 'div',
            keyIdentifier: "actionFlow",
            id: 'hotKeyList',
            "class": 'card autoSuggest',
            'content': ["  (condition) {\n }\n "],
            //  "prefix": "<",

        }
    ]
}
}