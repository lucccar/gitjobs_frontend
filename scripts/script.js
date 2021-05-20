let form = document.getElementsByTagName("form")[0];
let results = document.getElementsByClassName("results")[0];

form.addEventListener("submit", function(e) {
  sendData();
});

// https://developer.mozilla.org/en-US/docs/Learn/HTML/Forms/Sending_forms_through_JavaScript
function sendData() {
  var XHR = new XMLHttpRequest();
  let search = {}

  // radio buttons
  let radio1 = document.getElementsByName("location");
  for (var i = 0, length = radio1.length; i < length; i++) {
    if (radio1[i].checked) {
      console.log(radio1[i].value)
      search["location"] = radio1[i].value
    }
  }

  let radio2 = document.getElementsByName("description");
  for (var i = 0, length = radio2.length; i < length; i++) {
    if (radio2[i].checked) {
      console.log(radio2[i].value)
      search["description"] = radio2[i].value
    }
  }

  // If search is successful  
  XHR.addEventListener("load", function(event) {
    if (XHR.readyState === XHR.DONE) {
      if (XHR.status === 200) {
        alert("Your order has been received! Check your email.");
        results.innerText  = XHR.responseText;
      } else {
        return;
      }
    }
  });

  // Set up our request
  XHR.open(form.getAttribute("method"), form.getAttribute("action"));
  XHR.setRequestHeader("Content-Type", "application/json");
  XHR.send(JSON.stringify(search));

}
  // Combine the pairs into a single string and replace all %-encoded spaces to
  // the '+' character; matches the behaviour of browser form submissions.




  // Define what happens in case of error
  // XHR.addEventListener("error", function(event) {
  //   // This is normally a timeout or connection error.
  //   alert("Oops! Something went wrong.");
  // });


