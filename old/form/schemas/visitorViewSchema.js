
var actionSpaceHeaderVistorMenu = {
    "name": "div",
    class: 'container menu',
    id: 'actionSpaceHeaderUserMenu',
    "span": [
        {
            'name': 'a',
            'href': '#action',
            'textContent': 'product',
        },
        {
            'name': 'a',
            'href': '#people',
            'textContent': 'possiblities'
        },
        {
            'name': 'a',
            'href': '#setting',
            'textContent': 'setting'
        },
        {
            'name': 'span',
            class:'verticleBar',                           
        },
        {
            'name': 'a',
            'href': '#signup',
            'textContent': 'signup',
           // 'data-command': `[{"command":"signup"}]`,

        },
        {
            'name': 'a',
            'href': '#login',
            //'data-command': `[{"command":"signin"}]`,
            'textContent': 'login',

        },
    ]

}

var headerVistor = {
    'name': 'div',
    'desc': 'This is a horizontical bar, more functionality of this bar to be added',
    'id': 'header',
    'class': 'row',
    //  'textContent':"header",
    'brand': brand,
    'menu': actionSpaceHeaderVistorMenu,
}

var vistorBody= {
    name: 'section',
    class:'container row',
    id:'actionSpaceBody',
    sectionHeaderBanner: {
        name: 'div',
        'class': 'align_center',
        content: {
            name: 'div',
            class: 'headerContent',
            innerHTML: ehhIntro,
        }
    }
    
}

var basicLoginLayoutVisitorV1 = {
    id: 'actionSpaceLayoutContainer',
    class: 'container column',
    section: headerSignup,
    section2: loginModelV2,
    section3: footer,
}
var basicsignUpLayoutVisitorV1 = {
    id: 'actionSpaceLayoutContainer',
    class: 'container column',
    section: headerSignup,
    section2: signupModelV2,
    section3: footer,
}
var basicWebLayoutVisitorV1 = {
    id: 'actionSpaceLayoutContainer',
    class: 'container column',
    section: headerVistor,
    section2: vistorBody,
    section3: footer,
}
