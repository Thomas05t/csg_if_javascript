var startscreen;
var song;
var slider;
var isInGame = false
var gamescreen;
var vid;

laadJavascriptFile('JS/P5/addons/p5.sound.js');

function preload() {
    song = loadSound('sounds/background/diekaplyn.mp3');
    startscreen = loadImage("images/backgrounds/ZuidAfrika1png.png");
    gamescreen= loadImage("images/backgrounds/ddd.png");
    vid = createVideo('intro.mp4');

}

function setup() {
    canvas = createCanvas(1920, 1080);
    canvas.parent('processing');
    song.play();
    slider = createSlider(0, 1, 0.5, 0.1);
    slider.position(800, 400);
    slider.style('width', '160px');
    
    vid.play();
    vid.size(1920, 1080);

}

function draw() {

    song.setVolume(slider.value());


    if (isInGame) {
        background(150);
        image(vid, 0, 0);
        
        
    } else {
        background(startscreen);
        textSize(60);
        textFont('Georgia');
        fill('white');
        fontBold = loadFont('assets/Bold.ttf');
        textAlign(CENTER);
        text("Klik op die muisknoppie om te begin", 960, 540);
        fill(0, 102, 153);
        if (mouseIsPressed) {
            isInGame = true
        }
    }
}