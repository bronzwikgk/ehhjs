var actionStoryTemplate = {
    "name": 'actionStoryTemplate_title',
    "id": 'actionStoryTemplate',
    innerHTML: actionUserContent,
    //textContent: "this is a template actionStory",
    class: 'editable actionContent',
    'before': 'name',
    contentEditable: true
}
var actionWorkSpaceModelSchemaV1 = {
    actionSpaceBodySection: {
        name: 'section',
        id: 'bodySection',
        class: 'row',
      //  'LeftSideNavBar': leftSidebarModelSchemaV1,
        LeftSideNavBar: {
            name: 'section',
            id: "navigationSection",
            class: "coloumn",
            inside_navigationSection: {
                name: 'div',
                id: "inside_navigationSection",

                sideBar_header: {
                    name: 'div',
                    class: "side_bar_header",
                    brand: {
                        name: 'div',
                        class: "brand_logo",
                        textContent: 'Sunil Kumar',
                    },
                    sideBarControlMenu: {
                        name: 'div',
                        class: "HeaderControl flex align_center justify_center",
                        button1: {
                            name: 'div',
                            class: "mode_toggle_btn mr-15",
                            id: "MainHeaderHamburger1",
                        },
                        button2: {
                            name: 'i',
                            'class': "material-icons",
                            'textContent': 'add_box',
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
                                    'textContent': 'cloud',
                                },
                                item2: {
                                    name: 'div',
                                    'class': "collection_name",
                                    'textContent': 'cloud',
                                }

                            },
                            {
                                name: 'div',
                                class: 'item',
                                item1: {
                                    name: 'i',
                                    'class': "material-icons icon mr - 10",
                                    'textContent': 'album',
                                },
                                item2: {
                                    name: 'div',
                                    'class': "collection_name",
                                    'textContent': 'album',
                                }

                            }


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
                        textContent: "List",
                    },
                    collectionItem: {
                        name: 'div',
                        class: "collection drop_down",
                        innerHTML: `
                      <li><span class="parent collection">my Stories</span>
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

            <li><span class="parent">recent Stories</span>
                <ul class="nested">
                    <li>leaf</li>
                    <li>leaf</li>

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
        },
        actionWorkSpace: {
            name: 'section',
            id: "actionWorkspaceSection",
            class: "flex",
            workspaceHeader: {
                name: 'div',
                class: "workspaceHeader flex align_center row",
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
                        editBtn: {
                            name: 'button',
                            class: 'editBtn',
                            textContent: 'Edit'
                        }
                    },
                  
                },
                controlIcon: {
                    name: 'div',
                    class: "controlsIcon flex align_center",
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



                }
            },
            WorkspaceBody: {
                name: 'div', id: "BodyWorkspace",
                actionSpace: {
                    name: 'div', id: 'actionSpace', class: "row",
                    editor: {
                        name: 'div',
                        id: 'editor',
                        contentEditable: 'true',
                        class: 'column',
                        content: {
                            name: 'div',
                            id: 'content',
                            textContent: 'kuch toh log kahengey, unka kaam hey kehna..',
                        }

                    },
                    output: {
                        name: 'div', class: "coloumn", id: 'output',
                    }
                },
            },
                //     <div class="workspaceFooter">
                //         <p>https://www.0dot1.live</p>
                //     </div>

        }
    }
   
}

var leftSidebarModelSchemaV1 = {
    LeftSideNavBar: {
        name: 'section',
        id: "navigationSection",
        class: "tempo",
        inside_navigationSection: {
            name: 'div',
            id: "inside_navigationSection",
         
            sideBar_header: {
                name: 'div',
                class: "side_bar_header",
                brand: {
                    name: 'div',
                    class: "brand_logo",
                    textContent:'Sunil Kumar',
                },
                sideBarControlMenu: {
                    name: 'div',
                    class: "HeaderControl flex align_center justify_center",
                    button1: {
                        name: 'div',
                        class: "mode_toggle_btn mr-15",
                        id:"MainHeaderHamburger1",
                        },
                    button2: {
                        name: 'i',
                        'class': "material-icons",
                        'textContent': 'add_box',
                    },
                },
                
            },
            sideBar_CollectionList: {
                name: 'div',
                class:'collection_list',
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
                                'textContent': 'cloud',
                            },
                            item2: {
                                name: 'div',
                                'class': "collection_name",
                                'textContent': 'cloud',
                            }

                        },
                        {
                            name: 'div',
                            class: 'item',
                            item1: {
                                name: 'i',
                                'class': "material-icons icon mr - 10",
                                'textContent': 'album',
                            },
                            item2: {
                                name: 'div',
                                'class': "collection_name",
                                'textContent': 'album',
                            }

                        }

                        
                    ]
                }
            },
            hr: {
                name: 'div',
                class:'hr',
            },

            sideBar_Collection_withDropDown: {
                name: 'div',
                class: 'collection_list_with_drop_down',
                collectionTitle: {
                    name: 'div',
                    class: "miniHeading",
                    textContent:"List",
                },
                collectionItem: {
                    name: 'div',
                    class: "collection drop_down",
                    innerHTML:`
                      <li><span class="parent collection">my Stories</span>
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

            <li><span class="parent">recent Stories</span>
                <ul class="nested">
                    <li>leaf</li>
                    <li>leaf</li>

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
    },
}
  
var headerModelSchemaV1 = {
    header: {
        'name': 'section',
        'desc': 'This is a horizontical bar, more functionality of this bar to be added',
        'id': 'header',
        'class':'flex align_center row',
        //  'innerText':"header",
        'brand': {
            'name': 'img',
            'desc': 'This is a horizontical bar, more functionality of this bar to be added',
            'src': 'images/icons_221x.png',
            'style':"width:54px",
            'id': 'brand',
            'class': 'brand'
        },
        'input': {
            'name': 'input',
            'desc': 'This is a horizontical bar, more functionality of this bar to be added',
            'id': 'actionSearch',
            'placeholder': "search here...",
            'class': 'searchBar',
            'autocomplete': "off"
        },
        'menu': {
            "name": "menu",
            'id': "topmenu",
            'class': 'flex align_justify',
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
                    'name': 'a',
                    'href': '#about',
                    'textContent': 'about',

                },
                {
                    'name': 'button',
                    'class': "material-icons",
                    'textContent': 'more_vert',
                }
            ]

        }



    }
}

var iconBar = {
    'name': "iconBar",
    // 'style':"visibility:hidden",
    'id': 'iconBar',
    'class': "material-icons",
    'textContent': 'drag_indicator',
    "iconBarTools": [
        {
            'name': 'button',
            'class': "material-icons",
            'href': '#create',
            'textContent': 'create',
        },
        {
            'name': 'button',
            'href': '#people',
            'class': "material-icons",
            'textContent': 'inventory_2'
        },
        {
            'name': 'button',
            'href': '#setting',
            'class': "material-icons",
            'textContent': 'save'
        },
        {
            'name': 'button',
            'class': "material-icons",
            'textContent': 'share',

        },
        {
            'name': 'button',
            'class': "material-icons",
            'textContent': 'delete',

        }
    ]
}
var richTextBar = {
    'name': "div",
    'id': 'richTextBar',
    'class': "material-icons",
    'textContent': 'add',
    "iconBarTools": [
        {
            'name': 'button',
            'class': "material-icons",
            'href': '#title',
            'textContent': 'notes',
        },
        {
            'name': 'button',
            'href': '#text_format',
            'class': "material-icons",
            'textContent': 'title'
        },
        {
            'name': 'button',
            'href': '#insert_photo',
            'class': "material-icons",
            'textContent': 'insert_photo'
        },
        {
            'name': 'button',
            'class': "material-icons",
            'textContent': 'code',

        },
        {
            'name': 'button',
            'class': "material-icons",
            'textContent': 'attach_file',

        },
        {
            'name': 'button',
            'class': "material-icons",
            'textContent': 'horizontal_rule',

        },
        {
            'name': 'button',
            'class': "material-icons",
            'textContent': 'find_replace',

        },
        {
            'name': 'button',
            'class': "material-icons",
            'textContent': 'grid_4x4',

        },
        {
            'name': 'button',
            'class': "material-icons",
            'textContent': 'grid_4x4',

        }
    ]
}

var actionSpaceModel = {
    'actionSpace': {
        //RouteNavBar to be added.
        name: "section",
        id: "actionSpace",
        'iconBar': iconBar,
        "loadedRouteTitle": {
            "name": "div",
            'id': "loadedRouteTitle",
            "contentEditable": "true",
            'textContent': actionStoryTemplate.name
        },
        //   'textContent': "yo",
        // 'toolbar': iconBar,
        'editor': {
            'richTextBar': richTextBar,
            'name': 'div',
            'id': "editor",
            //'contentEditable':'true',
            "ol": [
                {
                    'id': 'contentBlock',
                    'textContent': actionStoryTemplate
                },
            ],
        },
        //bottom bar like textNote to be added.
    }
}
var itemListModelSchema = {
    itemList: {
        name: "ol",
        id: "itemListModelSchema",
        //  "class": "material-icons",
        "textContent": "shortcut",
        "li": itemModelSchema,
    }
}

var blockModelSchema = {
    "name": "div",
    "id": "blockModelSchma",
    "blockType": "html"
}

var typeOfBlocks = ["richtext,json,tree,html,javascript,table,image,link,divider,style,script,@mention,embed,button,breadcrumb,annotation"]
//should always be wrapped around a List/collection
var itemModelSchema = {
    "name": "div",
    'class': "card",
    "item": [
        {
            "name": "li",
            'class': "card",
            "textContent": "Item1",
            "innerItem": [


            ]
        },
        {
            "name": "li",
            'class': "card",
            "textContent": "Item1 Description",
            "innerItem": [


            ]
        },
    ]
}
var itemListModelSchema = {
    itemList: {
        name: "ol",
        id: "itemListModelSchema",
        //  "class": "material-icons",
        "textContent": "shortcut",
        "li": itemModelSchema,
    }
}
//hotKeyAutoSuggestItemModelSchema
var hotKeyAutoSuggestItemViewSchema = [
    {
        'name': 'span',
        "id": "listItemIcon",
        'class': "material-icons",
        'textContent': 'shortcut',
    },
    {
        'name': 'span',
        "id": "listItemId",
        'textContent': '! html',
    },
    {
        'name': 'div',
        "id": "listItemId",
        'textContent': 'List Item Content',
    },
]

var richtextToolBarButtonModel = [
    {
        name: 'select',
        id: 'TextThemeStyleList',
        class: 'toolTip',
        data: "Select Text + Choose a text Style, or save a new style...",
        option: [
            {
                name: 'option',
                id: 'TextThemeStyleitem1',
                textContent: "H1",
                class: "H1",
            },
            {
                name: 'option',
                id: 'TextThemeStyleitem2',
                textContent: "H2",
                class: "H2",
            },

            {
                name: 'option',
                id: 'TextThemeStyleitem2',
                textContent: "H3",
                class: "H3",
            },
            {
                name: 'option',
                id: 'TextThemeStyleitem2',
                textContent: "Select Text and Save a new Template",

            },

        ]
    },
    {
        name: 'select',
        id: 'TextFontList',
        class: 'toolTip',
        data: "Select font style",
        option: [
            {
                name: 'option',
                id: 'TextThemeStyleitem1',
                textContent: "Helvitica",
                class: "selectText",
            },
            {
                name: 'option',
                id: 'TextThemeStyleitem2',
                textContent: "Arial",
                class: "H2",
            },

            {
                name: 'option',
                id: 'TextThemeStyleitem2',
                textContent: "H3",
                class: "H3",
            },
            {
                name: 'option',
                id: 'TextThemeStyleitem2',
                textContent: "Select Text and Save a new Template",

            },

        ]
    }

]
