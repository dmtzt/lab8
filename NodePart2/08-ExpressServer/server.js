var express = require("express");

var app = express();
var PORT = 3000;

app.get("/", function(req,res){
    res.send("Get Request");
})

app.post("/about", function(req,res){  
    res.send("Post request recibido");
})

app.put("/contact", function(req,res){
    res.send("Put Request");
})

app.delete("/delete", function(req,res){
    res.send("Delete request");
})



app.listen(PORT,function(){
    console.log("Server up");
})