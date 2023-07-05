const express = require("express");
const dbCli=require("../client");
const Router = express.Router();

Router.get('/',movieData);
Router.get("/favorite", endLog);


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

Router.get("/trending", async (req, res) => {
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

Router.get("/search", async (req, res) => {
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

module.exports = Router;
