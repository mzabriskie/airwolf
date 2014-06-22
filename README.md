# airwolf

Control AR.Drone 2.0 with Gamepad from your browser

## Installing

Clone repository and install Node dependencies:

```bash
git clone https://github.com/mzabriskie/airwolf.git
cd airwolf && npm install
```

## Running

Connect Gamepad to your computer (be sure mode is set to `D` on back).

Start the server:

```bash
npm start
```

Open [http://127.0.0.1:3000](http://127.0.0.1:3000) in your browser.

Connect to your AR Drone Wi-Fi.

## Testing

Run the tests using NPM:

```bash
npm test
```

## Controls

**Takeoff** - A

**Land** - B

**Forward/Backward** - Right Joystick (Forward/Backward respectively)

**Strafe** - Right Joystic (Left/Right respectively)

**Up/Down** - Left Joystic (Forward/Backward respectively)

**Rotate** - Left Joystic (Left counter-clockwise, Right clockwise)

**Flip Left** - Left Trigger

**Flip Right** - Right Trigger

## License

MIT