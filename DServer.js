var express = require("express");
var socket = require("socket.io");
const { mouse, left, right, up, down, keyboard, Key, Button } = require("@nut-tree/nut-js");

class DServer {
    app;
    server;
    io;
    gpLink;
    keyBinding = {
        selectbutton: Button.LEFT,
        dpad: {
            left: Key.Left,
            right: Key.Right,
            up: Key.Up,
            down: Key.Down,
        },
        elementpad: {
            blue: Key.X,
            red: Key.Z,
            black: Key.F,
            yellow: Key.C,
        },
    };

    constructor() {
        this.app = express();
        this.server = this.app.listen(1999, "0.0.0.0", function(){
            console.log("listening to requests on port 1999");
        });
        
        this.app.use(express.static(__dirname + "/push"));
        
        this.io = socket(this.server, {
            allowEIO3: true,
        });
        
        keyboard.config.autoDelayMs = 1;
        mouse.config.autoDelayMs = 1;
        
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
        if (inputdata.selectbutton) await mouse.pressButton(this.keyBinding.selectbutton);
        else await mouse.releaseButton(this.keyBinding.selectbutton);
        if (inputdata.dpad.left) await keyboard.pressKey(this.keyBinding.dpad.left);
        else await keyboard.releaseKey(this.keyBinding.dpad.left);
        if (inputdata.dpad.right) await keyboard.pressKey(this.keyBinding.dpad.right);
        else await keyboard.releaseKey(this.keyBinding.dpad.right);
        if (inputdata.dpad.up) await keyboard.pressKey(this.keyBinding.dpad.up);
        else await keyboard.releaseKey(this.keyBinding.dpad.up);
        if (inputdata.dpad.down) await keyboard.pressKey(this.keyBinding.dpad.down);
        else await keyboard.releaseKey(this.keyBinding.dpad.down);
        if (inputdata.elementpad.blue) await keyboard.pressKey(this.keyBinding.elementpad.blue);
        else await keyboard.releaseKey(this.keyBinding.elementpad.blue);
        if (inputdata.elementpad.red) await keyboard.pressKey(this.keyBinding.elementpad.red);
        else await keyboard.releaseKey(this.keyBinding.elementpad.red);
        if (inputdata.elementpad.black) await keyboard.pressKey(this.keyBinding.elementpad.black);
        else await keyboard.releaseKey(this.keyBinding.elementpad.black);
        if (inputdata.elementpad.yellow) await keyboard.pressKey(this.keyBinding.elementpad.yellow);
        else await keyboard.releaseKey(this.keyBinding.elementpad.yellow);

        setTimeout(() => { this.processInputs(); }, 1000/60); // requestAnimationFrame doesn't wokr
    };
}

module.exports = DServer;