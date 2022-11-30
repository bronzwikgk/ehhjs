Message :
    requestId -> 20 character unique id
    origin -> Origin of the message generally the name of the Client/Controller/Entity
    originType -> The Type of Origin Client/Controller/Entity
    destination -> Destination of the message generally the name of the Client/Controller/Entity
    destinationType -> The Type of Destination Client/Controller/Entity
    Type -> The Type of Message (Request , Response)
    messageData :
        actionMethod -> Name Of The Request Method
        args -> array that contains all the arguments
        status -> success or failure
        data -> Response Data
        messageText -> Text Message For Debugging

Request :
    name :- Title Of The Request
    status :- failure/success/pending
    onSuccess :- What to do After successful Completion Of The Request
    onFailure :- What to do After Failoure Of The Request
    startTime :- The Time When the request was created
    endTime :- The Time When the request got comppleted
    responseTime :- Total time in milloisecond that took the request to get completed



Client :-
    The Client has access to DOM ,
    The Client Will Update the DOM and listen to event from the DOM

Pending Task on Client :-
    1) Event Listener
    2) Routing

Q :- How new functionality will be addedd in client ?
A :- Any new Client that a user want to create will extend the Client class;
     and the config will be updated as per the requirement.

    All the extended functions in the client will work in two ways
    1) TheFunction was triggered as an event .
    2) The Function was triggered on successful completion or failure of other request.

    case 1 :- A node element will be passed as a parameter .
              Everything will be taken out from that node element 
    case 2 :- An array will be passed
              Everything will be taken out from this array


            all the functions must return a message

            request and message is returned when there is a follow up action that has to be completed

// Response Message when everything ended
            message : {
                type :  "Response",
                mesageData : {
                    status : "completed"
                }
            }

// Response Message when current request ended and a new request will follow
    // Creating new Request after current Ends
            message : {
                type :  "Request",
                mesageData : {
                    status : "completed" ,
                    actionMethod,
                    args : []
                }
            }

    // What to do after thee currnt request ends
            request : {
                name: actionMethod,
                onSuccess  , 
                onFailure
            }