var startscreen;

function preload() {
  song = loadSound('sounds/background/diekaplyn.mp3');
}

function preload() {
  startscreen = loadImage("images/backgrounds/ZuidAfrika1png.png");
}

function setup() {
  canvas = createCanvas(1920,1080);
  canvas.parent('processing');
  }

  function draw() {
  background(startscreen); 
  }
  
  