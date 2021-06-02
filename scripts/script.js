let form = document.getElementsByTagName("form")[0];
let button = document.getElementsByTagName("button")[0];
let results = document.getElementsByClassName("results")[0];
let radio1 = document.getElementsByName("location");
let radio2 = document.getElementsByName("description");


const record_search_url = 'http://localhost:5000/record_search'
let get_jobs = 'http://localhost:5000/get_jobs/'


async function updatePage() {

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


  let addStyleToResults = async () => {
    results.style.borderRadius = '10px';
    results.style.boxShadow ='0 0 15px 4px rgba(0,0,0,0.06)';
    results.style.marginBottom = '2%';
  }

  let jobsValidation = async () => {
    if (document.getElementsByTagName("tr").length === 0) {
      results.innerHTML = "<div class='nojobs' > There aren't jobs for this stack in this city... </div>"
    }
  }

 

  get_jobs_url = get_jobs.concat(search["location"], '/', search["description"])

  let responsePost = await fetch(record_search_url, {method: 'POST',body: JSON.stringify(search)});
  let jsonData =  await responsePost.json();
  console.log("Data returned from python server", jsonData)


  let responseGet = await fetch(get_jobs_url, { method:'GET'})
  let jsonDataGet = await responseGet.json();
  await addStyleToResults();
  results.innerHTML = await jsonDataGet;
  await jobsValidation();

};


form.addEventListener("submit", function(e) {
  e.preventDefault();
  updatePage();
});