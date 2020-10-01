var player;
var bg;
var fg;
var SCENE_W = 4000;
var SCENE_H = 5000;
var backgroundimg;
var mast, mastonImage, mast1halo, test;
var mastlocationsx = [500, 3500];
var mastlocationsy = [500, 2500];
var pickuplocationsx = [1000, 3500, 3900];
var pickuplocationsy = [4900, 500, 2500];
var p0, p1, p2, p3, p4, p5, p6, p7, p8, pi0, pi1, pi2, pi3, pi4, d, de, playerimg, pickupimg, fenceimg, enemyimg, noteimg, biggerblock, bigblock, t;
var idx = -1;
var effectPickedUp = [0, 0, 0, 0, 0];
var surprise = 0;
var surprise2 = 0;
var held = 0;
var pause = false;
var textsOn = [false, false, false, false, false];
var glitch = false;
var glitchtimer = 0;
var filterAlpha;
var texts = ["We're reporting bizarre activity.", "I don't know if carrying on is a good idea...", "What's the point?", "Gimme gimme gimme", "10,000 frogs"];
var counter;
var backgroundRepeat = 500;
var backgroundNoteLength = 4;
const now = Tone.now()
var currentChord;
var chordarray = [
  ["C2", "D2", "A2"],
  ["Eb2", "Ab2", "Bb2"]
];
var lengtharray = [500, 550, 600, 650, 700];
var hypotenuse, hypotenuseSquared;
var loading = true;
var loaded = false;
var mast1Vol, mast1Panning, mast2Vol, mast2Panning;
var drawMenu = false;
var menuslot = [];
var effect = [];
var playerSounds = [];
var playerEffects = [];
var pickupsCollected = [false, false, false];
var pickupsSelected = [false, false, false];
var pickupTexts = ["sine", "triangle", "sawtooth", "pulse", "square"];
var randomPartial1, randomPartial2, randomPartial3;
var startButtonColour = 100;
var testfreq = 220;
let pulse;
var goCrazy = false;
var glitchspeed = 200;
var playerSound = false;
var mast1Completed, mast2Completed;
var enemyMode = false;
var gameOver = false;
var endGame = false;
var endGameCounter = 0;
var flash = false;


function preload() {

  mastImage = loadImage('assets/mastoff.png')
  mast1haloImage = loadImage('assets/mast1halo1.png');
  test = loadAnimation('assets/mast1halo1.png', 'assets/mast1halo6.png');
  enemy1 = loadImage('assets/enemy1.png');
  enemy2 = loadImage('assets/enemy2.png');

  mastonImage = loadImage('assets/maston.png');

  p0 = loadImage('assets/bg0.png');
  p1 = loadImage('assets/bg1.png');
  p2 = loadImage('assets/bg2.png');
  p3 = loadImage('assets/bg3.png');
  p4 = loadImage('assets/bg4.png');
  p5 = loadImage('assets/bg5.png');
  p6 = loadImage('assets/bg6.png');
  p7 = loadImage('assets/bg7.png');
  p8 = loadImage('assets/bg8.png');

  pi0 = loadImage('assets/pickup1new.png');
  pi1 = loadImage('assets/pickup2new.png');
  pi2 = loadImage('assets/pickup3new.png');
  pi3 = loadImage('assets/pickup4new.png');
  pi4 = loadImage('assets/pickup5new.png');

  notetest = loadImage('assets/notetest.png');
  playerimg = loadImage('assets/player.png');
  pickupimg = loadImage('assets/pickup.png');
  fenceimg = loadImage('assets/securitydestruct.png');
  enemyimg = loadImage('assets/mast1halo1.png');
  noteimg = loadImage('assets/note.png');

  t1 = loadImage('assets/text1.png');
  t2 = loadImage('assets/realnote2.png');
  t3 = loadImage('assets/realnote3.png');
  t4 = loadImage('assets/realnote4.png');
  t5 = loadImage('assets/realnote5.png');
  t6 = loadImage('assets/realnote6.png');

  destroying = loadAnimation('assets/destruct1.png', 'assets/destruct22.png')
  biggerblock = loadImage('assets/biggerblock.png');

  m = loadTable("csvs/menuinfo.csv", "csv", "header");
  e = loadTable("csvs/menueffects.csv", "csv", "header");
}

function setup() {

  createCanvas(displayWidth, displayHeight);

  hypotenuseSquared = (displayWidth * displayWidth) + (displayHeight * displayHeight);
  hypotenuse = sqrt(hypotenuseSquared);

  counter = 0;
  createGroups();



  assignSprites();


  mast1Dist = 0;
  mast2Dist = 0;

  makeMenu();
  pulse = new Pulse();
}

function draw() {



  if (pickupsCollected[0] == true) {
    playerSound = true;
    part1.at("3", chord4);

  }
  if (pickupsCollected[1] == true) {

    part1.at("6", chord5);
    bassPart1.at("3", "F7");
    bassPart1.at("5", "Gb3");
    chordSynth.connect(crusher, limit);
    crusher.wet.value = 0.2;
    if (frameCount % 350 == 0) {
      playCluster(currentChord, int(random(1, 20)), int(random(2, 9)));
    }
  }
  if (pickupsCollected[2] == true) {
    bassPart1.loopEnd = "11.1";
    part1.at("6.1", chord7);
    part1.at("6", chord6);
    if (frameCount % 150 == 0) {
      playCluster(currentChord, int(random(20, 29)), int(random(2, 4)));
    }
  }





  /*  randomPartial1 = random(0.2, 1);
    randomPartial2 = random(0.2, 1);
    randomPartial3 = random(0.2, 1);*/
//  updatePartials(noise(frameCount), randomPartial1, randomPartial2, randomPartial3);


  if (loading) {


    background(0);
    fill(startButtonColour);
    textAlign(CENTER);
    textSize(40);
    text("use mouse to move", width / 2, height * 0.2);
    text("use z to play sounds", width / 2, height * 0.25);
    text("use m to choose sounds", width / 2, height * 0.3);
    textSize(50);
    text("loading...", width / 2, height / 2);

  } else if (loaded) {

    background(0);

    textAlign(CENTER);
    textSize(40);
    fill(200);
    text("use mouse to move", width / 2, height * 0.2);
    text("use z to play sounds", width / 2, height * 0.25);
    text("use m to choose sounds", width / 2, height * 0.3);
    textSize(50);
    fill(startButtonColour);
    text("START", width / 2, height / 2);

    if (mouseX > width / 2 - 50 && mouseX < width / 2 + 50 && mouseY > height / 2 - 25 && mouseY < height / 2 + 25) {
      startButtonColour = 255;
      if (mouseIsPressed) {
        mast1Player.start();
        mast2Player.start();
        playChords();
        loaded = false;
      }
    }

  } else if (gameOver) {
    part1.stop();
    part2.stop();
    bassPart1.stop();
    mast1Player.stop();
    mast2Player.stop();
    warningPlayer.stop();
    Tone.Transport.stop();
    if (frameCount % 40 == 0){
      flash = !flash;
    }

    background(0);

    textAlign(CENTER);
    textSize(50);
    if (flash){
    fill(180, 0, 26);
  } else {
    fill(0);
  }
        text("system failure.", width / 2, height /2);
        textSize(18);
        fill(180,0,26);
        text("(thanks for playing!)", width/2, height*0.8);
      } else {


    //print(mast1Player.state, panVolMast1.volume, mast2Player.state, panVolMast2.volume, mast3Player.state, panVolMast3.volume);

    if (frameCount % glitchspeed == 0) {
      glitch = !glitch;
      //playCluster(currentChord, int(random(20)), int(random(2,9)));
    }

    if (keyIsPressed && glitch && goCrazy == true) {
      surprise = random(170, 255);
      surprise2 = random(20, 180);
      filterAlpha = 10;
    } else {
      background(20);
      filterAlpha = noise(frameCount / 300.0) * 85;
      surprise = 0;
    }



    if (endGame){
      warningPlayer.start();
      feedbackDelay.feedback = 1;
      glitch = true;
      goCrazy = true;
      glitchspeed = 10;
      endGameCounter++;
      if (endGameCounter > 100){
        endGame = false;
        gameOver = true;
      }
    }

    if (glitch) {

    } else {

    }

    setCallbacks();



    if (mouseIsPressed) {
      camera.zoom = 0.1;
    } else {
      camera.zoom = 1;
    }

    playerMovement();


    drawAllSprites();

    drawFog();


    updateMasts();

    if (drawMenu) {
      drawCurrentMenu();
    }

    drawEdges();
    for (var wSet = 0; wSet < walkers.length; wSet++){
      var currentWalker = walkers.get(wSet);
      if (keyIsPressed && key == "z" && playerOsc.type == "square"){
        enemyMode = true;
        currentWalker.setCollider("rectangle", 0, 0,1000, 1000);
      } else {
        enemyMode = false;
        currentWalker.setDefaultCollider();
      }
    }
  }

  //update
  counter++;

  if (effect[0].selected == true){
    effect[1].selected == false;
    effect[2].selected == false;
  } else if (effect[1].selected == true){
    effect[0].selected == false;
    effect[2].selected == false;
  } else if (effect[2].selected == true){
    effect[0].selected == false;
    effect[1].selected == false;
  }

  //print(effect[0].selected, effect[1].selected, effect[2].selected);

  if (keyIsPressed && key == "z" && playerSound) {
    pulse.grow(playerOsc.frequency.value);
    pulse.display(player.position.x, player.position.y);

  }
}



function mousePressed() {
  for (var b = 0; b < effect.length; b++) {
    if (pickupsCollected[b] == true) {

      effect[b].clicked();

      if (effect[b].selected == true) {
        var ename = e.get(b, 4);
        playerOsc.type = ename;

      }
      /*var allExcept = effect.filter(function(x) {
        return x !== b;
      });
      allExcept.selected = false;
    print(ename);

    / var currentSelectedBlah = effect.exclude(3,7);
      print(currentSelectedBlah);
      for (var cancelOthers = 0; cancelOthers < effect.length; cancelOthers++){

      }*/
    }

  }

}

function exclude(from, to, inclusive = true) {
  if (inclusive) {
    return this.filter((x, i) => {
      if (i <= (from - 1) || i >= (to - 1)) {
        return true
      }
    })
  }
  if (!inclusive) {
    return this.filter((x, i) => {
      if (i < (from - 1) || i > (to - 1)) {
        return true
      }
    })
  }
}
Array.prototype.exclude = exclude;

document.addEventListener('keydown', (event) => {
  if (event.key == "m") {
    pause = !pause;
    drawMenu = !drawMenu;
  }
  if (event.key == "z") {

  }
});

function makeMenu() {
  for (var i = 0; i < m.getRowCount(); i++) {
    menuslot.push(new Itemholder());
  }

  for (var j = 0; j < e.getRowCount(); j++) {
    effect.push(new Pickup());
    if (j < 5) {
      playerSounds[j] = e.get(j, 5);
    } else {
      playerEffects[j - 5] = e.get(j, 4);
    }
  }
}


function createGroups() {

  destructibles = new Group();
  masts = new Group();
  pickups = new Group();
  bg = new Group();
  walkers = new Group();
  notes = new Group();
  texts = new Group();
  readers = new Group();
  statics = new Group();

}

function setCallbacks() {
if (enemyMode){
  player.overlap(walkers, kill);
} else {
  player.overlap(walkers, reset);
}

  player.collide(mast1, check1);
  player.collide(mast2, check2);
  walkers.bounce(destructibles);
  player.collide(destructibles, destroy);

  player.collide(statics);
  player.collide(note1, read1);
  player.collide(note2, read2);
  player.collide(note3, read3);
  player.collide(note4, read4);
  player.collide(note5, read5);
  player.collide(note6, read6);

  player.overlap(pickup1, collect1);
  player.overlap(pickup2, collect2);
  player.overlap(pickup3, collect3);

}

function playerMovement() {

  if (drawMenu) {
    player.velocity.x = 0;
    player.velocity.y = 0;
  } else {
    player.velocity.x = (camera.mouseX - player.position.x) / 60;
    player.velocity.y = (camera.mouseY - player.position.y) / 60;
    camera.position.x = player.position.x;
    camera.position.y = player.position.y;
  }


  if (player.position.x < 0)
    player.position.x = 0;
  if (player.position.y < 0)
    player.position.y = 0;
  if (player.position.x > SCENE_W)
    player.position.x = SCENE_W;
  if (player.position.y > SCENE_H)
    player.position.y = SCENE_H;

}

function drawEdges() {
  push();
  noStroke();
  fill(0);
  rectMode(CENTER);
  rect(-5000 - (player.width / 2), 2500, 10000, 10000);
  rect(9000 + (player.width / 2), 2500, 10000, 10000);
  rect(2000, -5000 - (player.width / 2), 10000, 10000);
  rect(2000, 10000 + (player.width / 2), 10000, 10000);
  pop();
}

function drawAllSprites() {

  drawSprites(bg);
  drawSprites(pickups);
  drawSprites(masts);
  drawSprites(destructibles);
  drawSprites(statics);
  drawSprites(texts);
  drawSprites(walkers);
  drawSprites(notes);
  drawSprites(readers);
  drawSprites(notes);
  drawSprite(player);

}

function drawFog() {
  var fogAlpha = noise(frameCount / 300.0)*85;
  var fogR = 255;
  rectMode(CENTER);
  if (gameOver){
    fogAlpha++;
    fogR--
    fill(0,255);
  } else {
    fill(fogR, 0, surprise, fogAlpha);
  }



  rect(-1000, 1000, 30000, 30000);


}

function updateMasts() {
  if (mast1Completed) {
    mast1Vol = -15;
    endGame = true;
warningPlayer.start();
  } else {
    var mast1Dist = dist(player.position.x, player.position.y, mastlocationsx[0], mastlocationsy[0]);
    var mast1Vol = map(mast1Dist, 2000, 0, -100, 5);
  }

  if (mast2Completed) {
    part2.start();
    pickup3.visible = true;
    mast2Vol = -15;
  } else {
    var mast2Dist = dist(player.position.x, player.position.y, mastlocationsx[1], mastlocationsy[1]);
    var mast2Vol = map(mast2Dist, 2000, 0, -100, 5);
  }
  var mast1Panning = map(mastlocationsx[0] - player.position.x, 1000, -1000, -0.9, 0.9);
  var mast2Panning = map(mastlocationsx[1] - player.position.x, 1000, -1000, -0.9, 0.9);

  updateMastPanVol(mast1Vol, mast1Panning, mast2Vol, mast2Panning);
  //print(mast1Vol);
}

function drawCurrentMenu() {
  for (var a = 4; a < menuslot.length; a++) {
    var x = m.get(a, 1);
    var y = m.get(a, 2);
    var size = m.get(a, 3);
    var colour = m.get(a, 4);

    //fill(105);
    //rect(500,500,150,150);
    menuslot[a].display(player.position.x, x, player.position.y, y, size, colour);


  }



  for (var b = 0; b < effect.length; b++) {

    if (pickupsCollected[b] == true) {
      var ex = e.get(b, 1);
      var ey = e.get(b, 2);
      var esize = e.get(b, 3);
      var ename = e.get(b, 5);

      effect[b].display(player.position.x, ex, player.position.y, ey, esize, ename);
      effect[b].rollover(ex, ey, camera.mouseX, camera.mouseY);

    }
  }
}
