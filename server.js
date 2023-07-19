'use strict';
const express = require("express");
const app=express();
const cors = require('cors');
app.use(cors()); 
const pg=require("pg");
require("dotenv").config();
app.use(express.json());//parse the body from request
const axios = require('axios');
const moviesRoutes=require("./routes/movies.routes");
const generalRoutes=require("./routes/general.routes");
const {PORT}=require("./configs");
const dbCli=require("./client");
// const arrData = require("./movieData/data.json");
const notFound=require("./errorHandler/404");
const serError=require("./errorHandler/500");

app.use(moviesRoutes);
app.use(generalRoutes);

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


//https://api.themoviedb.org/3/movie/157336?api_key=2fe3227676b48c615554c0b555b8389a&append_to_response=videoshttps://api.themoviedb.org/3/movie/157336?api_key=2fe3227676b48c615554c0b555b8389a&append_to_response=videos
app.get("/appendToResponse", async (req, res) => {
  const axiosResponse = await axios.get(`https://api.themoviedb.org/3/movie/157336?api_key=${process.env.SECRET_API}&append_to_response=videoshttps://api.themoviedb.org/3/movie/157336?api_key=${process.env.SECRET_API}&append_to_response=videos`);
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

app.use(notFound);
app.use(serError);

dbCli.connect().then(()=>{
  app.listen(PORT, startingLog);

function startingLog(req, res) {
  console.log("Running at 3000");
}
});