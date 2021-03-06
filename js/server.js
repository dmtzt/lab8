var express = require("express");
var path = require("path");

var app = express();
const PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const TOTAL_TABLES = 5;
var tables = TOTAL_TABLES;
var reservations = [];
var waitingList = [];
var idsReservations = [];
var idsWaitingList = [];

class Reservation {
    constructor(name, phoneNumber, email, id) {
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.id = id;
    }
}

app.listen(PORT, function() {
    console.log("Server up");
});

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../html/", "home.html"));
});

app.get("/home", function(req, res) {
    res.sendFile(path.join(__dirname, "../html/", "home.html"));
});

app.get("/reserve", function(req, res) {
    res.sendFile(path.join(__dirname, "../html/", "reserve.html"));
});

app.get("/tables", function(req, res) {
    res.sendFile(path.join(__dirname, "../html/", "tables.html"));
});

app.get("/api/tables", function(req, res) {
    return res.json(reservations);
});

app.get("/api/tables/available", function(req, res) {
    var available = {
        tables: tables
    }
    return res.json(available);
});

app.get("/api/waitlist", function(req, res) {
    return res.json(waitingList);
});

app.post("/reserve", function(req, res) {
    if (idsReservations.includes(req.body.id) || idsWaitingList.includes(req.body.id)) {
        var data = {result: "id-exists"};
        return res.json(data);
    }

    var reservation = {
        name: req.body.name,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
        id: req.body.id
    };

    if (tables == 0) {
        console.log("No tables available");
        waitingList.push(reservation);
        idsWaitingList.push(reservation.id);
        var data = {result: "wait"};
    } 
    else {
        console.log(`Tables available: ${tables}`);
        reservations.push(reservation);
        idsReservations.push(reservation.id);
        var data = {result: "table"};
        tables--;
    }

    return res.json(data);
});

app.post("/tables", function(req, res) {
    var action = req.body.action;

    if (action == "clear") {
        if (reservations.length == 0) {
            var data = {result: "empty"};
            return res.json(data);
        }

        reservations = [];
        idsReservations = [];
        tables = TOTAL_TABLES;

        while (tables > 0 && waitingList.length > 0) {
            var reservation = waitingList.shift();
            reservations.push(reservation);
            idsWaitingList.splice(idsWaitingList.indexOf(reservation.id), 1);
            idsReservations.push(reservation.id);
            tables--;
            console.log("Table deleted");
        }
 
        var data = {result: "ok"};
    }
    else
        var data = {result: "error"};

    return res.json(data);
});