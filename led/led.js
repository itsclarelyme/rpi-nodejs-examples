var wpi = require('wiring-pi');
var express = require('express')
var localtunnel = require('localtunnel');


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
  res.sendStatus(200);
})

app.get('/turn_led_off', function (req, res) {
  turnLed(0);
  res.sendStatus(200);
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
// <-- END EXPRESS -->



// <-- BEGIN LOCALTUNNEL -->
var tunnel = localtunnel(
		3000, 
		{
			subdomain: "itsclarelymeled"
		},
		function(err, tunnel) {
    if (err) {
    	console.log("Tunnel error " + err);
    	return;
    }

    // the assigned public url for your tunnel
    // i.e. https://itsclarelymeled.localtunnel.me
    console.log(`Tunnel open in ${tunnel.url}`);
});

tunnel.on('close', function() {
    console.log("Tunnel closed");
});