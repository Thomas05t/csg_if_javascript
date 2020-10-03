var startscreen;
var song;
var slider; 

laadJavascriptFile('JS/P5/addons/p5.sound.js');

function preload() {
song = loadSound('sounds/background/diekaplyn.mp3');
startscreen = loadImage("images/backgrounds/ZuidAfrika1png.png");
}

function setup() {
canvas = createCanvas(1920,1080);
canvas.parent('processing');
song.play();
slider = createSlider(0, 1, 0.5, 0.1);
}

function draw() {
background(startscreen); 
song.setVolume(slider.value()); 
}