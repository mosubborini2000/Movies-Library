const express = require("express");
const dbCli=require("../client");
const Router = express.Router();

Router.post('/addMovie',(req,res)=>{
    let title=req.body.title;
    let release_date=req.body.release_date;
    let poster_path=req.body.poster_path;
    let overview=req.body.overview;
    let comment=req.body.comment;

    
  
    let sqlQr=`insert into movie (title ,release_date ,poster_path ,overview,comment ) values($1,$2,$3,$4,$5)`;
    dbCli.query(sqlQr,[title,release_date,poster_path,overview,comment]).then(()=>{
      res.status(201).send(`movie ${title} added to database`);
    })
  
    
  });
  
  Router.get("/getMovies",(req,res)=>{
    let sql=`select * from movie`;
    dbCli.query(sql).then((movieData)=>{
      res.status(200).send(movieData.rows);
  });
  });
  
  Router.delete("/DELETE/:id",async(req,res)=>{
    let {id}=req.params;
    let sql=`delete from movie where id= ${id}`;
    await dbCli.query(sql);
    res.status(200).send("deleted from database");
  
  
  });
  Router.put("/UPDATE/:id",(req,res)=>{
    let {id}=req.params;
    let {title,release_date}=req.body;
  
    let sql=`update movie set title=$1 ,release_date=$2  where id= ${id}`;
    dbCli.query(sql,[title,release_date]).then((data)=>{
  
      res.status(200).send('updated');
  
  
    });
  
  });
  Router.get("/getMovie/:id",(req,res)=>{
    let {id}=req.params;
    let sql=`select * from movie where id=${id} `;
    dbCli.query(sql).then((movieData)=>{
      res.status(200).send(movieData.rows);
  });
  });

  module.exports = Router;
