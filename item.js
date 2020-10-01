class Pickup {
  constructor() {
    this.x = 200;
    this.y = 200;
    this.d = 14;
    this.size = 20;
    this.over = false;
    this.selected = false;
    this.strokecol = color(255);
    this.fill = color(255);
    this.realx = 0;
    this.realy = 0;
    this.name

  }

  display(xPos, x, yPos, y, size, name) {
    this.realx = float(xPos) + float(x);
    this.realy = float(yPos) + float(y);
    this.x = this.realx;
    this.y = this.realy;
    this.size = size;
    this.name = name

    if (this.over) {

      textAlign(CENTER);
      push();
      noStroke();
      fill(255);
      text(this.name, this.x, this.y - 20);
      pop();
      this.fill = color(0);

    } else {

      this.fill = color(255);

    }

    if (this.selected) {

      this.strokecol = color(255, 0, 0);

    } else {

      this.strokecol = this.fill;

    }

    stroke(this.strokecol);
    fill(this.fill);
    ellipse(this.x, this.y, size);

  }

  rollover(ex, ey, px, py) {

    this.d = dist(px, py, this.x, this.y);
    this.over = this.d < 14;

  }

  clicked() {

    if (this.over && mouseIsPressed) {

      this.selected = !this.selected;


    }
    

  }







}
