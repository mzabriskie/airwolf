var http = require('http'),
    fs = require('fs'),
    path = require('path'),
    starfox = require('starfox'),
    drone = require('ar-drone'),
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
        /*
            buttons [
                a, b, x, y
            ]

            axes [ljlr, ljfb, rjlr, rjfb]
            Full left: -1
            Full right: 1
            Full forward: -1
            Full backward: 1
         */
    });
});

// Mount gamepad input and start server
starfox.mount(server);
server.listen(3000);
