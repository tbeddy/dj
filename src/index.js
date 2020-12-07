import "./styles/index.scss";

document.querySelector('button').addEventListener('click', () => {
  if (ac.state === 'suspended') ac.resume();
});

document.getElementById('ppButton1').addEventListener('click', () => {
  playOrPause(1);
});

document.getElementById('ppButton2').addEventListener('click', () => {
  playOrPause(2);
});

const ac = new (window.AudioContext || window.webkitAudioContext)();
const track1 = ac.createMediaElementSource(document.getElementById("track1"));
const track2 = ac.createMediaElementSource(document.getElementById("track2"));

const gainNode1 = ac.createGain();
const gainNode2 = ac.createGain();

track1.connect(gainNode1).connect(ac.destination);
track2.connect(gainNode2).connect(ac.destination);

const crossfader = document.getElementById("crossfader");

crossfader.addEventListener("input", e => {
  const inputValue = e.currentTarget.value;
  gainNode1.gain.value = 1.0 - inputValue;
  gainNode2.gain.value = inputValue;
  console.log(inputValue);
});

const playOrPause = (n) => {
  const ppButton = document.getElementById(`ppButton${n}`);
  const audio = n === 1 ? track1.mediaElement : track2.mediaElement;
  if (audio.paused) {
    audio.play();
    ppButton.innerHTML = "pause";
  } else {
    audio.pause();
    ppButton.innerHTML = "play";
  }
};