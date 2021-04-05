var response2;
indexDB.set('actionSpaceModel', actionSpaceViewModel);
var viewModel = indexDB.get('actionSpaceModel');
    response2 = viewModel.then((viewModelFromIndexDb) => {
      //  console.log("here", viewModelFromIndexDb);
    // expected output: "Success!"
        var response = viewModelFromIndexDb;
        console.log(response);
        
        
    //    test(response)
        return response;
    });


function test(response) {
    //console.log(response);
    var actionSpaceElementInstanceIndom = document.getElementById('actionSpaceContainer');
    var actionSpaceViewInstance = new ActionView(response[0].model, actionSpaceElementInstanceIndom);
    //console.log(actionSpaceInstace._actionView.entity)
    var actionEventInstance = new ActionEvent(actionSpaceViewInstance, window);
    var actionSpaceController = new ActionController(actionSpaceViewInstance, response[0].model, actionEventInstance);
  //  var DOMJson = engine.executeSynReq(getKey);
    // console.log(DOMJson)
   // var actionSpaceElementInstanceIndom = document.getElementById('actionSpaceBody');

  //  var tempo3 = document.getElementById("actionSpaceBody");

   // console.log("here3", DOMJson);
//console.log(HorizonticalMenuTemplateSchema,actionSpaceElementInstanceIndom)
//console.log(actionSpaceViewModel[0].model);

}
//console.log(ActionView)
//window.onload = test;

var actionSpaceElementInstanceIndom = document.getElementById('actionSpaceContainer');
var actionSpaceViewInstance = new ActionView(actionSpaceViewModel[0].model, actionSpaceElementInstanceIndom);
//console.log(actionSpaceInstace._actionView.entity)
 var actionEventInstance = new ActionEvent(actionSpaceViewInstance, window);
 var actionSpaceController = new ActionController(actionSpaceViewInstance, actionSpaceViewModel[0].model, actionEventInstance);
