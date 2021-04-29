var http = require("http");

var PORT = 3000;

var server = http.createServer(handleRequest);

function handleRequest(req,res){
    res.end("Bienvenido desde" + req.url);
}

server.listen(PORT,() => {

    console.log("Server listening on port : " + PORT);

})