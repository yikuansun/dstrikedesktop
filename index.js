#!/usr/bin/env node

var DServer = require("./DServer");
const ip = require("ip");

console.log(ip.address());
new DServer();