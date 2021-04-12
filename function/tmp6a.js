
var nodes = [
    { "id": 1, "pId": 0, "name": "Parent 1 - Expand", "open": true },
    { "id": 11, "pId": 1, "name": "Parent 11 - Collapse" },
    { "id": 12, "pId": 1, "name": "Parent 12 - Collapse" },
    { "id": 13, "pId": 1, "name": "Parent 13 - no children" },
    { "id": 2, "pId": 0, "name": "Parent 2 - Collapse" },
    { "id": 21, "pId": 2, "name": "Parent 21 - Expand", "open": true },
    { "id": 22, "pId": 2, "name": "Parent 22 - Collapse" },
    { "id": 23, "pId": 2, "name": "Parent 23 - Collapse" },
    { "id": 3, "pId": 0, "name": "Parent 3 - no children" }
]

function getTree(data, root, idTxt, pidTxt, pushTxt) {
    var idTxt = idTxt || 'id';
    var pidTxt = pidTxt || 'pid';
    var pushTxt = pushTxt || 'children';
    // recursive method
    function getNode(id) {
        var node = []
        for (var i = 0; i < data.length; i++) {
            if (data[i][pidTxt] == id) {
                data[i][pushTxt] = getNode(data[i][idTxt])
                node.push(data[i])
            }
        }
        if (node.length == 0) {
            return
        } else {
            return node
        }
    }
    // Use the root node
    return getNode(root)
}

function test() { 

    tree = getTree(nodes);
    console.log(tree);
    
}



/**
 * 
 * @param data items array
 * @param idKey item's id key (e.g., item.id)
 * @param parentIdKey item's key that points to parent (e.g., item.parentId)
 * @param noParentValue item's parent value when root (e.g., item.parentId === noParentValue => item is root)
 * @param bidirectional should parent reference be added
 */
function flatToTree(data, idKey, parentIdKey, noParentValue = null, bidirectional = true) {
    const nodes = {}, roots = {}, leaves = {};

    // iterate over all data items
    for (const i of data) {
        // add item as a node and possibly as a leaf
        if (nodes[i[idKey]]) { // already seen this item when child was found first
            // add all of the item's data and found children
            nodes[i[idKey]] = Object.assign(nodes[i[idKey]], i);
        } else { // never seen this item
            // add to the nodes map
            nodes[i[idKey]] = Object.assign({ $children: [] }, i);
            // assume it's a leaf for now
            leaves[i[idKey]] = nodes[i[idKey]];
        }
        // put the item as a child in parent item and possibly as a root
        if (i[parentIdKey] !== noParentValue) { // item has a parent
            if (nodes[i[parentIdKey]]) { // parent already exist as a node
                // add as a child
                (nodes[i[parentIdKey]].$children || []).push(nodes[i[idKey]]);
            } else { // parent wasn't seen yet
                // add a "dummy" parent to the nodes map and put the item as its child
                nodes[i[parentIdKey]] = { $children: [nodes[i[idKey]]] };
            }
            if (bidirectional) {
                // link to the parent
                nodes[i[idKey]].$parent = nodes[i[parentIdKey]];
            }
            // item is definitely not a leaf
            delete leaves[i[parentIdKey]];
        } else { // this is a root item
            roots[i[idKey]] = nodes[i[idKey]];
        }
    }
    return { roots, nodes, leaves };
}