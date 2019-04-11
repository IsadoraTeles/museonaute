
const PORT2 = process.env.PORT || 8000;

// IO
var socket;
var x = 100;
var y = 100;

function receiveOsc(address, value) 
{
	console.log("received OSC: " + address + ", " + value);
	
	if (address == '/test') {
		x = value[0];
		y = value[1];
	}
}

function sendOsc(address, value) 
{
	socket.emit('message', [address].concat(value));
}

function setupOsc(oscPortIn, oscPortOut) 
{
	var socket = io.connect('http://192.168.1.11:' + string(PORT), { port: PORT2, rememberTransport: false });
	socket.on('connect', function() {
		socket.emit('config', {	
			server: { port: oscPortIn,  host: '192.168.1.11'},
			client: { port: oscPortOut, host: '192.168.1.11'}
		});
	});
	socket.on('message', function(msg) {
		if (msg[0] == '#bundle') {
			for (var i=2; i<msg.length; i++) {
				receiveOsc(msg[i][0], msg[i].splice(1));
			}
		} else {
			receiveOsc(msg[0], msg.splice(1));
		}
	});
}

function setup() 
{
  createCanvas(720, 400);
  setupOsc(12000, 3334);
};
      

function draw() 
{
  fill(255,0,0);
  ellipse(x, y, 15, 15);
}



