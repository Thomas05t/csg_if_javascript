class Enemy {
    constructor(plaatje) {
        this.sprite = plaatje;
        this.width = this.sprite.width / 3;
        this.height = this.sprite.height / 3;
        this.x = random(0, width - this.width);
        this.y = random(0, height - this.height);
        this.isDood = false;
        this.lifeTime = 5;
    }

    update() {
        this.lifeTime -= (deltaTime / 1000);
    }

    teken() {
        image(this.sprite, this.x, this.y, this.width, this.height);
    }

    valMisschienDood(x, y) {
        if (this.lifeTime < 0) {
            this.isDood = true;
            return;
        }
        if (x > this.x && x < this.x + this.width && y > this.y && y < this.y + this.height) {
            this.isDood = true;
            return
        }
        this.isDood = false;
    }
}