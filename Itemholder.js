class Itemholder {
  constructor() {
    this.x = 200;
    this.y = 200;
    this.size = 20;
  }

  display(xPos, x, yPos, y, size, colour) {
    var realx = float(xPos)+float(x);
    var realy = float(yPos)+float(y);
    if (colour == 1) {
      fill(0,84,55);
    } else if (colour == 2) {
      fill(37,109,255);
    }
    rectMode(CENTER);
    noStroke();
    rect(realx, realy, size, size);
  }

  clicked(tw, th) {
    var offsetx = -tw;
    var offsety = -th;
    if (dist(mouseX+offsetx, mouseY+offsety, this.x, this.y) < this.size) {
      background(255, 0, 0);
    }
  }
}


/*sound4,25,-60,7.5,triangle16
sound5,50,-60,7.5,square
effect1,-50,60,7.5,distortion
effect2,-25,60,7.5,phaser
effect3,0,60,7.5,delay
effect4,25,60,7.5,chorus
effect5,50,60,7.5,tremolo*/
