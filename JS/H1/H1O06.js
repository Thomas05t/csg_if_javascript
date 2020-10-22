var scope;
var gamescreen;
var shot;
var reload;
var timer = 0.5;
var delay = 0.4;
var r4;
var bullet = 30;
var health = 5;
var time;
var mflash;
var enemyImages = [];
var enemies = []; 

laadJavascriptFile('JS/P5/addons/p5.sound.js');

function preload() {
    scope = loadImage("scope.png");
    gamescreen = loadImage("images/backgrounds/ddd.png");
    shot = loadSound('gunshot.mp3');
    reload = loadSound('gunreload.mp3');
    r4 = loadImage("r4.png");
    mflash = loadImage("mflash.png")
    reload = loadSound('gunreload.mp3');
    enemyImages.push(loadImage("Enemies/enemy1.png"));
    enemyImages.push(loadImage("Enemies/enemy2.png"));
    enemyImages.push(loadImage("Enemies/enemy3.png"));
    enemyImages.push(loadImage("Enemies/enemy4.png"));
    enemyImages.push(loadImage("Enemies/enemy5.png"));
}

class Enemy {
  constructor(x, y, imgsRef) {
    this.x = x;
    this.y = y;
    this.height =100;
    this.width =100;
    this.sprite = imgsRef[random(0, imgsRef.length - 1)]    
  }

  teken() {
      image(this.sprite, this.x, this.y, this.width, this.height);
  }
}


function setup() {
    frameRate(60);
    createCanvas(1920, 1080);

    //enemies.push(new Enemy(200, 200, enemyImages));
}

function draw() {
    background(gamescreen);
    textSize(45);
    text("aantal koeëls:" + bullet, 1540, 920);
    image(r4, 1500, 920, r4.width / 2, r4.height / 2);
    if (timer > 0) {
        timer -= (deltaTime / 1000);
    }
    image(scope, mouseX - 250, mouseY - 250, 500, 500);
    if (mouseIsPressed) {

        if (timer <= 0 && !reload.isPlaying()) {
            timer = delay;
            shot.play();
            bullet--;
            image(mflash, mouseX + 30 - 250, mouseY - 10 - 250, 500, 500);
            if (bullet == 0) { reload.play(); 
            bullet=30; }

        }

    }

    enemies.forEach(enemy => {
        enemy.teken()
    })

}