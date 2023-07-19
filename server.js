'use strict';
const express = require("express");
const app=express();
const cors = require('cors');
app.use(cors()); 
require("dotenv").config();

const axios = require('axios');



const arrData = require("./movieData/data.json");


app.get('/',movieData);
app.get("/favorite", endLog);


function movieData(req,res) {
    let newArr=[];
    for (let i = 0; i < arrData.length; i++) {
         newArr.push(arrData[i].title,arrData[i].poster_path,arrData[i].overview);
        
    }
    res.send(newArr);
    
}



function endLog(req, res) {
  res.send("Welcome to Favorite Page");
}

app.get("/trending", async (req, res) => {
  const axiosResponse = await axios.get(`https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.SECRET_API}&language=en-US`);
  const myData = axiosResponse.data.results.map((result) => ({
    "id": result.id,
    "title": result.title,
    "release_date": result.release_date,
    "poster_path": result.poster_path,
    "overview": result.overview
  })); ;
res.send(myData);
});

app.get("/search", async (req, res) => {
  let mName = req.query.query; 
 let axiosResponse = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.SECRET_API}&language=en-US&query=${mName}&page=2`);
  const receveData = axiosResponse.data.results;
  const movies = receveData.map((result) => ({
    "id": result.id,
    "title": result.title,
    "release_date": result.release_date,
    "poster_path": result.poster_path,
    "overview": result.overview
  }));
  res.send(movies);
});

app.get("/au", async (req, res, next) => {
  try {
      const axRes = await axios.get(`https://api.themoviedb.org/3/certification/tv/list?api_key=${process.env.SECRET_API}`);
      const myData = axRes.data.certifications.AU.map((x) => ({
          "certification": x.certification,
          "meaning": x.meaning,
          "order": x.order

      }));
      res.send(myData);

  } catch (error) {
      next('next error');
  }
});

//https://api.themoviedb.org/3/company/2?api_key=2fe3227676b48c615554c0b555b8389a
app.get("/searchCompanyDetails", async (req, res) => {
  let cNum = req.query.query;
  let axiosResponse = await axios.get(`https://api.themoviedb.org/3/company/${cNum}?api_key=${process.env.SECRET_API}`);
  res.send( axiosResponse.data)
});



app.use(handleNotFound);

function handleNotFound(req, res) {
  res.status(404).send(
  {
    status: 404,
    responseText: "Page not found"
  }
          );
}


// Handle server error (status 500)
app.use(handleError);

function handleError(err, req, res, next) {
    res.status(500).send(
    {
      status: 500,
      responseText: "Sorry, something went wrong"
    }
        ); 
}


  app.listen(3000, startingLog);

function startingLog(req, res) {
  console.log("Running at 3000");
}
