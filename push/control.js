var inputdata = {
    dpad: {
        right: false,
        up: false,
        left: false,
        down: false
    },
    joystick1: {
        x: 0,
        y: 0
    },
    joystick2: {
        x: 0,
        y: 0
    },
    elementpad: {
        black: false,
        yellow: false,
        red: false,
        blue: false
    },
    menubutton: false,
    xbutton: false,
    selectbutton: false
};

navigator.geolocation.getCurrentPosition(function(position) {
    var ably = new Ably.Realtime(API_KEY); // make a file called api_key.js with the contents const API_KEY = "whatever";
    var channel = ably.channels.get(position.coords.longitude.toFixed(2) + ";" + position.coords.latitude.toFixed(2));
    channel.publish("inputdata", inputdata);
    
    var cover = document.createElement("div");
    cover.style.backgroundColor = "black";
    cover.style.position = "fixed";
    cover.style.top = "0";
    cover.style.left = "0";
    cover.style.width = "100vw";
    cover.style.height = (100 * (window.innerHeight * 0.01)).toString() + "px";
    document.body.appendChild(cover);
    
    navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate;

    var dpad = new daize.displayCanvas((50 * (window.innerHeight * 0.01)), (50 * (window.innerHeight * 0.01)), "px");
    cover.appendChild(dpad);
    dpad.style.backgroundColor = "";
    dpad.style.position = "fixed";
    dpad.style.top = (6.9 * (window.innerHeight * 0.01)).toString() + "px";
    dpad.style.left = (6.9 * (window.innerHeight * 0.01)).toString() + "px";
    var upbutton = new daize.sprite((12.5 * (window.innerHeight * 0.01)), (25 * (window.innerHeight * 0.01)), (25 * (window.innerHeight * 0.01)), (12.5 * (window.innerHeight * 0.01)), 0, "px");
    upbutton.costume = "images/dpad/up.png";
    dpad.addsprite(upbutton);
    upbutton.addEventListener("touchstart", function(e) {
        e.preventDefault();
        inputdata.dpad.up = true;
        channel.publish("inputdata", inputdata);
        this.style.opacity = "0.5";
        navigator.vibrate(50);
    });
    upbutton.addEventListener("touchend", function() {
        inputdata.dpad.up = false;
        channel.publish("inputdata", inputdata);
        this.style.opacity = "1";
    });
    var leftbutton = new daize.sprite((12.5 * (window.innerHeight * 0.01)), (25 * (window.innerHeight * 0.01)), (12.5 * (window.innerHeight * 0.01)), (25 * (window.innerHeight * 0.01)), 3 * Math.PI / 2, "px");
    leftbutton.costume = "images/dpad/up.png";
    dpad.addsprite(leftbutton);
    leftbutton.addEventListener("touchstart", function(e) {
        e.preventDefault();
        inputdata.dpad.left = true;
        channel.publish("inputdata", inputdata);
        this.style.opacity = "0.5";
        navigator.vibrate(50);
    });
    leftbutton.addEventListener("touchend", function() {
        inputdata.dpad.left = false;
        channel.publish("inputdata", inputdata);
        this.style.opacity = "1";
    });
    var downbutton = new daize.sprite((12.5 * (window.innerHeight * 0.01)), (25 * (window.innerHeight * 0.01)), (25 * (window.innerHeight * 0.01)), (37.5 * (window.innerHeight * 0.01)), Math.PI, "px");
    downbutton.costume = "images/dpad/up.png";
    dpad.addsprite(downbutton);
    downbutton.addEventListener("touchstart", function(e) {
        e.preventDefault();
        inputdata.dpad.down = true;
        channel.publish("inputdata", inputdata);
        this.style.opacity = "0.5";
        navigator.vibrate(50);
    });
    downbutton.addEventListener("touchend", function() {
        inputdata.dpad.down = false;
        channel.publish("inputdata", inputdata);
        this.style.opacity = "1";
    });
    var rightbutton = new daize.sprite((12.5 * (window.innerHeight * 0.01)), (25 * (window.innerHeight * 0.01)), (37.5 * (window.innerHeight * 0.01)), (25 * (window.innerHeight * 0.01)), Math.PI / 2, "px");
    rightbutton.costume = "images/dpad/up.png";
    dpad.addsprite(rightbutton);
    rightbutton.addEventListener("touchstart", function(e) {
        e.preventDefault();
        inputdata.dpad.right = true;
        channel.publish("inputdata", inputdata);
        this.style.opacity = "0.5";
        navigator.vibrate(50);
    });
    rightbutton.addEventListener("touchend", function() {
        inputdata.dpad.right = false;
        channel.publish("inputdata", inputdata);
        this.style.opacity = "1";
    });

    var joystick1 = document.createElement("div");
    cover.appendChild(joystick1);
    joystick1.style.position = "fixed";
    joystick1.style.width = (40 * (window.innerHeight * 0.01)).toString() + "px";
    joystick1.style.height = (40 * (window.innerHeight * 0.01)).toString() + "px";
    joystick1.style.top = (50 * (window.innerHeight * 0.01)).toString() + "px";
    joystick1.style.left = (40 * (window.innerHeight * 0.01)).toString() + "px";
    joystick1.style.borderRadius = (25 * (window.innerHeight * 0.01)).toString() + "px";
    var draggable1 = document.createElement("div");
    draggable1.style.position = "absolute";
    draggable1clientrect = joystick1.getBoundingClientRect();
    draggable1.style.left = (draggable1clientrect.width / 2).toString() + "px";
    draggable1.style.top = (draggable1clientrect.height / 2).toString() + "px";
    draggable1.style.transform = "translate(-50%, -50%)";
    draggable1.style.backgroundImage = "url(images/radgrad.png)";
    draggable1.style.backgroundSize = "100% 100%";
    draggable1.style.width = (30 * (window.innerHeight * 0.01)).toString() + "px";
    draggable1.style.height = (30 * (window.innerHeight * 0.01)).toString() + "px";
    draggable1.style.borderRadius = (25 * (window.innerHeight * 0.01)).toString() + "px";
    joystick1.appendChild(draggable1);
    joystick1.style.border = (1 * (window.innerHeight * 0.01)).toString() + "px solid grey";
    var joy1initial = [0, 0];
    var joy1frame = 0;
    draggable1.addEventListener("touchstart", function(e) {
        e.preventDefault();
        for (touch of e.touches) {
            if (touch.target == this) {
                e = touch;
                break;
            }
        }
        joy1initial = [e.clientX, e.clientY];
        joy1frame = 0;
        navigator.vibrate(50);
    });
    draggable1.addEventListener("touchmove", function(e) {
        e.preventDefault();
        for (touch of e.touches) {
            if (touch.target == this) {
                e = touch;
                break;
            }
        }
        if (Math.sqrt(Math.pow((e.clientX - joy1initial[0]) / draggable1clientrect.width, 2) + Math.pow((e.clientY - joy1initial[1]) / draggable1clientrect.height, 2)) <= 0.35) {
            inputdata.joystick1.x = (e.clientX - joy1initial[0]) / draggable1clientrect.width;
            inputdata.joystick1.y = (e.clientY - joy1initial[1]) / draggable1clientrect.height;
            draggable1.style.left = (e.clientX - joy1initial[0] + draggable1clientrect.width / 2).toString() + "px";
            draggable1.style.top = (e.clientY - joy1initial[1] + draggable1clientrect.height / 2).toString() + "px";
        }
        else {
            var angle = Math.atan2((e.clientY - joy1initial[1]) / draggable1clientrect.height, (e.clientX - joy1initial[0]) / draggable1clientrect.width);
            inputdata.joystick1.x = 0.35 * Math.cos(angle);
            inputdata.joystick1.y = 0.35 * Math.sin(angle);
            draggable1.style.left = (draggable1clientrect.width / 2 + 0.35 * draggable1clientrect.width * Math.cos(angle)).toString() + "px";
            draggable1.style.top = (draggable1clientrect.height / 2 + 0.35 * draggable1clientrect.height * Math.sin(angle)).toString() + "px";
        }
        if (joy1frame % 10 == 0) channel.publish("inputdata", inputdata);
        joy1frame++;
    });
    draggable1.addEventListener("touchend", function() {
        draggable1.style.left = (draggable1clientrect.width / 2).toString() + "px";
        draggable1.style.top = (draggable1clientrect.height / 2).toString() + "px";
        inputdata.joystick1.x = 0;
        inputdata.joystick1.y = 0;
        channel.publish("inputdata", inputdata);
    });

    var joystick2 = document.createElement("div");
    cover.appendChild(joystick2);
    joystick2.style.position = "fixed";
    joystick2.style.width = (40 * (window.innerHeight * 0.01)).toString() + "px";
    joystick2.style.height = (40 * (window.innerHeight * 0.01)).toString() + "px";
    joystick2.style.top = (50 * (window.innerHeight * 0.01)).toString() + "px";
    joystick2.style.right = (40 * (window.innerHeight * 0.01)).toString() + "px";
    joystick2.style.borderRadius = (25 * (window.innerHeight * 0.01)).toString() + "px";
    var draggable2 = document.createElement("div");
    draggable2.style.position = "absolute";
    draggable2clientrect = joystick2.getBoundingClientRect();
    draggable2.style.left = (draggable2clientrect.width / 2).toString() + "px";
    draggable2.style.top = (draggable2clientrect.height / 2).toString() + "px";
    draggable2.style.transform = "translate(-50%, -50%)";
    draggable2.style.backgroundImage = "url(images/radgrad.png)";
    draggable2.style.backgroundSize = "100% 100%";
    draggable2.style.width = (30 * (window.innerHeight * 0.01)).toString() + "px";
    draggable2.style.height = (30 * (window.innerHeight * 0.01)).toString() + "px";
    draggable2.style.borderRadius = (15 * (window.innerHeight * 0.01)).toString() + "px";
    joystick2.appendChild(draggable2);
    joystick2.style.border = (1 * (window.innerHeight * 0.01)).toString() + "px solid grey";
    var joy2initial = [0, 0];
    var joy2frame = 0;
    draggable2.addEventListener("touchstart", function(e) {
        e.preventDefault();
        for (touch of e.touches) {
            if (touch.target == this) {
                e = touch;
                break;
            }
        }
        joy2initial = [e.clientX, e.clientY];
        joy2frame = 0;
        navigator.vibrate(50);
    });
    draggable2.addEventListener("touchmove", function(e) {
        e.preventDefault();
        for (touch of e.touches) {
            if (touch.target == this) {
                e = touch;
                break;
            }
        }
        if (Math.sqrt(Math.pow((e.clientX - joy2initial[0]) / draggable2clientrect.width, 2) + Math.pow((e.clientY - joy2initial[1]) / draggable2clientrect.height, 2)) <= 0.35) {
            inputdata.joystick2.x = (e.clientX - joy2initial[0]) / draggable2clientrect.width;
            inputdata.joystick2.y = (e.clientY - joy2initial[1]) / draggable2clientrect.height;
            draggable2.style.left = (e.clientX - joy2initial[0] + draggable2clientrect.width / 2).toString() + "px";
            draggable2.style.top = (e.clientY - joy2initial[1] + draggable2clientrect.height / 2).toString() + "px";
        }
        else {
            var angle = Math.atan2((e.clientY - joy2initial[1]) / draggable2clientrect.height, (e.clientX - joy2initial[0]) / draggable2clientrect.width);
            inputdata.joystick2.x = 0.35 * Math.cos(angle);
            inputdata.joystick2.y = 0.35 * Math.sin(angle);
            draggable2.style.left = (draggable2clientrect.width / 2 + 0.35 * draggable2clientrect.width * Math.cos(angle)).toString() + "px";
            draggable2.style.top = (draggable2clientrect.height / 2 + 0.35 * draggable2clientrect.height * Math.sin(angle)).toString() + "px";
        }
        if (joy2frame % 10 == 0) channel.publish("inputdata", inputdata);
        joy2frame++;
    });
    draggable2.addEventListener("touchend", function() {
        draggable2.style.left = (draggable2clientrect.width / 2).toString() + "px";
        draggable2.style.top = (draggable2clientrect.height / 2).toString() + "px";
        inputdata.joystick2.x = 0;
        inputdata.joystick2.y = 0;
        channel.publish("inputdata", inputdata);
    });
    
    var elementpad = new daize.displayCanvas((50 * (window.innerHeight * 0.01)), (50 * (window.innerHeight * 0.01)), "px");
    cover.appendChild(elementpad);
    elementpad.style.backgroundColor = "";
    elementpad.style.position = "fixed";
    elementpad.style.top = (6.9 * (window.innerHeight * 0.01)).toString() + "px";
    elementpad.style.right = (6.9 * (window.innerHeight * 0.01)).toString() + "px";
    var blackbutton = new daize.sprite((15 * (window.innerHeight * 0.01)), (15 * (window.innerHeight * 0.01)), (25 * (window.innerHeight * 0.01)), (10 * (window.innerHeight * 0.01)), 0, "px");
    blackbutton.costume = "images/elements/idk.png";
    elementpad.addsprite(blackbutton);
    blackbutton.addEventListener("touchstart", function(e) {
        inputdata.elementpad.black = true;
        channel.publish("inputdata", inputdata);
        this.style.opacity = "0.5";
        navigator.vibrate(50);
    });
    blackbutton.addEventListener("touchend", function() {
        inputdata.elementpad.black = false;
        channel.publish("inputdata", inputdata);
        this.style.opacity = "1";
    });
    var yellowbutton = new daize.sprite((15 * (window.innerHeight * 0.01)), (15 * (window.innerHeight * 0.01)), (10 * (window.innerHeight * 0.01)), (25 * (window.innerHeight * 0.01)), 0, "px");
    yellowbutton.costume = "images/elements/sun.png";
    elementpad.addsprite(yellowbutton);
    yellowbutton.addEventListener("touchstart", function(e) {
        e.preventDefault();
        inputdata.elementpad.yellow = true;
        channel.publish("inputdata", inputdata);
        this.style.opacity = "0.5";
        navigator.vibrate(50);
    });
    yellowbutton.addEventListener("touchend", function() {
        inputdata.elementpad.yellow = false;
        channel.publish("inputdata", inputdata);
        this.style.opacity = "1";
    });
    var bluebutton = new daize.sprite((15 * (window.innerHeight * 0.01)), (15 * (window.innerHeight * 0.01)), (25 * (window.innerHeight * 0.01)), (40 * (window.innerHeight * 0.01)), 0, "px");
    bluebutton.costume = "images/elements/water.png";
    elementpad.addsprite(bluebutton);
    bluebutton.addEventListener("touchstart", function(e) {
        e.preventDefault();
        inputdata.elementpad.blue = true;
        channel.publish("inputdata", inputdata);
        this.style.opacity = "0.5";
        navigator.vibrate(50);
    });
    bluebutton.addEventListener("touchend", function() {
        inputdata.elementpad.blue = false;
        channel.publish("inputdata", inputdata);
        this.style.opacity = "1";
    });
    var redbutton = new daize.sprite((15 * (window.innerHeight * 0.01)), (15 * (window.innerHeight * 0.01)), (40 * (window.innerHeight * 0.01)), (25 * (window.innerHeight * 0.01)), 0, "px");
    redbutton.costume = "images/elements/fire.png";
    elementpad.addsprite(redbutton);
    redbutton.addEventListener("touchstart", function(e) {
        e.preventDefault();
        inputdata.elementpad.red = true;
        channel.publish("inputdata", inputdata);
        this.style.opacity = "0.5";
        navigator.vibrate(50);
    });
    redbutton.addEventListener("touchend", function() {
        inputdata.elementpad.red = false;
        channel.publish("inputdata", inputdata);
        this.style.opacity = "1";
    });

    var menubutton = document.createElement("div");
    menubutton.style.width = (10 * (window.innerHeight * 0.01)).toString() + "px";
    menubutton.style.height = (10 * (window.innerHeight * 0.01)).toString() + "px";
    menubutton.style.position = "absolute";
    menubutton.style.transform = "translate(-50%, -50%)";
    menubutton.style.top = (15 * (window.innerHeight * 0.01)).toString() + "px";
    menubutton.style.left = "40vw";
    menubutton.style.backgroundImage = "url(images/menu.png)";
    menubutton.style.backgroundSize = "100% 100%";
    cover.appendChild(menubutton);
    menubutton.addEventListener("touchstart", function(e) {
        e.preventDefault();
        inputdata.menubutton = true;
        channel.publish("inputdata", inputdata);
        this.style.opacity = "0.5";
        navigator.vibrate(50);
    });
    menubutton.addEventListener("touchend", function() {
        inputdata.menubutton = false;
        channel.publish("inputdata", inputdata);
        this.style.opacity = "1";
    });

    var xbutton = document.createElement("div");
    xbutton.style.width = (10 * (window.innerHeight * 0.01)).toString() + "px";
    xbutton.style.height = (10 * (window.innerHeight * 0.01)).toString() + "px";
    xbutton.style.position = "absolute";
    xbutton.style.transform = "translate(-50%, -50%)";
    xbutton.style.top = (15 * (window.innerHeight * 0.01)).toString() + "px";
    xbutton.style.left = "60vw";
    xbutton.style.backgroundImage = "url(images/x.png)";
    xbutton.style.backgroundSize = "100% 100%";
    cover.appendChild(xbutton);
    xbutton.addEventListener("touchstart", function(e) {
        e.preventDefault();
        inputdata.xbutton = true;
        channel.publish("inputdata", inputdata);
        this.style.opacity = "0.5";
        navigator.vibrate(50);
    });
    xbutton.addEventListener("touchend", function() {
        inputdata.xbutton = false;
        channel.publish("inputdata", inputdata);
        this.style.opacity = "1";
    });

    var selectbutton = document.createElement("div");
    selectbutton.style.width = (20 * (window.innerHeight * 0.01)).toString() + "px";
    selectbutton.style.height = (5 * (window.innerHeight * 0.01)).toString() + "px";
    selectbutton.style.position = "absolute";
    selectbutton.style.transform = "translate(-50%, -50%)";
    selectbutton.style.top = (30 * (window.innerHeight * 0.01)).toString() + "px";
    selectbutton.style.left = "50vw";
    selectbutton.style.backgroundImage = "url(images/select.png)";
    selectbutton.style.backgroundSize = "100% 100%";
    cover.appendChild(selectbutton);
    selectbutton.addEventListener("touchstart", function(e) {
        e.preventDefault();
        inputdata.selectbutton = true;
        channel.publish("inputdata", inputdata);
        this.style.opacity = "0.5";
        navigator.vibrate(50);
    });
    selectbutton.addEventListener("touchend", function() {
        inputdata.selectbutton = false;
        channel.publish("inputdata", inputdata);
        this.style.opacity = "1";
    });
    
    var logo = document.createElement("div");
    logo.style.width = (15 * (window.innerHeight * 0.01)).toString() + "px";
    logo.style.height = (15 * (window.innerHeight * 0.01)).toString() + "px";
    logo.style.position = "absolute";
    logo.style.transform = "translate(-50%, -50%)";
    logo.style.top = (15 * (window.innerHeight * 0.01)).toString() + "px";
    logo.style.left = "50vw";
    logo.style.backgroundImage = "url(images/controllerlogo.png)";
    logo.style.backgroundSize = "100% 100%";
    cover.appendChild(logo);
});

// Redraw elements if phone rotated
window.addEventListener("orientationchange", function(e) {
    location.reload();
});