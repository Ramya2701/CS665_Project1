const express = require("express");
const exphbs=require("express-handlebars");
const bodyParser=require("body-parser");
const mysql=require("mysql");
 
require('dotenv').config();
 
const app=express();
const port=8000;
 
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
 
 
//Static Files
app.use(express.static("public"));
 
//Template Engine
const handlebars =exphbs.create({extname:".hbs"});
app.engine('hbs',handlebars.engine);
app.set("view engine","hbs");
  
const routes=require("./server/routes/warehouse");
app.use('/',routes);
 
//Listen Port
app.listen(port,()=>{
console.log("Listening Port : "+port);
});
 