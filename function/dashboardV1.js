var response2;
//indexDB.set('recentStories', recentStories);
//indexDB.set('userDashboard', userDashboard);
//console.log(userDashboard, recentStories)

StorageHelper.set(['userDashboard', userDashboard]);
StorageHelper.set(['recentStoriesCollection', recentStoriesCollectionDataSet]);
//var newStorageInstance = new StorageHelper('userDashboard', userDashboard);
var actionSpaceElementInstanceIndom = document.getElementById('actionSpaceContainer');
var actionSpaceViewInstance = new ActionView(userDashboard, actionSpaceElementInstanceIndom);

//console.log(actionSpaceInstace._actionView.entity)
var actionEventInstance = new ActionEvent('window', activeListerners['window']);
var actionSpaceController = new ActionController(actionSpaceViewInstance, userDashboard, actionEventInstance);
//console.log(actionSpaceController);




window.onload = function () {
    var loadTime = window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart;
    console.log(document.title,'dashboard.js Page load time is ' + loadTime/1000);
}

//this Request is to convert a
var buildJsonReq = {
    objectModel: 'document',
    method: 'querySelectorAll',
    arguments: ['script'],
    response:[],
    callback:'eachKeyReq',
}
var eachKeyReq = {
    
}

function buildJson() {
    var responseOutput=[];
    var element2Convert = document.querySelectorAll('script')
  //  console.log("converting", element2Convert);

    for (var key in element2Convert) {
        //console.log(element2Convert, element2Convert[key].src, element2Convert[key])
        if (element2Convert[key].src) {


            fetch(element2Convert[key].src)
                .then((response) => response.text())
                .then((source) => {
                  //  console.log(JSON.parse(JSON.stringify(source)));
                    responseOutput.push(JSON.parse(JSON.stringify(source)));
                  //  console.log(responseOutput)
                }).then((source) => {
           // console.log(responseOutput)
        })
            

            // fetch(element2Convert[key].src)
            //     .then(response => response.body)
            //     .then(rb => {
            //         const reader = rb.getReader();

            //         return new ReadableStream({
            //             start(controller) {
            //                 // The following function handles each data chunk
            //                 function push() {
            //                     // "done" is a Boolean and value a "Uint8Array"
            //                     reader.read().then(({ done, value }) => {
            //                         // If there is no more data to read
            //                         if (done) {
            //                             console.log('done', done);
            //                             controller.close();
            //                             return;
            //                         }
            //                         // Get the data and send it to the browser via the controller
            //                         controller.enqueue(value);
            //                         // Check chunks by logging to the console
            //                        // console.log(done, value);
            //                         push();
            //                     })
            //                 }

            //                 push();
            //             }
            //         });
            //     })
            //     .then(stream => {
            //         // Respond with our stream
            //         return new Response(stream, { headers: { "Content-Type": "text/javascript" } }).text();
            //     })
            //     .then(result => {
            //         // Do things with result
            //         //console.log(typeof result);
            //         responseOutput.push(result);
            //     });
        } 
    }
    console.log(responseOutput);
}

var data = {
  'key1': document.getElementById('actionSpaceContainer').innerText,
  'key2': document.getElementById('workSpaceBody').innerHTML,
}
console.log(data);
//buildJson();