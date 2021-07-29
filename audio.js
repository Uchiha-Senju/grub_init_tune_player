var context = null, oscillator = null;

function startAudio() {
  context = new AudioContext();
  oscillator = context.createOscillator();
  oscillator.connect(context.destination);
  
  oscillator.frequency.value = 0;
};

// First entry is tempo, all others are tone-duartion pairs
//   Tempo - No. of notes per minute
//           Hence, 60 - one note per second, 300 - 5 notes per second, etc
//   Tone - Frequency of sound in hertz
//   Duration - Length of note defined by time unit set by the tempo
var grub_init_tune = "7680 784 32 1047 16 0 16 1047 32 1175 32 1319 32 1568 32 0 32 1568 32 1760 32 1760 32 2093 32 1760 32 1568 128 1760 32 1760 32 2093 32 1760 32 1568 16 0 16 1568 16 0 16 1319 64 1175 32 1047 32 1175 32 1319 32 1175 128";
var tone_list = grub_init_tune.split(' ');
for (var k in tone_list) {
  k = parseInt(k);
};

var melodies = [[7, 2000, 400, 4, 0, 1, 500, 4, 0, 1, 600, 4, 0, 1, 800, 6],
[5, 220, 900, 2, 1000, 2, 800, 2, 400, 2, 600, 3],
[11, 300, 369, 2, 329, 2, 82, 1, 0, 2, 82, 1, 92, 1, 98, 1, 0, 1, 130, 1, 0, 1, 123, 7],
[35, 480, 420, 1, 400, 1, 420, 1, 400, 1, 420, 1, 315, 1, 370, 1, 335, 1, 282, 3, 180, 1, 215, 1, 282, 1, 315, 3, 213, 1, 262, 1, 315, 1, 335, 3, 213, 1, 420, 1, 400, 1, 420, 1, 400, 1, 420, 1, 315, 1, 370, 1, 335, 1, 282, 3, 180, 1, 215, 1, 282, 1, 315, 3, 213, 1, 330, 1, 315, 1, 282, 3],
[28, 7680, 784, 32, 1047, 16, 0, 16, 1047, 32, 1175, 32, 1319, 32, 1568, 32, 0, 32, 1568, 32, 1760, 32, 1760, 32, 2093, 32, 1760, 32, 1568, 128, 1760, 32, 1760, 32, 2093, 32, 1760, 32, 1568, 16, 0, 16, 1568, 16, 0, 16, 1319, 64, 1175, 32, 1047, 32, 1175, 32, 1319, 32, 1175, 128],
[25, 1750, 523, 1, 392, 1, 523, 1, 659, 1, 784, 1, 1047, 1, 784, 1, 415, 1, 523, 1, 622, 1, 831, 1, 622, 1, 831, 1, 1046, 1, 1244, 1, 1661, 1, 1244, 1, 466, 1, 587, 1, 698, 1, 932, 1, 1195, 1, 1397, 1, 1865, 1, 1397, 1],
[11, 1000, 334, 1, 334, 1, 0, 1, 334, 1, 0, 1, 261, 1, 334, 1, 0, 1, 392, 2, 0, 4, 196, 2],
[6, 12288, 659, 64, 659, 64, 587, 32, 659, 64, 784, 64, 659, 64],
[4, 600, 294, 5, 277, 2, 330, 4, 294, 5],
[7, 288, 880, 1, 0, 1, 880, 1, 0, 1, 880, 1, 698, 1, 1046, 1],
[14, 300, 466, 3, 554, 1, 523, 1, 622, 1, 415, 1, 369, 1, 349, 4, 466, 3, 554, 1, 523, 1, 622, 1, 830, 1, 739, 1, 698, 4],
[8, 400, 523, 2, 392, 1, 392, 1, 440, 2, 392, 2, 1, 2, 494, 2, 523, 2],
[18, 480, 440, 4, 440, 4, 440, 4, 349, 3, 523, 1, 440, 4, 349, 3, 523, 1, 440, 8, 659, 4, 659, 4, 659, 4, 698, 3, 523, 1, 415, 4, 349, 3, 523, 1, 440, 8],
[7, 300, 294, 1, 294, 1, 440, 1, 440, 1, 494, 1, 494, 1, 440, 2],
[13, 300, 147, 2, 130, 1, 123, 1, 110, 1, 440, 1, 440, 1, 82, 1, 98, 1, 392, 1, 392, 1, 123, 1, 110, 1, 440, 1],
[2, 480, 450, 2, 250, 2]];

function setTune(init_tune) {
  grub_init_tune = init_tune;
  tone_list = grub_init_tune.split(' ');
  for (var k in tone_list) {
    k = parseInt(k);
  };
};

async function playTune(tone_list) {
  
  startAudio();
  
  // Start with sine wave
  oscillator.start(0);
  
  for (var i = 1; i < tone_list.length; i+=2) {
    // Set frequency
    oscillator.frequency.value = tone_list[i];
    // Wait for some time
    await new Promise(resolve => setTimeout(resolve, (1000 * 60 * tone_list[i+1] / tone_list[0])) );
    // Give a little pause between notes
    oscillator.frequency.value = 0;
    await new Promise(resolve => setTimeout(resolve, 1) );
  };
  
  
  // Stop
  oscillator.stop();
};

async function playAll(melodies) {
  
  for (var i = 0 ; i < melodies.length; ++i) {
    await playTune(melodies[i].slice(1));
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  
}

// playTune(tone_list);