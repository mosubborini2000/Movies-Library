const pg=require("pg");
const dbCli=new pg.Client('postgres://localhost:5432/allmovie');
module.exports=dbCli;