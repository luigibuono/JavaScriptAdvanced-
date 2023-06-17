import "../styles/index.scss";
import axios from "axios";
// Input 
const inputSearch = document.getElementById("input-search");

const btnSearch = document.getElementById("btn-search");

const errMessage = document.getElementById("error-message");
// Container scores
const containerScores = document.getElementById("container-scores")

// Response API var's
const nameCity = document.getElementById("city-name");

const containerSummray = document.getElementById("container-summary");

const summaryText = document.getElementById("summary-text");
let city; 

let url;

let cityData;

let citySummary;

let cityScore;

let dataColor;

let dataName;

let dataVote;
function fetchCity(){

  errMessage.style.display ="none";

  city = inputSearch.value;

  city = city
  .toLowerCase()
  .trim()
  .replace(' ', '-');

  url = `https://api.teleport.org/api/urban_areas/slug:${city}/scores/`;
  axios.get(url)
  .then(response => {
      inputSearch.value = "";
      containerScores.innerHTML = "";

      cityData = response.data.categories;
      citySummary = response.data.summary;
      cityScore = response.data.teleport_city_score;

      
      setData()
  })
  .catch(err => {
    if (err.response.status === 404) {
      errMessage.innerHTML = "You have a typo or your city is not in the API Teleport"
      errMessage.style.display="block";
      
    } else if (err.response.status === 500) {
        errMessage.innerHTML = "There is a problem with the server response"
        errMessage.style.display="block"
    } else{
        errMessage.innerHTML = "There was a problem, please try again"
    }
    
});
};
function setData(){

  // Title
  city = city
  .charAt(0).toUpperCase() + city.slice(1)
  .replace('-', ' ');

  nameCity.innerHTML = city;

  // Summary
  summaryText.innerHTML = citySummary

  // Add the scores
  
  for (let i = 0; i < cityData.length; i++){

      dataColor = cityData[i].color;
      dataName = cityData[i].name;
      dataVote = Math.round(cityData[i].score_out_of_10)

      containerScores.innerHTML +=
          `
          <div class="score">
              <div class="header__score">
                  <h2 class="name__score">${dataName}</h2>
                  <span class="value__score">${dataVote}/10</span>
              </div>
              <div class="score__bar">
                      <div class="color__score__bar" style="background:${dataColor};width:${dataVote*10}%;" ></div>
                  </div>
          </div>
          `
  }
// Ending of scores

city = city
.toLowerCase()
.trim()
.replace(' ', '-');

containerScores.innerHTML +=
`
<div class="ending__score">
    <p class="teleport__vote">TELEPORT VOTE </p>
    <p class="vote">${dataVote}</p>
    <button class="teleport__btn btn">
        <a href="https://teleport.org/cities/${city}" target="_blank">More info</a>
    </button>
</div>
`

}
btnSearch.addEventListener("click", fetchCity)

inputSearch.addEventListener('keyup', event => {
    if(event.keyCode === 13){
        event.preventDefault();
        btnSearch.click();
    };
});