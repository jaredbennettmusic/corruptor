var mast1Sample, mast2Sample;
var playerWaveType = "sine";
var playerOsc;
var playerNote = 440;
var currentChord = [440, 330];
var currentChord2;

var chord1 = ["Ab5", "Bb5", "Eb6"];
var chord2 = ["F5", "Bb5", "C6"];
var chord3 = ["Gb5", "Db6", "F6"];
var chord4 = ["E5", "Bb5", "C6"];
var chord5 = ["Gb5", "C6", "E6"];
var chord6 = ["F5", "A5", "C6"];
var chord7 = ["Eb5", "Db6", "G6"];

var intensechord1 = ["C3", "G3", "D4"];
var intensechord2 = ["D3", "Bb3", "Eb4"];
var intensechord3 = ["F3", "C4", "G4"];
var intensechord4 = ["Ab3", "Db4", "Gb4"];

var backgroundChords = [
  ["Ab5", "Bb5", "Eb6"],
  ["F5", "Bb5", "C6"],
  ["Gb5", "Db6", "F6"]
];

var backgroundChords2 = [
  ["Ab3", "Bb3", "Eb4"],
  ["F3", "Bb3", "C4"],
  ["Gb3", "Db3", "F4"]
];

var originalBackgroundChords = [
  ["Ab5", "Bb5", "Eb6"],
  ["F5", "Bb5", "C6"],
  ["Gb5", "Db6", "F6"]
];

var backgroundChordsW1 = [
  ["Ab5", "Bb5", "Eb6"],
  ["E5", "Bb5", "C6"],
  ["Gb5", "Db6", "F6"]
];

var backgroundChordsW2 = [
  ["Ab5", "Bb5", "Eb6"],
  ["E5", "Bb5", "C6"],
  ["Gb5", "C6", "E6"]
];

var backgroundChordsB1 = [
  ["Ab5", "Bb5", "Eb6"],
  ["F5", "A5", "C6"],
  ["Gb5", "C6", "E6"]
];

var backgroundChordsB2 = [
  ["Ab5", "Bb5", "Eb6"],
  ["F5", "A5", "C6"],
  ["Eb5", "Db6", "G6"]
];

var bassSynthVolume = new Tone.Volume(-20).toMaster();
var chordSynthVolume = new Tone.Volume(-20).toMaster();
var backgroundChordRefs = ["original", "-1", "-2", "+1", "+2", "+3"];


var limit = new Tone.Limiter({
  "threshold" : -100
}).toMaster();
var limit2 = new Tone.Limiter({
  "threshold" : -56
}).toMaster();
var bigLimit = new Tone.Limiter({
  "threshold" : -100
}).toMaster();

const chordsVol = new Tone.Volume(-12).toMaster();

const feedbackDelay = new Tone.FeedbackDelay("8n", 0.3).toMaster();

const playerDistort = new Tone.Distortion(0).toMaster();
const mast1Distortion = new Tone.Distortion(0.8).toMaster();
mast1Distortion.wet.value = 0;
const mast2Distortion = new Tone.Distortion(0.8).toMaster();
mast2Distortion.wet.value = 0;

playerOsc = new Tone.Oscillator(currentChord[1], playerWaveType).chain(limit, playerDistort, Tone.Master);

const filter = new Tone.Filter({
  "frequency" : 100,
  "type" : "lowpass",
"Q" : 9,
"detune" : 14
});

var panVolMast1 = new Tone.PanVol(0, -100).toMaster();
var panVolMast2 = new Tone.PanVol(0, -100).toMaster();

const distort = new Tone.Distortion(0.1);

 var playerPanner = new Tone.Panner(-1);

 var bassPhaser = new Tone.Phaser({
 	"frequency" : 0.01,
 	"octaves" : 3,
 	"baseFrequency" : 200
 });



var rev = new Tone.Reverb({

  "decay" : 4,
  "wet" : 1
});

var rev2 = new Tone.Reverb({

  "decay" : 9,
  "wet" : 1
});

var bassReverb = new Tone.Reverb({
  "decay" : 16,
  "wet" : 0.2
});
bassReverb.generate();
rev.generate();
rev2.generate();

const crusher = new Tone.BitCrusher(4);
crusher.wet.value = 0;

const chorus = new Tone.Chorus({
  "frequency" : 40,
  "delayTime" : 2,
  "depth" : 0.2,
  "wet" : 0.1
}).toMaster();


var synth = new Tone.PolySynth(4, Tone.MonoSynth, {
//  "detune" : -2000,
  "oscillator" : {
    "type" : "triangle16",
    "partials" : [1, 0.4, 0.7, 0.1, 0.9, 0.1]
  },

  "envelope" : {
    "attack" : 0.9,
    "decay" : 1.0,
    "sustain" : 5,
    "release" : 3.6,
  },
  "filterEnvelope" : {
    "attack" : 0.06,
    "decay" : 0.6,
    "sustain" : 4,
    "release" : 4,
    "baseFrequency" : 400,
    "octaves" : 1
  },
}).chain(limit, filter, rev, Tone.Master);

var chordSynth = new Tone.PolySynth(4, Tone.MonoSynth, {
//  "detune" : -2000,
  "oscillator" : {
    "type" : "sawtooth16",
    "partials" : [1, 0.4, 0.7, 0.1, 0.9, 0.1]
  },

  "envelope" : {
    "attack" : 0.9,
    "decay" : 1.0,
    "sustain" : 5,
    "release" : 3.6,
  },
  "filterEnvelope" : {
    "attack" : 0.06,
    "decay" : 0.1,
    "sustain" : 4,
    "release" : 4,
    "baseFrequency" : 400,
    "octaves" : 1
  },
}).chain(limit, chordSynthVolume, filter, crusher, rev, Tone.Master);



var synth2 = new Tone.PolySynth(4, Tone.FMSynth, {
  "harmonicity" : 1.12 ,
  "modulationIndex" : 0.2 ,
  "detune" : 6 ,
  "oscillator" : {
    "type" : "sine",
    "partials" : [6, 2, 2, 2, 1, 1, 1, 1]
  } ,
  "envelope" : {
    "attack" : 0.01 ,
    "decay" : 0.01 ,
    "sustain" : 1 ,
    "release" : 0.5
  } ,
  "modulation" : {
    "type" : "sawtooth",
    "partials" : [0, 1, 2, 3, 4, 5, 6, 7, 8]
  } ,
  "modulationEnvelope" : {
    "attack" : 3 ,
    "decay" : 0.7 ,
    "sustain" : 1 ,
    "release ": 0.5
    }
}).chain(limit, feedbackDelay, rev2, limit, Tone.Master);


var mast1Player = new Tone.Player("samples/mast1.wav").chain(panVolMast1, mast1Distortion, Tone.Master);
var mast2Player = new Tone.Player("samples/mast2.wav").chain(panVolMast2, mast2Distortion, Tone.Master);
var warningPlayer = new Tone.Player("samples/instabilitydetected.wav").toMaster();

mast1Player.loop = true;
mast2Player.loop = true;
Tone.Buffer.on('load', function(){
  loading = false;
  loaded = true;
});

var mast1synth = new Tone.FMSynth({
  "harmonicity" : 3 ,
  "modulationIndex" : 10 ,
  "detune" : 16 ,
  "oscillator" : {
    "type" : "sine"
  } ,
  "envelope" : {
    "attack" : 0.01 ,
    "decay" : 0.01 ,
    "sustain" : 1 ,
    "release" : 0.5
  } ,
  "modulation" : {
    "type" : "square"
  } ,
  "modulationEnvelope" : {
    "attack" : 0.5 ,
    "decay" : 0 ,
    "sustain" : 1 ,
    "release ": 0.5
    }
}).toMaster();

var backgroundBassSynth = new Tone.DuoSynth({
vibratoAmount : 0.2 ,
vibratoRate : 3 ,
harmonicity : 0.5 ,
voice0 : {
volume : -18 ,
portamento : 0 ,
oscillator : {
type : "sine"
} ,
filterEnvelope : {
attack : 0.01 ,
decay : 0 ,
sustain : 1 ,
release : 0.5
} ,
envelope : {
attack : 0.01 ,
decay : 0 ,
sustain : 1 ,
release : 0.5
}
} ,
voice1 : {
volume : -20 ,
portamento : 0 ,
oscillator : {
type : "sine"
} ,
filterEnvelope : {
attack : 0.01 ,
decay : 0 ,
sustain : 1 ,
release : 0.5
} ,
envelope : {
attack : 0.01 ,
decay : 0 ,
sustain : 1 ,
release : 0.5
}
}
}).chain(bassReverb, bassSynthVolume, limit, Tone.Master);

const loopA = new Tone.Loop(time => {
	mast1synth.triggerAttackRelease("C2", "8n", time);
}, "4n");

const loop1 = new Tone.Loop(time => {
  synth.triggerAttackRelease(["Ab4", "Bb4", "C5", "F5"], "2n", time);
}, 20);

var changeChord2 = ["3", chord2];

const part1 = new Tone.Part(((time, note) => {
  chordSynth.triggerAttackRelease(note, "2n", time);
  currentChord = note;
  playerOsc.frequency.value = (currentChord[Math.floor(Math.random() * 3)]);
}), [[0, chord1], changeChord2, ["6", chord3]]);


const part2 = new Tone.Part(((time, note) => {
  synth2.triggerAttackRelease(note, "2n", time);
  currentChord2 = note;
  playerOsc.frequency.value = (currentChord[Math.floor(Math.random() * 3)]);
}), [[0, intensechord1], ["0.5", intensechord2], ["3.2", intensechord3], ["4.01", intensechord4]]);


const bassRandom = Math.floor(Math.random() * 2);
const bassPart1 = new Tone.Part(((time, note) => {
  backgroundBassSynth.triggerAttackRelease(note, 3, time);
}), [[0, backgroundChords2[0][Math.floor(Math.random() * 3)]], ["3", backgroundChords2[1][Math.floor(Math.random() * 3)]], ["6", backgroundChords2[2][Math.floor(Math.random() * 3)]]]);

bassPart1.loop = true;
bassPart1.loopEnd = "9.2";
part1.loop = true;
part1.loopEnd = "12";
part2.loop = true;
part2.loopEnd = "7";


playerNote = 220;

Tone.Master.volume.value = -20;
