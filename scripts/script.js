let form = document.getElementsByTagName("form")[0];
let button = document.getElementsByTagName("button")[0];
let results = document.getElementsByClassName("results")[0];
let radio1 = document.getElementsByName("location");
let radio2 = document.getElementsByName("description");


const record_search_url = 'http://localhost:5000/record_search'
let get_jobs = 'http://localhost:5000/get_jobs/'


function updatePage() {

  let search = {}


  for (var i = 0, length = radio1.length; i < length; i++) {
    if (radio1[i].checked) {
      radio1Index = i
      search["location"] = radio1[i].value
    }
  }

  for (var i = 0, length = radio2.length; i < length; i++) {
    if (radio2[i].checked) {
      search["description"] = radio2[i].value
      radio2Index = i
    }
  }


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
        addStyleToResults();
        results.innerHTML= jobs_data;
        jobsValidation();
  });
}


form.addEventListener("submit", function(e) {
  e.preventDefault();
  updatePage();
});