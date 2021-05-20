let form = document.getElementsByTagName("form")[0];
let results = document.getElementsByClassName("results")[0];

form.addEventListener("submit", function(e) {
  sendData();
});

// https://developer.mozilla.org/en-US/docs/Learn/HTML/Forms/Sending_forms_through_JavaScript
function sendData() {
  // var XHR = new XMLHttpRequest();
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
  // XHR.addEventListener("load", function(event) {
  //   if (XHR.readyState === XHR.DONE) {
  //     if (XHR.status === 200) {
  //       alert("Your order has been received! Check your email.");
  //       results.innerText  = XHR.responseText;
  //     } else {
  //       return;
  //     }
  //   }
  // });

  // Set up our request
  // XHR.open(form.getAttribute("method"), form.getAttribute("action"));
  // XHR.setRequestHeader("Content-Type", "application/json");
  // XHR.send(search);




  // fetch(form.getAttribute("action"), {
  //   method: form.getAttribute("method"),body: JSON.stringify(search)})
  //     .then(function(response) {return response.json();})
  //     .then(function(data) {
  //       console.log("Data returned from python server", data)
  // });

  let response = await fetch(form.getAttribute("action"), {
    method: form.getAttribute("method"),
    headers: {'Content-Type': 'application/json'},
    json: JSON.stringify(search),
    body: JSON.stringify(search),
    mode: "cors"
  });

  let result = await response.json();
  alert(result)


}


