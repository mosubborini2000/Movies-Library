const pg=require("pg");
const {DB_URL} = require("./configs");

const dbCli = new pg.Client(DB_URL);
module.exports=dbCli;