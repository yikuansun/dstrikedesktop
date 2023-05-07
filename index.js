#!/usr/bin/env node

var express = require("express");
var socket = require("socket.io");
var { execSync } = require("child_process");
var getIP = require("./getIP");
const { mouse, left, right, up, down, keyboard, Key } = require("@nut-tree/nut-js");

console.log(getIP());

var app = express();
var server = app.listen(1999, "0.0.0.0", function(){
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
    inputdata: {"dpad":{"right":false,"up":false,"left":false,"down":false},"joystick1":{"x":0,"y":0},"joystick2":{"x":0,"y":0},"elementpad":{"black":false,"yellow":false,"red":false,"blue":false},"menubutton":false,"xbutton":false,"selectbutton":false},
};
io.on("connection", function(socket){
    console.log("made socket connection", socket.id);
    gpLink.connectionID = socket.id;

    socket.on("inputdata", function(inputdata){
        console.log("recieved input data", inputdata);
        gpLink.inputdata = inputdata;
    });

    var processInputs = async function() {
        var inputdata = gpLink.inputdata;
        if (inputdata.joystick2.x != 0 || inputdata.joystick2.y != 0) {
            await mouse.move(right(inputdata.joystick2.x * 100));
            await mouse.move(down(inputdata.joystick2.y * 100));
        }
        if (inputdata.dpad.left) await keyboard.pressKey(Key.Left);
        else await keyboard.releaseKey(Key.Left);
        if (inputdata.dpad.right) await keyboard.pressKey(Key.Right);
        else await keyboard.releaseKey(Key.Right);
        if (inputdata.dpad.up) await keyboard.pressKey(Key.Up);
        else await keyboard.releaseKey(Key.Up);
        if (inputdata.dpad.down) await keyboard.pressKey(Key.Down);
        else await keyboard.releaseKey(Key.Down);

        setTimeout(processInputs, 100); // requestAnimationFrame doesn't wokr
    };
    processInputs();
});