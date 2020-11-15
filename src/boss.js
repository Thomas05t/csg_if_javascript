class Boss {
    constructor(plaatje) {
        this.sprite = plaatje;
        this.levens = 100;
        this.width = plaatje.width / 4;
        this.height = plaatje.height / 4;
        this.x = 100 - this.width / 2;
        this.y = height / 2  - this.height / 2;
        this.isVerslagen = false;
    }

    beweeg() {
        this.x += 1.4;
    }

    teken() {
        image(this.sprite, this.x, this.y, this.width, this.height);
    }

    raak(x, y) {
        if (x > this.x && x < this.x + this.width && y > this.y && y < this.y + this.height) {
            this.levens -= 1;
            if (this.levens <= 0)
            {
                this.isVerslagen = true;
            }
            return true;
        }
        return false;
    }
}