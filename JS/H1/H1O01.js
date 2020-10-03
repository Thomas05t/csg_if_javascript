var startscreen;
var song;
var slider;
var isInGame = false
var gamescreen;

laadJavascriptFile('JS/P5/addons/p5.sound.js');

function preload() {
    song = loadSound('sounds/background/diekaplyn.mp3');
    startscreen = loadImage("images/backgrounds/ZuidAfrika1png.png");
    gamescreen= loadImage("images/backgrounds/ddd.png");
}

function setup() {
    canvas = createCanvas(1920, 1080);
    canvas.parent('processing');
    song.play();
    slider = createSlider(0, 1, 0.5, 0.1);
    slider.position(800, 400);
    slider.style('width', '160px');
    textFont("Verdana");
    textSize(30);
    noStroke();
}

function draw() {

    song.setVolume(slider.value());


    if (isInGame) {
        background(gamescreen)
        
        
    } else {
        background(startscreen);
        fill('white');
        text("Klik op die muisknoppie om te begin")
        if (mouseIsPressed) {
            isInGame = true
        }
    }
}

