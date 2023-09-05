import React from "react";

var myHeaders = new Headers();
myHeaders.append("x-rapidapi-key", process.env.FOOTBALL_API_KEY);
myHeaders.append("x-rapidapi-host", "v3.football.api-sports.io");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

fetch('https://v3.football.api-sports.io/leagues?current=true', requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));