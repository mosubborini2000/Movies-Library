'use strict';
const express = require("express");
const Router = express.Router();
const data = require("../movieData/data.json");

Router.get("/" , handleHome);
Router.get("/favorite" , handleFavorite);

function handleHome(req , res , next){
 try {
  const dataJson = {
    "title" : data.title,
    "poster_path" : data.poster_path,
    "overview" : data.overview};
    res.send(dataJson);
 } catch (e) {
  next(`handleHome Error : ${e}`);
 }
    }

function handleFavorite(req ,res , next){
    try {
      res.send("Welcome to Favorite Page");
    } catch (e) {
      next(`handleFavorite Error : ${e}`);
    }
}

module.exports = Router;

// Router.get("/trending", async (req, res) => {
//   const axiosResponse = await axios.get(`https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.SECRET_API}&language=en-US`);
//   const myData = axiosResponse.data.results.map((result) => ({
//     "id": result.id,
//     "title": result.title,
//     "release_date": result.release_date,
//     "poster_path": result.poster_path,
//     "overview": result.overview
//   })); ;
// res.send(myData);
// });

// Router.get("/search", async (req, res) => {
//   let mName = req.query.query; 
//  let axiosResponse = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.SECRET_API}&language=en-US&query=${mName}&page=2`);
//   const receveData = axiosResponse.data.results;
//   const movies = receveData.map((result) => ({
//     "id": result.id,
//     "title": result.title,
//     "release_date": result.release_date,
//     "poster_path": result.poster_path,
//     "overview": result.overview
//   }));
//   res.send(movies);
// });

// module.exports = Router;
