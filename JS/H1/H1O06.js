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
    constructor() {
        var index = int(random(0, enemyImages.length));
        this.sprite = enemyImages[index]
        this.width = this.sprite.width / 2;
        this.height = this.sprite.height / 2;
        this.x = random(0, width - this.width);
        this.y = random(0, height - this.height);
        this.isDood = false
    }

    teken() {
        image(this.sprite, this.x, this.y, this.width, this.height);
    }

    valMisschienDood(x, y) {
        if (x > this.x && x < this.x + this.width && y > this.y && y < this.y + this.height) {
            this.isDood = true;
            return
        }
        this.isDood = false;
    }
}


function setup() {
    frameRate(60);
    createCanvas(windowWidth, windowHeight);

    spawn_vijand(2)
}

function spawn_vijand(aantal) {
    for (var i = 0; i < aantal; i++) {
        enemies.push(new Enemy());
    }
}

function draw() {
    background(gamescreen);
    textSize(45);
    image(scope, mouseX - 250, mouseY - 250, 500, 500);
    if (mouseIsPressed) {

        if (timer <= 0 && !reload.isPlaying()) {
            //Shiet de kogel
            timer = delay;
            shot.play();
            bullet--;
            image(mflash, mouseX + 30 - 250, mouseY - 10 - 250, 500, 500);
            if (bullet == 0) {
                reload.play();
                bullet = 30;
            }
            for (var i = enemies.length - 1; i >= 0; i--) {
                enemies[i].valMisschienDood(mouseX, mouseY)
                if (enemies[i].isDood) {
                    enemies.splice(i, 1);
                    spawn_vijand(1)
                }
            }
        }

    }

    enemies.forEach(enemy => {
        enemy.teken()
    })
    tint(0)
    text("aantal koeëls:" + bullet, width - 400, height - 100);
    image(r4, width - r4.width / 2 - 100, height - r4.height / 2 - 100, r4.width / 2, r4.height / 2);
    if (timer > 0) {
        timer -= (deltaTime / 1000);
    }
}
