var wpi = require('wiring-pi');
var express = require('express')



// GPIO pin of the led
var configPin = 7;
// Blinking interval in usec
var configTimeout = 1000;

wpi.setup('wpi');
wpi.pinMode(configPin, wpi.OUTPUT);

const turnLed = function(state) {
	wpi.digitalWrite(configPin, state);
}

/**
var isLedOn = 0;

setInterval(function() {
	isLedOn = +!isLedOn;
	//isLedOn = !isLedOn;
	
}, configTimeout);
*/

// <-- BEGIN EXPRESS -->
var app = express()

app.get('/turn_led_on', function (req, res) {
  turnLed(1);
})

app.get('/turn_led_off', function (req, res) {
  turnLed(0);
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})