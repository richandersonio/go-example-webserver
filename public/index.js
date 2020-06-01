
var app = new Vue({
    el: '#app',
    data: {
      todos: [ "Enter a message and then hit Submit. ", "It will be sent to the server, stored on the messages list and then sent back with any previous messages" ],
      message: "",
      editMode: true,
      editForm: {
          name: ""
      }
    }
  });

function loaded() {

    var xhr = createCORSRequest('GET', '/greeting');

    xhr.onload = function(body) {
        var resp  = JSON.parse(xhr.responseText)
        app.message = resp.Greeting;
     };

    xhr.onerror = function() {
        alert('Woops, there was an error call the greeting api.');
    };

    xhr.send();
}

function echo() {
    var url = '/echo';
    var xhr = createCORSRequest('POST', url);

    xhr.onload = function() {
        var resp  = JSON.parse(xhr.responseText)
        if (resp.StatusCode == 0 ) {
            // hide the form so you can't post again, but say thank you.
            app.todos = resp.PreviousMessages;
        } else {
            alert("ok dear, we hit a snag....StatusCode:" + resp.StatusCode + " error: " + resp.ErrorMessage);
        }
     };

    xhr.onerror = function() {
        alert('Woops, there was an error making the request.');
    };

    var jsonRequest = { 
        "Message": document.forms['myForm'].message.value,
    }

    xhr.send(JSON.stringify(jsonRequest))

    // clear the input
    document.forms['myForm'].message.value = "";
  
    return false;
}

