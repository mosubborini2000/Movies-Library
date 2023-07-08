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
app.use(notFound);
app.use(serError);

dbCli.connect().then(()=>{
  app.listen(PORT, startingLog);

function startingLog(req, res) {
  console.log("Running at 3000");
}
});