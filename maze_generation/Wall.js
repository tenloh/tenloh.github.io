class Wall {
    constructor(i1, j1, i2, j2) {
        this.i1 = i1;
        this.j1 = j1;
        this.i2 = i2;
        this.j2 = j2;

        this.x1 = j1 * length;
        this.y1 = i1 * length;
        this.x2 = j2 * length;
        this.y2 = i2 * length;

        this.deleted = false;
    }
    render() {
        if (!this.deleted) {
            context.strokeStyle = "#ffffff";
            drawLine(this.x1, this.y1, this.x2, this.y2);
        }
    }
}