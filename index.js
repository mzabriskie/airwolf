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
    var testFile = fs.createReadStream(path.join(__dirname, 'index.html'));
    testFile.pipe(res);
});

// Handle gamepad
starfox.on('connection', function (player) {
    console.log('Connected to Gamepad');
    player.on('input', function (event) {
        // Lift and land
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
        client.front(gamepad.getRightJoystickFrontSpeed(event));
        client.back(gamepad.getRightJoystickBackSpeed(event));

        // Up/down
        client.up(gamepad.getLeftJoystickFrontSpeed(event));
        client.down(gamepad.getLeftJoystickBackSpeed(event));

        // Rotate clockwise/counter-clockwise
        client.clockwise(gamepad.getRightJoystickRightSpeed(event));
        client.counterClockwise(gamepad.getRightJoystickLeftSpeed(event));

        // Strafe left/right
        client.left(gamepad.getLeftJoystickLeftSpeed(event));
        client.right(gamepad.getLeftJoystickRightSpeed(event));
    });
});

// Mount gamepad input and start server
starfox.mount(server);
server.listen(3000);
