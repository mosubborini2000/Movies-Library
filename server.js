'use strict';
const express = require("express");
const app=express();
const cors = require('cors');
app.use(cors()); 
const pg=require("pg");
require("dotenv").config();
app.use(express.json());//parse the body from request
const axios = require('axios');



const arrData = require("./movieData/data.json");
const dbCli=new pg.Client('postgres://localhost:5432/allmovie');
dbCli.connect().then(()=>{
  app.listen(3000, startingLog);

function startingLog(req, res) {
  console.log("Running at 3000");
}

});



app.post('/addMovie',(req,res)=>{
  let title=req.body.title;
  let release_date=req.body.release_date;
  let poster_path=req.body.poster_path;
  let overview=req.body.overview;

  let sqlQr=`insert into movie (title ,release_date ,poster_path ,overview ) values($1,$2,$3,$4)`;
  dbCli.query(sqlQr,[title,release_date,poster_path,overview]).then(()=>{
    res.status(201).send(`movie ${title} added to database`);
  })

  
});

app.get("/getMovies",(req,res)=>{
  let sql=`select * from movie`;
  dbCli.query(sql).then((movieData)=>{
    res.status(200).send(movieData.rows);
});
});

app.delete("/DELETE/:id",async(req,res)=>{
  let {id}=req.params;
  let sql=`delete from movie where id= ${id}`;
  await dbCli.query(sql);
  res.status(200).send("deleted from database");


});
app.put("/UPDATE/:id",(req,res)=>{
  let {id}=req.params;
  let {title,release_date}=req.body;

  let sql=`update movie set title=$1 ,release_date=$2  where id= ${id}`;
  dbCli.query(sql,[title,release_date]).then((data)=>{

    res.status(200).send('updated');


  });

});
app.get("/getMovie/:id",(req,res)=>{
  let {id}=req.params;
  let sql=`select * from movie where id=${id} `;
  dbCli.query(sql).then((movieData)=>{
    res.status(200).send(movieData.rows);
});
});



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








