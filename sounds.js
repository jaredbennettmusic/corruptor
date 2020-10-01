var chordarray = [
  ["C2", "D2", "A2"],
  ["Eb2", "Ab2", "Bb2"]
];
var lengtharray = [500, 550, 600, 650, 700];

var pan1, counter;
var currentChord;
var backgroundRepeat = 500;
var backgroundNoteLength = 4;
var currentChord = 440;





function setup() {
  counter = 0;

}

function draw() {

}

document.addEventListener('keydown', (event) => {
  if (event.key == "z" && playerSound) {
        playerOsc.start();
  }
});

document.addEventListener('keyup', (event) => {
  if (event.key == "z") {
    playerOsc.stop();
    if (warningPlayerGo) {
      warningPlayer.start();
    }
  }
})




function mouseClicked() {

  Tone.context.resume();

  Tone.Transport.start();

}

function mast1play() {
  loopA.start();
}

function playCluster(notes, speed, l) {
  var n1 = Tone.Frequency(notes[1]).toFrequency();
  var n2 = Tone.Frequency(notes[2]).toFrequency();
  for (var i = 1; i < l; i++) {
    var fig = i / speed;
    var offset = fig.toString();
    synth2.triggerAttackRelease(random((n1 * 4) - 20, (n1 * 4) + 20), "32n", "+" + offset);

  }
  console.log("otherboop");
}

function playNote(len, notes, rn, ext) {
  var l = len;
  var l2 = len - 1.5;
  var l3 = len - 2.5;
  var n = notes;
  var t = rn;
  synth.triggerAttackRelease(chordarray[n][0], l);
  console.log("boop");
  synth.triggerAttackRelease(chordarray[n][1], l2, "+ 1.5");
  synth.triggerAttackRelease(chordarray[n][2], l3, "+ 2.5");
  console.log(l, l2, l3)
  backgroundRepeat = lengtharray[int(random(lengtharray.length))] + ext;
}

function playChords(rn) {
  part1.start();

}


function updatePanning(p) {
  pan1 = p;
  playerPanner.pan.value = pan1;

}

function updateMastPanVol(m1v, m1p, m2v, m2p) {
  panVolMast1.pan.value = 0; //m1p;
  panVolMast2.pan.value = 0; //m2p;
  panVolMast1.volume.value = m1v;
  panVolMast2.volume.value = m2v;
}


function updatePartials(noise, r1, r2, r3) {
  //  playerOsc.partials = [r1, r2, r3];
}

function updateFrequency(note){
  playerOsc.frequency = note;
}

function mast1Complete(){


};

function mast1Finished(time){
	//warningPlayer.stop(time);
  goCrazy = false;
  glitchspeed = 200;
};

warningPlayer.loop = true;
warningPlayer.volume.value = 30;
