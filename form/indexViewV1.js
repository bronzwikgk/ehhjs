var brand = {
    name: 'div',
    content: {
        name: 'a',
        'href': '#welcome',
        class:'container align_center',
        logo: {
            'name': 'img',
            'id': 'logo',
            'src': 'images/ehh3dlowres.png',
        },
        text: {
            name: 'span',
            class:'brandTitle',
            innerHTML:`everything happens here`
        }
    },   
}
var actionSpaceHeaderUserMenu = {
    "name": "div",
    class: 'container menu',
    id:'actionSpaceHeaderUserMenu',
    "span": [
        {
            'name': 'a',
            'href': '#action',
            'textContent': 'action',
        },
        {
            'name': 'a',
            'href': '#people',
            'textContent': 'People'
        },
        {
            'name': 'a',
            'href': '#setting',
            'textContent': 'setting'
        },
    {
            'name': 'button',
            'class': "material-icons",
            'textContent': 'more_vert',
        }
    ]

}
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

var signupModelV2 = {
    formSection: {
        name: 'section',
        class: 'container row',
     
        form: {
            id: 'regForm',
            name: 'form',
            'class': 'align_center',
            content: {
                'name': 'div',
                class:'column align_center',
                'formHeading': {
                    'name': 'h1',
                    'textContent': 'Sign Up',
                },
                item0: {
                    name: 'li',
                    class: 'full-width item',
                    'button': {
                        'name': 'button',
                        class: 'full-width',
                        icon: {
                            name: 'i', 'class': "material-icons", 'textContent': 'add_box',
                        },
                        textLable: {
                            name: 'lable',
                            'textContent': 'continue with google',
                        },

                    },
                },
                'hr': {
                    'name': 'hr', class: 'hr'
                },
                item1: {
                    name: 'li',
                    class: 'full-width item column',
                    'labelUsername': {
                        'name': 'label',
                        class: 'alignSelf-left small',
                        'for': 'username',
                        'textContent': 'Username',
                    },
                    'inputUsername': {
                        'name': 'input',
                        'type': 'text',
                        'id': 'username',
                        'required': 'true',
                        'placeholder': 'Enter Username',
                    }
                },
                item2: {
                    name: 'li',
                    class: 'full-width item',
                    'button': {
                        'name': 'button',
                        class: 'full-width',
                        textLable: {
                            name: 'lable',
                            'textContent': 'continue with email',
                        },

                    },
                },
                item3: {
                    name: 'li',
                    class: 'full-width item',
                    'textMessage': {
                        'name': 'div',
                        class: 'full-width',
                        textLable: {
                            name: 'lable',
                            class:'small',
                            'textContent': 'By signing up, you agree to the Terms of Service and Privacy Policy.',
                        },

                    },
                },

            }

        }
    }
}
var loginModelV2 = {
    formSection: {
        name: 'section',
        class: 'container row',

        form: {
            id: 'regForm',
            name: 'form',
            'class': 'align_center',
            content: {
                'name': 'div',
                class: 'column align_center',
                'formHeading': {
                    'name': 'h1',
                    'textContent': 'log in',
                },
                item0: {
                    name: 'li',
                    class: 'full-width item',
                    'button': {
                        'name': 'button',
                        class: 'full-width',
                        icon: {
                            name: 'i', 'class': "material-icons", 'textContent': 'add_box',
                        },
                        textLable: {
                            name: 'lable',
                            'textContent': 'continue with google',
                        },

                    },
                },
                'hr': {
                    'name': 'hr', class: 'hr'
                },
                item1: {
                    name: 'li',
                    class: 'full-width item column',
                    'labelUsername': {
                        'name': 'label',
                        class: 'alignSelf-left small',
                        'for': 'username',
                        'textContent': 'Username',
                    },
                    'inputUsername': {
                        'name': 'input',
                        'type': 'text',
                        'id': 'username',
                        'required': 'true',
                        'placeholder': 'Enter Username',
                    }
                },
                item2: {
                    name: 'li',
                    class: 'full-width item',
                    'button': {
                        'name': 'button',
                        class: 'full-width',
                        textLable: {
                            name: 'lable',
                            'textContent': 'continue with email',
                        },

                    },
                },
                item3: {
                    name: 'li',
                    class: 'full-width item',
                    'textMessage': {
                        'name': 'div',
                        class: 'full-width',
                        textLable: {
                            name: 'lable',
                            class: 'small',
                            'textContent': 'By signing up, you agree to the Terms of Service and Privacy Policy.',
                        },

                    },
                },

            }

        }
    }
}
var headerSignup = {
    'name': 'div',
    'desc': 'This is a horizontical bar, more functionality of this bar to be added',
    'id': 'header',
    'class': 'row',
    //  'textContent':"header",
    'brand': brand,
  //  'menu': actionSpaceHeaderVistorMenu,
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
var leftSideNavBar= {
    name: 'section',
    id: "navigationSection",
    class: "column",
    inside_navigationSection: {
        name: 'div', id: "inside_navigationSection",
        sideBar_header: {
            name: 'div',
            id:'side_bar_header',
            class: "justify_SpaceBetween container",
            brand: {
                name: 'div',
                class: "brand_logo",
                textContent: 'Sunil Kumar',
                    },
            sideBarControlMenu: {
                name: 'div',
                class: "HeaderControl align_center justify_center",
                button1: {
                    name: 'button',class: "mode_toggle_btn mr-15", id: "MainHeaderHamburger1",
                        },
                button2: {
                    name: 'i','class': "material-icons",'textContent': 'add_box',
                        },
            },

        },
        sideBar_CollectionList: {
            name: 'div',
                class: 'collection_list',
                    collectionItem: {
                name: 'div',
                    class: "collection",
                        items: [
                            {
                                name: 'div',
                                class: 'item',
                                item1: {
                                    name: 'i',
                                    'class': "material-icons icon mr - 10",
                                    'textContent': 'add',
                                },
                                item2: {
                                    name: 'div',
                                    'class': "collection_name",
                                    'textContent': 'new actionStory', 
                                },
                                'data-command': '[{"command":"new ","entity": "actionContent","value":"innerHTML"}]',
                            },
                            {
                                name: 'div',
                                class: 'item',
                                item1: {
                                    name: 'i',
                                    'class': "material-icons icon mr - 10",
                                    'textContent': 'folder_open',
                                },
                                item2: {
                                    name: 'div',
                                    'class': "collection_name",
                                    'textContent': 'add collection',
                                },
                                'data-command': `[{"command":"FSOpenDirectory"}]`,
                            },
                            {
                                name: 'div',
                                class: 'item',
                                item1: {
                                    name: 'i',
                                    'class': "material-icons icon mr - 10",
                                    'textContent': 'save',
                                },
                                item2: {
                                    name: 'div',
                                    'class': "collection_name",
                                    'textContent': 'save',
                                },
                                'data-command': `[{"command":"FS_Save"}]`,
                            },
                        ]
            }
        },
        hr: {
            name: 'div',
                class: 'hr',
                },

        sideBar_Collection_withDropDown: {
            name: 'div',
                class: 'collection_list_with_drop_down',
                    collectionTitle: {
                name: 'div',
                    class: "miniHeading",
                        textContent: "actionStories & Collections",
                    },
            collectionItem: {
                name: 'div',
                    class: "collection",
                        innerHTML: `
                      <li><span class="parent collection">my collection</span>
                      <ul class="nested" id = "workspace">
                      </ul>
                      </li>
            <span class="hozintalLine"></span>
            <li><span class="parent">Recent Files</span>
                <ul class="nested">
                    <li>story 1</li>
                    <li>story 2</li>
                    <li>story 3</li>
                    <li>story 4</li>
                    <li>
                    <li><span class="parent">my Nested Stories</span>
                        <ul class="nested">
                            <li>story 1</li>
                            <li>story 2</li>
                            <li>story 3</li>
                            <li>story 4</li>
                        </ul>
                    </li>
                    errands
            </li>

            <li><span class="parent">recent Stories</span>
                <ul class="nested">
                    <li>leaf</li>
                    <li>leaf</li>

                </ul>
            </li>
            </ul>
            </li>
            <span class="hozintalLine"></span>
            <li><span class="parent">Starred</span>
                <ul class="nested">
                    <li>story 1</li>
                    <li>story 2</li>
                    <li>story 3</li>
                    <li>story 4</li>
                    <li>
                    <li><span class="parent">my Nested Stories</span>
                        <ul class="nested">
                            <li>story 1</li>
                            <li>story 2</li>
                            <li>story 3</li>
                            <li>story 4</li>
                        </ul>
                    </li>
                    errands
            </li>

            <li><span class="parent">recent Stories</span>
                <ul class="nested">
                    <li>leaf</li>
                    <li>leaf</li>

                </ul>
            </li>
            </ul>
            </li>
            <li><span class="parent">Tags</span>
                <ul class="nested">
                    <li>story 1</li>
                    <li>story 2</li>
                    <li>story 3</li>
                    <li>story 4</li>
                    <li>
                    <li><span class="parent">my Nested Stories</span>
                        <ul class="nested">
                            <li>story 1</li>
                            <li>story 2</li>
                            <li>story 3</li>
                            <li>story 4</li>
                        </ul>
                    </li>
                    errands
            </li>


                </ul>
            </li>
            </ul>
            </li>
            <li><span class="parent">Trash</span>
                <ul class="nested">
                    <li>story 1</li>
                    <li>story 2</li>
                    <li>story 3</li>
                    <li>story 4</li>
                    <li>
                    <li><span class="parent">my Nested Stories</span>
                        <ul class="nested">
                            <li>story 1</li>
                            <li>story 2</li>
                            <li>story 3</li>
                            <li>story 4</li>
                        </ul>
                    </li>
                    errands
            </li>

            <li><span class="parent">recent Stories</span>
                <ul class="nested">
                    <li>leaf</li>
                    <li>leaf</li>

                </ul>
            </li>
            </ul>
            </li>`
            }
        },
        sideBar_footer: {
            name: 'div',
                id: "SidebarFooter",
                    newCollectionBtn: {
                name: 'div',
                    class: 'newCollectionBtn flex align_center',
                        id: '',
                            'textContent': 'add Collections',
                                items: [
                                    {
                                        name: 'i',
                                        'class': "material-icons",
                                        'textContent': 'library_add',
                                    },

                                ]


            },
            footerIcons: {
                name: 'div',
                    class: 'footerIcon flex align_center',
                        id: 'footerIcon',
                            items: [
                                {
                                    name: 'i',
                                    'class': "material-icons",
                                    'textContent': 'favorite',
                                }, {
                                    name: 'i',
                                    'class': "material-icons",
                                    'textContent': 'download_for_offline',
                                }, {
                                    name: 'i',
                                    'class': "material-icons",
                                    'textContent': 'settings',
                                },
                            ]


            },

        },

    }
}
var directoryJSON = {
    'li':{
    'name':'li',
    'span':{
        'name':'span',
        'class':'parent',
        "innerText":'', //inner Text will be included
    },
    'list':{
        'name':'ul',
        'class':'nested',
        'id':'' //id - Unique ID with which directory handle of this folder can ke retrieved from indexDB
    }
    }
}
var fileJSON = {
    'name':'li',
    'id':'', //id - Unique ID with which file handle of this file retrieved from indexDB
     'class':'file',//used for opening file
     "innerText":'',
     //innerText - name of the file
     'data-command': `[{"command":"file"}]`,
}
var workspaceHeader= {
    name: 'div',
    class: "align_center row",
    id:'workspaceHeader',
    MainHeaderHamburger: {
        name: 'div',
        class: "mode_toggle_btn mr-15",
        style: "background-color: #333;",
        id: "MainHeaderHamburger2"
    },
    pageNavigate: {
        name: 'div',
        class: "flex align_center",
        back: {
            name: 'i',
            'class': "material-icons",
            'textContent': 'navigate_before',
        },
        next: {
            name: 'i',
            'class': "material-icons",
            'textContent': 'navigate_next',
        },
    },
    workSpaceTitle: {
        name: 'div',
        class: "title_edit flex align_center",
        title: {
            name: 'div',
            class: 'title',
            textContent: 'WorkSpaceTitle',
        },

    },
     'vl':{
        'name': 'span',
        class: 'verticleBar',                           
        },
    tools: {
        name: 'div',
        class:'row',
        share: {
            name: "div",
            class: "share icon",
            icon: {
                name: 'i',
                'class': "material-icons",
                'textContent': 'share',
            },
        },
        heart: {
            name: "div",
            class: "heart icon",
            icon: {
                name: 'i',
                'class': "material-icons",
                'textContent': 'favorite',
            },

        },
        delete: {
            name: "div", class: "delete icon",
            icon: {
                name: 'i', 'class': "material-icons", 'textContent': 'delete',
            },

        },
        insertTitle: {
            name: 'div',
            class: 'icon',
            icon: {
                'name': 'i', 'class': "material-icons", 'textContent': 'title',
            },
        },
        icon2: {
            name: 'div',
            class: 'icon',
            icon: {
                'name': 'i', 'class': "material-icons", 'textContent': 'image',
            },
        },
        icon3: {
            name: 'div',
            class: 'icon',
            icon: {
                'name': 'i', 'class': "material-icons", 'textContent': 'format_list_bulleted',
            },
        },

        icon4: {
            name: 'div',
            class: 'icon',
            icon: {
                'name': 'i', 'class': "material-icons", 'textContent': 'attachment',
            },
        },

        icon5: {
            name: 'div',
            class: 'icon',
            icon: {
                'name': 'i', 'class': "material-icons", 'textContent': 'format_quote',
            },
        },

        icon6: {
            name: 'div',
            class: 'icon',
            icon: {
                'name': 'i', 'class': "material-icons", 'textContent': 'code',
            },
        },

        icon7: {
            name: 'div',
            class: 'icon',
            icon: {
                'name': 'i', 'class': "material-icons", 'textContent': 'horizontal_rule',
            },
        },

        icon8: {
            name: 'div',
            class: 'icon',
            icon: {
                'name': 'i', 'class': "material-icons", 'textContent': 'grid_on',
            },
        },



    }
}
var workSpaceBody = {
    name: 'div',
    id: 'workSpaceBody',
    class: 'container',
    userView: {
        name: 'div',
        class: 'container col',
        id:'userView',
        editor: {
            name: 'div',
            class: 'container column',
            id:'editor',
            // tabs: {
            //     name: 'div',
            //     class: 'container',
            //     id: 'storyTabs',
            //     items: {
            //         file1: {
            //             name: 'button',
            //             textContent: 'file1',
            //             close: {
            //                 name: 'i',
            //                 class: "material-icons",
            //                 id: 'close',
            //                 textContent: 'close',
            //             },

            //         },
            //         file2: {
            //             name: 'button',
            //             textContent: 'file2',
            //             close: {
            //                 name: 'i',
            //                 class: "material-icons",
            //                 id: 'close',
            //                 textContent: 'close',
            //             },

            //         },
            //         file3: {
            //             name: 'button',
            //             textContent: 'file3',
            //             close: {
            //                 name: 'i',
            //                 class: "material-icons",
            //                 id: 'close',
            //                 textContent: 'close',
            //             },

            //         },
            //     }


            // },
            content: {
                name: 'div',
                class: 'container column',
                id: 'content',
                contentEditable: 'true',
                activeActionStory: {
                    name: 'div',
                    class: 'container coloum',
                    id: 'activeActionStory',
                    ul: {
                        name: 'ul',
                        class: 'blocks',
                        li: {
                            name: 'li',
                            class: 'blockContent',
                            innerHTML: sampleIntroStory
                        }
                    }
                    
                }
                
            }
        },
        output: {
            name: 'div',
            class: 'container',
            id:'output',
            textContent:'output',
            
        }
    },
    
    
    
    
}
var actionWorkSpace = {
    name: 'section',
    id: "actionWorkspaceSection",
    class: "column",
  //  'workspaceHeader': workspaceHeader,
    'workSpaceBody': workSpaceBody,
   
  
   
}
var actionSpaceBody = {
    name: 'div',
    class: 'container row',
    id: 'actionSpaceBody',
    sidebarSection: leftSideNavBar,
    workSpaceSection: actionWorkSpace,
}
var footer= {
    name: 'div',
    class: 'workspaceFooter',
    p: {
        name: 'p',
        textContent: 'https://www.0dot1.live',
    }
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

var actionSpaceViewModel = [
    {
        keyword: 'welcome',
        name: 'homePage',
        id: 'ehhhomePage',
        actorRole: 'all',
        model: basicWebLayoutVisitorV1,  
    },
    {
        keyword: 'action',
        name: 'actionWorkSpace',
        id: 'actionWorkSpace',
        actorRole: 'user',
        model: actionLayoutUserV3,
    },
    {
        keyword: 'people',
        name: 'peopleSpace',
        id: 'peopleSpace',
        actorRole: 'user',
        model: peopleLayoutUserV3,
    },
    {
        keyword: 'setting',
        name: 'settingSpace',
        id: 'settingSpace',
        actorRole: 'user',
        model: settingLayoutUserV3,
    },
    {
        keyword: 'login',
        name: 'loginSpace',
        id: 'loginSpace',
        actorRole: 'user',
        //model: basicWebLayoutVisitorV1,
        model: basicLoginLayoutVisitorV1,
    },
    {
        keyword: 'signup',
        name: 'signupSpace',
        id: 'signupSpace',
        actorRole: 'visitor',
        model: basicsignUpLayoutVisitorV1,
    },
]
console.log(actionSpaceViewModel)