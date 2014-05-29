var Gamepad = {};

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

// Input handlers
Gamepad.checkButton = function checkButton(e, b) {
    return e.buttons[b].pressed === true;
};

module.exports = Gamepad;
