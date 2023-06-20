'use strict';
const express = require("express");
const app=express();
const cors = require('cors');
app.use(cors()); 

app.listen(3000, startingLog);

function startingLog(req, res) {
  console.log("Running at 3000");
}

const arrData = require("./movieData/data.json");


app.get('/',movieData);
function movieData(req,res) {
    let newArr=[];
    for (let i = 0; i < arrData.length; i++) {
         newArr.push(arrData[i].title,arrData[i].poster_path,arrData[i].overview);
        
    }
    res.send(newArr);
    
}

app.get("/favorite", endLog);

function endLog(req, res) {
  res.send("Welcome to Favorite Page");
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


  app.use(handleNotFound);

  function handleNotFound(req, res) {
    res.status(404).send(
    {
      status: 404,
      responseText: "Page not found"
    }
            );
  }