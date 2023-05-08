var express = require("express");
var socket = require("socket.io");
var getIP = require("./getIP");
const { mouse, left, right, up, down, keyboard, Key } = require("@nut-tree/nut-js");

console.log(getIP());

class DServer {
    app;
    server;
    io;
    gpLink;

    constructor() {
        this.app = express();
        this.server = this.app.listen(1999, "0.0.0.0", function(){
            console.log("listening to requests on port 1999");
        });
        
        this.app.use(express.static("push"));
        
        this.io = socket(this.server, {
            allowEIO3: true,
        });
        
        keyboard.config.autoDelayMs = 10;
        mouse.config.autoDelayMs = 10;
        
        this.gpLink = {
            connectionID: "",
            inputdata: {"dpad":{"right":false,"up":false,"left":false,"down":false},"joystick1":{"x":0,"y":0},"joystick2":{"x":0,"y":0},"elementpad":{"black":false,"yellow":false,"red":false,"blue":false},"menubutton":false,"xbutton":false,"selectbutton":false},
        };
        this.io.on("connection", (socket) => {
            console.log("made socket connection", socket.id);
            this.gpLink.connectionID = socket.id;
        
            socket.on("inputdata", (inputdata) => {
                console.clear();
                console.log("recieved input data", inputdata);
                this.gpLink.inputdata = inputdata;
            });
        
            this.processInputs();
        });
    }

    async processInputs() {
        var inputdata = this.gpLink.inputdata;
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

        setTimeout(() => { this.processInputs(); }, 1000/60); // requestAnimationFrame doesn't wokr
    };
}

module.exports = DServer;