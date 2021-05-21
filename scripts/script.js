let form = document.getElementsByTagName("form")[0];
let button = document.getElementsByTagName("button")[0];
let results = document.getElementsByClassName("results")[0];


const record_search_url = 'http://localhost:5000/record_search'
let get_jobs = 'http://localhost:5000/get_jobs/'


// https://developer.mozilla.org/en-US/docs/Learn/HTML/Forms/Sending_forms_through_JavaScript
function sendData() {
  // console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
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

  // fetch(record_search_url, {
  //   method: 'POST',body: JSON.stringify(search)})
  //     .then(function(response) {return response.json();})
  //     .then(function(data) {
  //       console.log("Data returned from python server", data)
  // });


  let addStyleToResults = () => {
    results.style.borderRadius = '10px';
    results.style.boxShadow ='0 0 15px 4px rgba(0,0,0,0.06)';
    results.style.marginBottom = '2%';
  }

  let jobsValidation = () => {
    if (document.getElementsByTagName("tr").length === 0) {
      results.innerHTML = "<div class='nojobs' > There aren't jobs for this stack in this city... </div>"
    }
  }

 

  get_jobs_url = get_jobs.concat(search["location"], '/', search["description"])



  fetch(get_jobs_url, { method:'GET'})
      .then(function(response) {return response.json();})
      .then(function(jobs_data) {
        console.log(jobs_data);
        addStyleToResults();
        results.innerHTML= jobs_data;
        jobsValidation();
  });


  // let response = fetch(record_search_url, {
  //   method: "POST",
  //   headers: {'Content-Type': 'application/json'},
  //   body: JSON.stringify(search),
  //   mode: "cors"
  // });

  // alert(response)

  // results.innerHTML = response;
  

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
  // XHR.open(form.getAttribute("method"), record_search_url);
  // XHR.setRequestHeader("Content-Type", "application/json");
  // XHR.send(JSON.stringify(search));


}

form.addEventListener("submit", function(e) {
  e.preventDefault();
  sendData();
});

