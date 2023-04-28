#!/usr/bin/env node

var express = require("express");
var socket = require("socket.io");
var { execSync } = require("child_process");

var app = express();
var server = app.listen(1999, function(){
    console.log("listening to requests on port 1999");
    var startCommand = {
        darwin: "open",
        win32: "start",
        linux: "xdg-open",
    }[process.platform];
    execSync(`${startCommand} http://localhost:1999/setup.html`);
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