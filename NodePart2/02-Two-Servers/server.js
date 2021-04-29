var http = require("http");

var PORTONE = 7000;
var PORTTWO = 7500;

var serverOne = http.createServer(handleRequestOne);
var serverTwo = http.createServer(handleRequestTwo);

function handleRequestOne(req,res){
    res.end("Server en puerto " + PORTONE);
}

function handleRequestTwo(req,res){
    res.end("Server en puerto " + PORTTWO);
}

serverOne.listen(PORTONE,() => {
    console.log("Server listening on port : " + PORTONE);
})

serverTwo.listen(PORTTWO,() => {
    console.log("Server listening on port : " + PORTTWO);
})