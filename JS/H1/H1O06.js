var scope;
var gamescreen;
var shot;
var reload;
var timer = 0.5;
var delay = 0.4;
var r4;
var bullet = 30;
var health =5;
var time;
laadJavascriptFile('JS/P5/addons/p5.sound.js');

function preload() {
    scope = loadImage("scope.png");
    gamescreen = loadImage("images/backgrounds/ddd.png");
    shot = loadSound('gunshot.mp3');
    reload = loadSound('gunreload.mp3');
    r4 = loadImage("r4.png");
}

function setup() {
    frameRate(60);


    createCanvas(1920, 1080);

}

function draw() {
    background(gamescreen);
    textSize(45);
    text("aantal koeëls:" + bullet, 1500, 900);
    image(r4, 1500, 920, r4.width / 2, r4.height / 2);
    if (timer > 0) {
        timer -= (deltaTime / 1000);
    }
    image(scope, mouseX - 250, mouseY - 250, 500, 500);
    if (mouseIsPressed) {

        if (timer <= 0) {
            timer = delay;
            shot.play();
            bullet--;
        }
    }


}


