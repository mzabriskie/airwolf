var http = require('http'),
    fs = require('fs'),
    path = require('path'),
    starfox = require('starfox'),
    drone = require('ar-drone'),
    gamepad = require('./lib/gamepad'),
    server, client;

// Create the client and the server
client = drone.createClient();
server = http.createServer(function (req, res) {
    var stream = fs.createReadStream(path.join(__dirname, 'index.html'));
    stream.pipe(res);
});

// Handle gamepad
starfox.on('connection', function (player) {
    console.log('Connected to Gamepad');
    player.on('input', function (event) {
        // Cancel previous command
        client.stop();

        // Lift/land
        if (gamepad.checkButton(event, gamepad.buttons.A)) {
            client.takeoff();
        } else if (gamepad.checkButton(event, gamepad.buttons.B)) {
            client.land();
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

// Mount gamepad input and start server
starfox.mount(server);
server.listen(3000);
