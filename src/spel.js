class Spel {
    constructor() {
        this.timer = 0.5;
        this.ammo = 30;
        this.health = 5;
        this.enemies = [];
        this.enemyImages = [];
        this.levens = 5;
        this.tekenMuzzleFlash = false;
    }

    laad() {
        this.scopePlaatje = loadImage("assets/images/scope.png");
        this.achtergondPlaatje = loadImage("assets/images/ddd.png");
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
    }

    spawnVijand(aantal) {
        for (var i = 0; i < aantal; i++) {
            var willekeurigePositie = int(random(0, this.enemyImages.length));
            this.enemies.push(new Enemy(this.enemyImages[willekeurigePositie]));
        }
    }

    bereidDeGimmaVoor() {
        this.spawnVijand(2);
    }

    update() {
        if (mouseIsPressed) {
            if (this.timer <= 0 && !this.reloadGeluid.isPlaying()) {
                // Shiet de kogel
                this.timer = 0.4;
                this.shotGeluid.play();
                this.ammo--;

                // Muzzle Flash effect
                this.tekenMuzzleFlash = true;

                if (this.ammo == 0) {
                    this.reloadGeluid.play();
                    this.ammo = 30;
                }

                for (var i = 0; i < this.enemies.length; i++) {
                    this.enemies[i].valMisschienDood(mouseX, mouseY)
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
        if (this.timer > 0) {
            this.timer -= (deltaTime / 1000);
        }
    }

    teken() {
        imageMode(CORNER);

        background(this.achtergondPlaatje);

        image(this.profielPlaatje, 0, 0, this.profielPlaatje.width / 5, this.profielPlaatje.height / 5)


        this.enemies.forEach(enemy => {
            enemy.teken();
        })

        fill(0)
        textSize(46);
        text("Aantal Koeëls:" + this.ammo, width - 420, height - 200);
        image(this.r4Plaatje, width - this.r4Plaatje.width / 2 - 100, height - this.r4Plaatje.height / 2 - 50, this.r4Plaatje.width / 2, this.r4Plaatje.height / 2);

        if (this.tekenMuzzleFlash) {
            image(this.mflashPlaatje, mouseX + 30 - 250, mouseY - 10 - 250, 500, 500);
            this.tekenMuzzleFlash = false;
        }

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
    }
}

var spel = new Spel();

function preload() {
    spel.laad();
}

function setup() {
    frameRate(60);
    createCanvas(windowWidth, windowHeight);
    spel.bereidDeGimmaVoor();
}

function draw() {
    spel.update();
    spel.teken();
}