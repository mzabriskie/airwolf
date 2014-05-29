var Gamepad = {};

// Threshold for axes movement (neutral isn't always at 0.00)
var AXES_THRESHOLD = 0.10;

// Constants
Gamepad.buttons = {
    A: 0, // A Button
    B: 1, // B Button
    X: 2, // X Button
    Y: 3, // Y Button
    LB: 4, // Left Button
    RB: 5, // Right Button
    LT: 6, // Left Trigger
    RT: 7, // Right Trigger
    BACK: 8, // Back Button
    START: 9, // Start Button
    LJ: 10, // Left Joystick
    RJ: 11, // Right Joystick
    UP: 12, // Up Arrow
    DOWN: 13, // Down Arrow
    LEFT: 14, // Left Arrow
    RIGHT: 15 // Right Arrow
};

Gamepad.axes = {
    LJLR: 0, // Left Joystick Left to Right
    LJFB: 1, // Left Joystick Front to Back
    RJLR: 2, // Right Joystick Left to Right
    RJFB: 3 // Right Joystick Front to Back
};

// Compare axes greater than
function gt(n) {
    return n > AXES_THRESHOLD ? Math.abs(n) : 0;
}

// Compare axes less than
function lt(n) {
    return n < -AXES_THRESHOLD ? Math.abs(n) : 0;
}

// Check button press
Gamepad.checkButton = function checkButton(e, b) {
    return e.buttons[b].pressed === true;
};

// Right Joystick
Gamepad.getRightJoystickFrontSpeed = function getRightJoystickFrontSpeed(e) {
    return lt(e.axes[Gamepad.axes.RJFB]);
};

Gamepad.getRightJoystickBackSpeed = function getRightJoystickBackSpeed(e) {
    return gt(e.axes[Gamepad.axes.RJFB]);
};

Gamepad.getRightJoystickRightSpeed = function getRightJoystickRightSpeed(e) {
    return gt(e.axes[Gamepad.axes.RJLR]);
};

Gamepad.getRightJoystickLeftSpeed = function getRightJoystickLeftSpeed(e) {
    return lt(e.axes[Gamepad.axes.RJLR]);
};

// Left Joystick
Gamepad.getLeftJoystickFrontSpeed = function getLeftJoystickFrontSpeed(e) {
    return lt(e.axes[Gamepad.axes.LJFB]);
};

Gamepad.getLeftJoystickBackSpeed = function getLeftJoystickBackSpeed(e) {
    return gt(e.axes[Gamepad.axes.LJFB]);
};

Gamepad.getLeftJoystickRightSpeed = function getLeftJoystickRightSpeed(e) {
    return gt(e.axes[Gamepad.axes.LJLR]);
};

Gamepad.getLeftJoystickLeftSpeed = function getLeftJoystickLeftSpeed(e) {
    return lt(e.axes[Gamepad.axes.LJLR]);
};

module.exports = Gamepad;
