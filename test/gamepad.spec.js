var gamepad = require('../lib/gamepad');

function mockEvent(opts) {
    opts = opts || {};

    var i,
        e = {
        buttons: [],
        axes: []
    };

    for (i=0; i<16; i++) {
        var value = opts.buttons && opts.buttons.code === i ? 1 : 0,
            pressed = value === 1;

        e.buttons[i] = {value: value, pressed: pressed};
    }

    for (i=0; i<5; i++) {
        e.axes[i] = opts.axes ? opts.axes[i] : 0;
    }

    return e;
}

module.exports = {
    testCheckButton: function (test) {
        test.ok(gamepad.checkButton(mockEvent({buttons:{code:gamepad.buttons.A}}), gamepad.buttons.A));
        test.ok(!gamepad.checkButton(mockEvent({buttons:{code:gamepad.buttons.A}}), gamepad.buttons.B));
        test.done();
    },

    testGetRightJoystickFrontSpeed: function (test) {
        test.ok(gamepad.getRightJoystickFrontSpeed(mockEvent({axes:[1, 1, 1, 0]})) === 0);
        test.ok(gamepad.getRightJoystickFrontSpeed(mockEvent({axes:[0, 0, 0, -.5]})) > 0);
        test.done();
    },

    testGetRightJoystickBackSpeed: function (test) {
        test.ok(gamepad.getRightJoystickBackSpeed(mockEvent({axes:[1, 1, 1, 0]})) === 0);
        test.ok(gamepad.getRightJoystickBackSpeed(mockEvent({axes:[0, 0, 0, .5]})) > 0);
        test.done();
    },

    testGetRightJoystickRightSpeed: function (test) {
        test.ok(gamepad.getRightJoystickRightSpeed(mockEvent({axes:[1, 1, 0, 1]})) === 0);
        test.ok(gamepad.getRightJoystickRightSpeed(mockEvent({axes:[0, 0, .5, 0]})) > 0);
        test.done();
    },

    testGetRightJoystickLeftSpeed: function (test) {
        test.ok(gamepad.getRightJoystickLeftSpeed(mockEvent({axes:[1, 1, 0, 1]})) === 0);
        test.ok(gamepad.getRightJoystickLeftSpeed(mockEvent({axes:[0, 0, -.5, 0]})) > 0);
        test.done();
    },

    testGetLeftJoystickFrontSpeed: function (test) {
        test.ok(gamepad.getLeftJoystickFrontSpeed(mockEvent({axes:[1, 0, 1, 1]})) === 0);
        test.ok(gamepad.getLeftJoystickFrontSpeed(mockEvent({axes:[0, -.5, 0, 0]})) > 0);
        test.done();
    },

    testGetLeftJoystickBackSpeed: function (test) {
        test.ok(gamepad.getLeftJoystickBackSpeed(mockEvent({axes:[1, 0, 1, 1]})) === 0);
        test.ok(gamepad.getLeftJoystickBackSpeed(mockEvent({axes:[0, .5, 0, 0]})) > 0);
        test.done();
    },

    testGetLeftJoystickRightSpeed: function (test) {
        test.ok(gamepad.getLeftJoystickRightSpeed(mockEvent({axes:[0, 1, 1, 1]})) === 0);
        test.ok(gamepad.getLeftJoystickRightSpeed(mockEvent({axes:[.5, 0, 0, 0]})) > 0);
        test.done();
    },

    testGetLeftJoystickLeftSpeed: function (test) {
        test.ok(gamepad.getLeftJoystickLeftSpeed(mockEvent({axes:[0, 1, 1, 1]})) === 0);
        test.ok(gamepad.getLeftJoystickLeftSpeed(mockEvent({axes:[-.5, 0, 0, 0]})) > 0);
        test.done();
    }
};
