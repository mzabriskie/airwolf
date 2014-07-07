var http = require('http'),
    fs = require('fs'),
    path = require('path'),
    starfox = require('starfox'),
    drone = require('ar-drone'),
    stream = require('dronestream'),
    status = require('dronestatus'),
    gamepad = require('./lib/gamepad'),
    server, client;

// Create the client and the server
client = drone.createClient();
server = http.createServer(function (req, res) {
    fs.createReadStream(path.join(__dirname, 'index.html')).pipe(res);
});

// Serve static files
var listeners = server.listeners('request').slice(0);
server.removeAllListeners('request');
server.on('request', function (req, res) {
	var file = null;

    if (req.url.indexOf('/airwolf.js') === 0) {
        res.setHeader('Content-Type', 'application/javascript');
        file = path.join(__dirname, '/public/js/airwolf.js');
    }
	else if (req.url.indexOf('/airwolf.css') === 0) {
        res.setHeader('Content-Type', 'text/css');
        file = path.join(__dirname, '/public/css/style.css');
    }
	else if (req.url.indexOf('/audio/') === 0) {
		file = path.join(__dirname, '/public', req.url);
	}

	if (file !== null) {
		fs.exists(file, function (exists) {
			if (!exists) {
				res.writeHead(404);
				res.write('<h1>404 Not Found</h1>');
				res.end();
			} else {
				fs.createReadStream(file).pipe(res);
			}
		});
	}
	else {
        for (var i=0, l=listeners.length; i<l; i++) {
            listeners[i].call(server, req, res);
        }
    }
});

// Handle status change
var battery = null;
status.on('change', function (data) {
    // Battery state
    if (data && data.demo && data.demo.batteryPercentage) {
        var b = data.demo.batteryPercentage;
        if (battery == null || (battery !== b && (b % 10 === 0 || b % 10 === 5))) {
            battery = b;
            var warning = (battery <= 20 ? '\033[0;31mWarning:\033[0m ' : '');
            console.log(warning + 'Battery at ' + battery + '%');
        }
    }
});

// Handle gamepad
starfox.on('connection', function (player) {
    console.log('Connected to Gamepad');
    player.on('input', function (event) {
        // Cancel previous command
        client.stop();

        // Lift/land
        if (gamepad.checkButton(event, gamepad.buttons.A)) {
            client.animateLeds('blinkGreen', 2, 3);
            client.takeoff();
        } else if (gamepad.checkButton(event, gamepad.buttons.B)) {
            client.animateLeds('blinkRed', 2, 3);
            client.land();
        }

        // Turnaround (about face)
        if (gamepad.checkButton(event, gamepad.buttons.Y)) {
            client.animate('turnaround', 50);
        }

        // Flip left/right
        if (gamepad.checkButton(event, gamepad.buttons.LT)) {
            client.animate('flipLeft', 15);
        } else if (gamepad.checkButton(event, gamepad.buttons.RT)) {
            client.animate('flipRight', 15);
        }

        // Forward/backward
        var front = gamepad.getRightJoystickFrontSpeed(event),
            back = gamepad.getRightJoystickBackSpeed(event);

        if (front > 0) {
            client.front(front);
        } else if (back > 0) {
            client.back(back);
        }

        // Up/down
        var up = gamepad.getLeftJoystickFrontSpeed(event),
            down = gamepad.getLeftJoystickBackSpeed(event);

        if (up > 0) {
            client.up(up);
        } else if (down > 0) {
            client.down(down);
        }

        // Rotate clockwise/counter-clockwise
        var clock = gamepad.getLeftJoystickRightSpeed(event),
            counter = gamepad.getLeftJoystickLeftSpeed(event);

        if (clock > 0) {
            client.clockwise(clock);
        } else if (counter > 0) {
            client.counterClockwise(counter);
        }

        // Strafe left/right
        var left = gamepad.getRightJoystickLeftSpeed(event),
            right = gamepad.getRightJoystickRightSpeed(event);

        if (left > 0) {
            client.left(left);
        } else if(right > 0) {
            client.right(right);
        }
    });
});

// Mount server
starfox.mount(server);
stream.listen(server, { tcpVideoStream: client.getVideoStream() });
status.listen(server, { udpControl: client._udpControl, udpNavdataStream: client._udpNavdatasStream });
server.listen(3000);
