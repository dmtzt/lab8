var http = require("http");

var PORT = 3000;

var server = http.createServer(handleRequest);

server.listen(PORT,function() {
    console.log("Server up");
})

function handleRequest(req,res) {

var path = req.url;

switch (path) {

case "/": return  displayPage(res);

case "/portfolio": return displayPortfolio(res);

default:return NotFound(res);

}

function displayPage(res) {

    var myHTML = "<html>" +
    "<body><h1>Home Page</h1>" +
    "<a href='/portfolio'>Go To Portfolio</a>" +
    "</body></html>";

res.writeHead(200, {"Content-Type" : "text/html"});

res.end(myHTML);

}

function displayPortfolio(res) {
    
    var myHTML = "<html>" +
    "<body><h1>My Portfolio</h1>" +
    "<a href='/'>Go Home</a>" +
    "</body></html>";

res.writeHead(200, {"Content-Type" : "text/html"});

res.end(myHTML);

}


function NotFound(res) {
    
    var myHTML = "<html>" +
    "<body><h1>404 Not Found</h1>" +
    "<p> The page can not be found: "  +
    "</body></html>";

res.writeHead(404, {"Content-Type" : "text/html"});

res.end(myHTML);

}

}