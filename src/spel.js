class Spel {
    constructor() {
        this.enemies = [];
        this.enemyImages = [];
        this.tekenMuzzleFlash = false;
        this.inMenu = true;
        this.inIntro = false;
        this.inLevel = false;
    }

    laad() {
        this.scopePlaatje = loadImage("assets/images/scope.png");
        this.achtergondPlaatje = loadImage("assets/images/backgrounds/ddd.png");
        this.r4Plaatje = loadImage("assets/images/r4.png");

        this.shotGeluid = loadSound('assets/sounds/gunshot.mp3');
        this.reloadGeluid = loadSound('assets/sounds/gunreload.mp3');

        this.mflashPlaatje = loadImage("assets/images/mflash.png")
        this.hartPlaatje = loadImage("assets/images/heart.png")
        this.profielPlaatje = loadImage("assets/images/profilepic.png");
        this.enemyImages.push(loadImage("assets/images/enemies/enemy1.png"));
        this.enemyImages.push(loadImage("assets/images/enemies/enemy2.png"));
        this.enemyImages.push(loadImage("assets/images/enemies/enemy3.png"));
        this.enemyImages.push(loadImage("assets/images/enemies/enemy4.png"));
        this.enemyImages.push(loadImage("assets/images/enemies/enemy5.png"));

        this.menuSong = createAudio('assets/sounds/diekaplyn.mp3');
        this.startscreen = loadImage("assets/images/backgrounds/ZuidAfrika1.png");
        this.video = createVideo('assets/videos/intro.mp4');
        this.video.hide();
    }

    spawnVijand(aantal) {
        for (var i = 0; i < aantal; i++) {
            var willekeurigePositie = int(random(0, this.enemyImages.length));
            this.enemies.push(new Enemy(this.enemyImages[willekeurigePositie]));
        }
    }

    startMenu() {
        this.spawnVijand(2);
        this.menuSong.loop();
    }

    startLevel(level) {
        this.inLevel = true;
        this.inMenu = false;
        this.inIntro = false;
        this.canvas.show();
        this.video.hide();
        this.video.stop();
        this.menuSong.stop();

        // Level 'settings'
        this.level = level;
        this.tijdOver = level * 10;
        this.score = 0;
        this.doel = 100 * level;
        this.wapenTimer = 0.5;
        this.ammo = 30;
        this.levens = level + 3;
    }

    startIntro() {
        this.inIntro = true;
        this.inLevel = false;
        this.inMenu = false;
        this.canvas.hide();
        this.video.show();
        this.video.play();
        this.video.size(windowWidth, windowHeight);
        this.menuSong.stop();
    }

    update() {
        if (this.inMenu) {
            cursor(ARROW);
            if (keyIsDown(32)) {
                this.startIntro();
            }
        } else if (this.inIntro) {
            if (keyIsDown(ENTER)) {
                this.startLevel(1)
            }
        }
        else if (this.inLevel) {
            noCursor();
            imageMode(CORNER)
            if (mouseIsPressed) {
                if (this.wapenTimer <= 0 && !this.reloadGeluid.isPlaying()) {
                    // Shiet de kogel
                    this.wapenTimer = 0.4;
                    this.shotGeluid.play();
                    this.ammo--;

                    // Muzzle Flash effect
                    this.tekenMuzzleFlash = true;

                    if (this.ammo == 0) {
                        this.reloadGeluid.play();
                        this.ammo = 30;
                    }

                    for (var i = 0; i < this.enemies.length; i++) {
                        if (this.enemies[i].valMisschienDood(mouseX, mouseY)) {
                            this.score += 10;
                        }
                    }
                }
            }
            for (var i = 0; i < this.enemies.length; i++) {
                this.enemies[i].update();
            }

            for (var i = this.enemies.length - 1; i >= 0; i--) {
                if (this.enemies[i].isDood) {
                    this.enemies.splice(i, 1);
                    this.spawnVijand(1)
                }
            }
            if (this.wapenTimer > 0) {
                this.wapenTimer -= (deltaTime / 1000);
            }
            this.tijdOver -= (deltaTime / 1000);
            if (this.score >= this.doel) {
                this.inLevel = false;
            }
            if (this.tijdOver <= 0.0) {
                this.inLevel = false;
                this.gameOver = true;
            }
        } else {
            if (this.gameOver) {
                if (keyIsDown(32)) {
                    this.startLevel(1);
                }
            } else {
                if (keyIsDown(32)) {
                    this.startLevel(this.level + 1);
                }
            }
        }
    }

    teken() {
        if (this.inMenu) {
            textFont('monospace');
            cursor(ARROW);
            image(this.startscreen, 0, 0, width, height);
            fill(0);
            textStyle(BOLD);
            textAlign(CENTER, CENTER);
            textSize(48);
            text("DRUK OP SPATIE OM TE BEGINNEN", width / 2, height / 2 + 200);
        } else if (this.inIntro) {
            background(255, 0, 255);
        }
        else if (this.inLevel) {
            imageMode(CORNER);
            background(this.achtergondPlaatje);
            image(this.profielPlaatje, 0, 0, this.profielPlaatje.width / 5, this.profielPlaatje.height / 5)


            this.enemies.forEach(enemy => {
                enemy.teken();
            })

            fill(0)
            textSize(36);
            textStyle(BOLD);
            textAlign(LEFT);
            text("Aantal Koeëls:" + this.ammo, width - 420, height - 200);
            image(this.r4Plaatje, width - this.r4Plaatje.width / 2 - 100, height - this.r4Plaatje.height / 2 - 50, this.r4Plaatje.width / 2, this.r4Plaatje.height / 2);

            if (this.tekenMuzzleFlash) {
                image(this.mflashPlaatje, mouseX + 30 - 250, mouseY - 10 - 250, 500, 500);
                this.tekenMuzzleFlash = false;
            }

            // HUD
            textFont('monospace');
            fill(20);
            textSize(36);
            textAlign(CENTER, CENTER);
            textStyle(BOLD);
            text(this.score + "/" + this.doel, width / 2, 40);
            text("TIJD: " + this.tijdOver.toFixed(2) + "s", 300, 40);
            text("LEVEL: " + this.level, width - 300, 40);



            // Healthbar
            for (var i = 0; i < this.levens; i++) {
                noStroke();
                fill(200, 20, 20)
                const HEART_SIZE = 80;
                imageMode(CENTER);
                image(this.hartPlaatje, .5 * HEART_SIZE + i * HEART_SIZE + 10, windowHeight - 50, HEART_SIZE, HEART_SIZE);
            }
            imageMode(CORNER)
            image(this.scopePlaatje, mouseX - 250, mouseY - 250, 500, 500);
        } else {
            cursor(ARROW);
            image(this.startscreen, 0, 0, width, height);
            fill(0);

            textAlign(CENTER, CENTER);
            textFont('monospace');
            textSize(84);

            if (this.gameOver) {
                textStyle(BOLD);
                text("GAME OVER", width / 2, height / 2 - 100);
                textStyle(NORMAL);
                textSize(32);
                text("Je score was: " + this.score + "/" + this.doel, width / 2, height / 2 + 50);
            } else {
                textStyle(BOLD);
                text("LEVEL " + this.level + "  GEHAALD!", width / 2, height / 2 - 100);
                textStyle(NORMAL);
                textSize(32);
                text("En je had nog " + this.tijdOver.toFixed(2) + "s over!", width / 2, height / 2 + 50);
            }
        }
    }
}

var spel = new Spel();

function preload() {
    spel.laad();
}

function setup() {
    frameRate(60);
    spel.canvas = createCanvas(windowWidth, windowHeight);
    spel.startMenu();
}

function draw() {
    spel.update();
    spel.teken();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}