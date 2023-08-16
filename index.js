#!/usr/bin/env node

var DServer = require("./DServer");
const ip = require("ip");
const qrcode = require("qrcode-terminal");

var ipAddress = ip.address();
new DServer();

var gamepadURL = "http://" + ipAddress + ":1999/control.html";
console.log("To use gamepad: open", gamepadURL, "on your mobile device");
console.log("or scan:");
qrcode.generate(gamepadURL);