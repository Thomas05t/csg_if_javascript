var startscreen;
var song;
var slider;
var isInGame = false
var gamescreen;
var vid;
var scope;
var vidIsPlaying = false
var shot;
var reload;
var timer = 0.5;
var delay = 0.4;
var r4;
var bullet;
var health =5;
var time;
var mflash;

laadJavascriptFile('JS/P5/addons/p5.sound.js');

function preload() {
    song = loadSound('sounds/background/diekaplyn.mp3');
    startscreen = loadImage("images/backgrounds/ZuidAfrika1png.png");
    gamescreen = loadImage("images/backgrounds/ddd.png");
    vid = createVideo('intro.mp4');
    scope = loadImage("scope.png")
    shot = loadSound('gunshot.mp3')
    reload = loadSound('gunreload.mp3')

}

function setup() {
    canvas = createCanvas(1920, 1080);
    canvas.parent('processing');
    frameRate(60);
    song.play();
    slider = createSlider(0, 1, 0.5, 0.1);
    slider.position(800, 400);
    slider.style('width', '160px');



}

function draw() {

    song.setVolume(slider.value());


    if (isInGame) {
        background(150);
        vid.play();
        vid.size(1920, 1080);
        image(vid, 0, 0);
        vid.noLoop();
        vidIsPlaying = false;

    }
    else {
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

//if (isInGame) {
//background(gamescreen)

/*if  (isInGame && vidIsPlaying == true) {
        background(150);
        vid.play();
        vid.size(1920, 1080);
        image(vid, 0, 0);
        vid.noLoop();
        vidIsPlaying = false;} */

/*function draw() {
    background(gamescreen);
    if (timer > 0) {
        timer -= (deltaTime / 1000);
    }
    image(scope, mouseX - 250, mouseY - 250, 500, 500);
    if (mouseIsPressed) {

        if (timer <= 0) {
            timer = delay;
            shot.play();
        }
    }


}*/

//papa idee: bloed spletter, hart en hoofd raken, punten systeem