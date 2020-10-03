var startscreen;
var song;

function preload() {
  song = loadSound('sounds/background/diekaplyn.mp3');
}

function preload() {
  startscreen = loadImage("images/backgrounds/ZuidAfrika1png.png");
}

function setup() {
  canvas = createCanvas(1920,1080);
  canvas.parent('processing');
  song.play();

  }

  function draw() {
  background(startscreen); 
  }