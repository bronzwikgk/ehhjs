
var actionHiddenTopNav = [
    {
    name: 'div',
        textContent: 'create',
    },
    {
        name: 'div',
       
        textContent: 'open',
    },
    {
        name: 'div',
       
        textContent: 'import',
    },
        
    
    // innerHTML: `    < a href = "#" class="row" > create</a >
    //                     <a href="#" class="row">import/open</a>
    //                     <a href="#" class="row">replay || reports</a>
    //                     <a href="#" class="row">export</a>`
]


var actionSpaceHeaderUserMenu = {
    "name": "div",
    class: 'container align_center',
    id: 'actionSpaceHeaderUserMenu',
    menuItem1: {
        'name': 'a',
        'class': 'dropdown',
        'href': '#action',
        'textContent': 'action',
        dropContent: {
            name: 'span',
            class: 'dropdown-content column container',
            item1: {
                name: 'div',
                class: 'content item',
                textContent: 'create    ctrl+n',
            },
            item2: {
                name: 'div',
                class: 'content item',
                textContent: 'import  ctrl + i',
            },
            item3: {
                name: 'div',
                class: 'content item',
                textContent: 'insert   ctrl + Shift + i',
            },
            item4: {
                name: 'div',
                class: 'content item',
                textContent: 'open   ctrl + 0',
            },
            item5: {
                name: 'div',
                class: 'content item',
                textContent: 'export   ctrl + e',
            },
            item6: {
                name: 'div',
                class: 'content item',
                textContent: 'print ctrl + p',
            },


        },
    },
    menuItem2: {
        'name': 'a',
        'class': 'dropdown',
        'href': '#people',
        'textContent': 'People',
        dropContent: {
            name: 'span',
            class: 'dropdown-content column container',
            item1: {
                name: 'div',
                class: 'content item',
                textContent: 'appointments    ctrl+n',
            },
            item2: {
                name: 'div',
                class: 'content item',
                textContent: 'activity report  ctrl + i',
            },
            item3: {
                name: 'div',
                class: 'content item',
                textContent: 'contact',
            },
            item4: {
                name: 'div',
                class: 'content item',
                textContent: 'open   ctrl + 0',
            },
            item5: {
                name: 'div',
                class: 'content item',
                textContent: 'export   ctrl + e',
            },
            item6: {
                name: 'div',
                class: 'content item',
                textContent: 'print ctrl + p',
            },


        },
    },
    menuItem3: {
        'name': 'a',
        'href': '#setting',
        'textContent': 'setting'
    },
    menuItem4: {
        'name': 'button',
        'class': "material-icons",
        'textContent': 'more_vert',
    }
}

var headerUser={
    'name': 'div',
    'desc': 'This is a horizontical bar, more functionality of this bar to be added',
    'id': 'header',
    'class': 'row',
    //  'textContent':"header",
    'brand': brand,
    'searchBar': {
        'name': 'input',
        'desc': 'This is a horizontical bar, more functionality of this bar to be added',
        'id': 'actionSearch',
        'placeholder': "search here...",
      'autocomplete': "off"
    },
    'menu': actionSpaceHeaderUserMenu,
}

var actionLayoutUserV3 = {
    
    id:'actionSpaceLayoutContainer',
    class: 'container column',
    section: headerUser,
    section2: actionSpaceBody,
    section3: footer,
}
var peopleLayoutUserV3 = {
    id: 'actionSpaceLayoutContainer',
    class: 'container column',
    section: headerUser,
    section2: actionSpaceBody,
    section3: footer,
}
var settingBody = {
    name: 'div',
    textContent:'setting'
}
var settingLayoutUserV3 = {
    id: 'actionSpaceLayoutContainer',
    class: 'container column',
    section: headerUser,
    section2: actionSpaceBody,
    section3: footer,
}