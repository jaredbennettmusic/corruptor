class Pulse {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.size = 0;
    this.alpha = 255;
  }

  grow(speed){
    var rate = map(speed, 0, 1000, 0.01, 10);
    this.size+=rate;
    this.alpha-=rate;
    if (this.alpha < 0) {
      this.size = 0;
      this.alpha = 255;
    }

  }
  display(xPos, yPos) {
    this.x = xPos;
    this.y = yPos;
    strokeWeight(1);
    stroke(255, this.alpha);
    noFill();
    ellipse(this.x, this.y, this.size,this.size);

  }
}


/*

passiveSound4,25,-60,15,1
passiveSound5,50,-60,15,1
passiveEffect1,-50,60,15,2
passiveEffect2,-25,60,15,2
passiveEffect3,0,60,15,2
passiveEffect4,25,60,15,2
passiveEffect5,50,60,15,2
*/
