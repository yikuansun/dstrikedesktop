#!/usr/bin/env node

var DServer = require("./DServer");
const ip = require("ip");

var ipAddress = ip.address();
new DServer();

console.log("To use gamepad: open",
    "http://" + ipAddress + ":1999",
    "on your mobile device");