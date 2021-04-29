var http = require("http");
var fs = require("fs");

var PORT = 3000

var server = http.createServer(handleRequest);

function handleRequest(req,res) {

    fs.readFile("index.html" , function(err,data){
   // res.writeHead(200, {"Content-Type": "text/html"});

    res.end(data)

    })
}

server.listen(PORT,function(){
    console.log("Server up");
})