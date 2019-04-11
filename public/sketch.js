

// IO
var socket;


function setup() 
{
  createCanvas(720, 400);

  // IO
  socket = io.connect('http://localhost:3000');
  socket.on('mouse', newDrawing);
};
      
function newDrawing(data)
{
  fill(0,255,0);
  ellipse(data.x, data.y, 20, 20);
}

function draw() 
{
  //background(200);
  
}

// Start it up
function mouseDragged() 
{
  fill(255,0,0);
  ellipse(mouseX, mouseY, 5, 5);
  var data = 
  {
    x : mouseX,
    y : mouseY
  }
  socket.emit('mouse', data); // name and data
  console.log('Sending : '+ mouseX + ',' + mouseY);
  return false;
}

