var express = require("express");
var socket = require("socket.io");

var app = express();
var server = app.listen(1999, function(){
    console.log("listening to requests on port 1999");
});

app.use(express.static("push"));

var io = socket(server, {
    allowEIO3: true,
});

var gpLink = {
    connectionID: "",
};
io.on("connection", function(socket){
    console.log("made socket connection", socket.id);
    gpLink.connectionID = socket.id;

    socket.on("inputdata", function(inputdata){
        console.log("recieved input data", inputdata);
    });
});