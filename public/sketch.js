var serial; // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodem1411'; // fill in your serial port name here
var inData;
//var outByte = 0; // for incoming serial data                      // for outgoing data
var potentiometer;
// var mapped;
// var inString;
// var pushbutton = 1;
// var mapped = map(potentiometer, 0, 255, 0, 360);

function setup() {
  noCanvas(); // make the canvas
  serial = new p5.SerialPort(); // make a new instance of the serialport library
  serial.on('data', serialEvent); // callback for when new data arrives
  serial.on('error', serialError); // callback for errors
  serial.on('open', gotOpen);
  serial.open(portName); // open a serial port
}

// Connected to our serial device
function gotOpen() {
  print("Serial Port is open!");
  serial.write(0);
}

function serialEvent() {
  // // read a byte from the serial port:
  // var inByte = serial.read();
  // // store it in a global variable:
  // inData = inByte;
  let inString = serial.readLine()
  // print(inString);

  if (inString.length > 0) {
    var d = split(inString, ',');
    potentiometer = Number(d[0]);
    var mapped = map(potentiometer, 0, 1023, 0, 255);
    var integer = nfc(mapped,0,0);
    threeSerialData(integer);
    //document.dispatchEvent(new CustomEvent("serialData", { v: mapped }));
    // pushbutton = Number(d[1]);
    
  }
  
  serial.write(0);
}

function serialError(err) {
  print('Something went wrong with the serial port. ' + err);
}

function draw() {}