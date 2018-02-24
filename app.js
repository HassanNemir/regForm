//DB configuration
var config = {
    apiKey: "AIzaSyDwT8snlUrUBNTK-eZHYlD-1DG56Y9eYJQ",
    authDomain: "regform-5e8a0.firebaseapp.com",
    databaseURL: "https://regform-5e8a0.firebaseio.com",
    projectId: "regform-5e8a0",
    storageBucket: "regform-5e8a0.appspot.com",
    messagingSenderId: "487657885838"
};
firebase.initializeApp(config);
var db= firebase.firestore();

function msg(fieldid,errid) {
    if (document.querySelector("#" + fieldid).value) {
        console.log("the field is full");
        document.querySelector("#" + errid).style.display = "none";
        return true;
    } else {
        console.log("empty");
        document.querySelector("#" + errid).style.display = "block";

    }
}
function required(){
    var a = msg("first","f");
    var b = msg("last","l");
    var c = msg("email","e");
    if(a && b && c){
        return true;
    }
}
//Form elements
var Div= function (id,name) {
    return{
        $type: "div",
        class: "form-group",
        $components: [
            {
                $type: "label",
                for: id,
                class:"col-sm-2",
                $text: name
            },
            {
                $type : "input",
                type: "text",
                id: id,
                name: name,
                style: "display:block",
                placeholder: name,
                class:"form-control"
            }
        ]
    }
};

//input fields
// var Input = function (id,name) {
//     return {
//         $type : "input",
//         type: "text",
//         id: id,
//         name: name,
//         style: "display:block",
//         placeholder: name
//     }
// };
// var Label = function (name,id){
//     return {
//         $type: "label",
//         for: id,
//         $text: name
//     }
// };
//error messages

// var displayErrMsgs = {
//     $cell :true,
//     $components: [
//         errMsgs("First name","f"),
//         errMsgs("Last name","l"),
//         errMsgs("E-Mail","e")
//     ],
//     $init: function(){
//         document.querySelector("#f").style.display = "none";
//         document.querySelector("#l").style.display = "none";
//         document.querySelector("#e").style.display = "none";
//     }
// };
var errMsgs = function (name,id) {
    return {
        $type: "div",
        $text: name + " field is required",
        id: id,
        class:"alert alert-warning"
    }
};
var Form = {
    $cell: true,
    $type:"div",
    class:"container",
    $components: [
        // Label("First Name","first"),
        // Input("first","First Name"),
        // Label("Last Name","last"),
        // Input("last","Last Name"),
        // Label("E-Mail","email"),
        // Input("email","E-Mail"),
        // Label("Cell Number","cell"),
        // Input("cell","Cell Number"),
        // Label("Notes","note"),
        // Input("note", "Notes"),
        {
            $type:"div",
            class: "col-md-8 col-md-offset-2",
            $components:[
                {
                  $type:"div",
                  class: "panel panel-primary",
                  $components: [
                      {
                          $type: "div",
                          $text: "Student Registration Form",
                          class:"panel-heading"
                      },
                      {
                          $type: "div",
                          class:"panel-body",
                          $components:[
                              {
                                  $components:[
                                      errMsgs("First name","f"),
                                      errMsgs("Last name","l"),
                                      errMsgs("E-Mail","e")
                                  ],
                                  $init: function(){
                                      document.querySelector("#f").style.display = "none";
                                      document.querySelector("#l").style.display = "none";
                                      document.querySelector("#e").style.display = "none";
                                  }
                              },
                              Div("first","First Name"),
                              Div("last","Last Name"),
                              Div("email","E-Mail"),
                              Div("cell","Cell Number"),
                              Div("note","Notes"),
                              {
                                  $type:"div",
                                  id:"progress"
                              },
                              {
                                  $type : "button",
                                  id: "saveButton",
                                  $text: "Save",
                                  class: "btn btn-primary",
                                  onclick: function(){
                                      if (required()) {
                                          // console.log("I've been clicked ");
                                          document.querySelector("#progress").innerHTML = "Saving..";
                                          var docRef = db.doc("users/" + first.value);
                                          docRef.get().then(function(doc){
                                              if (doc && doc.exists){
                                                  console.log("user already registered");
                                                  document.querySelector("#progress").innerHTML = "User is already registered";
                                              }else{
                                                  console.log("saving");
                                                  document.querySelector("#progress").innerHTML = "Saved Successfully ";
                                                  docRef.set({
                                                      firstName: document.querySelector("#first").value,
                                                      lastName: document.querySelector("#last").value,
                                                      email: document.querySelector("#email").value,
                                                      cell: document.querySelector("#cell").value,
                                                      note: document.querySelector("#note").value
                                                  }).then(function () {
                                                      console.log("Saved!");
                                                  }).catch(function (reason) {
                                                      console.log("caught error: " + reason)
                                                  });
                                              }}).catch(function (error) {
                                              console.log("Caught an error: " + error)
                                          });
                                      }

                                  }
                              }
                          ]
                      }
                  ]
                }
            ]
        }

    ]
};


