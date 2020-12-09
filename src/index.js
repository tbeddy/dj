import "./styles/index.scss";
import Track from "./scripts/track";

const trackList = require("./tracks.json");

const tracks = trackList.map(trackInfo => {
  const { title, artist, url } = trackInfo;
  return new Track(title, artist, url);
});

const trackBank = document.getElementById("track-bank");
const ul = document.createElement("ul");
tracks.forEach((track, idx) => {
  const li = document.createElement("li");
  li.classList.add("track-listing");
  li.setAttribute("draggable", "true");
  li.setAttribute("id", idx);
  const text = document.createTextNode(track.title);
  li.appendChild(text);
  ul.appendChild(li);
});
trackBank.appendChild(ul);

document.querySelectorAll(".track-listing").forEach(el => {
  const blank_record = new Image();
  blank_record.src = "./src/images/record_sleeve.png";
  el.addEventListener('dragstart', e => {
    e.dataTransfer.setData("text/plain", el.id);
    e.dataTransfer.setDragImage(blank_record, 150, 150);
  })
});

document.querySelectorAll(".track-area").forEach(el => {
  el.addEventListener('dragover', e => {
    e.preventDefault();
  });
  el.addEventListener('drop', e => {
    const trackInfo = tracks[e.dataTransfer.getData("text")];
    const audio = el.querySelector("audio");
    const title = el.querySelector(".track-title");
    const artist = el.querySelector(".track-artist");
    const ppButton = el.querySelector("button");
    audio.src = trackInfo.url;
    title.innerHTML = trackInfo.title;
    artist.innerHTML = trackInfo.artist;
    ppButton.removeAttribute("disabled");
  });
});

document.getElementsByClassName('main-area')[0].addEventListener('mouseover', () => {
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

document.getElementById('track1').addEventListener('loadeddata', () => {
  gainNode1.gain.value = 1.0;
});

document.getElementById('track2').addEventListener('loadeddata', () => {
  gainNode2.gain.value = 0.0;
});

const gainNode1 = ac.createGain();
const gainNode2 = ac.createGain();

const panNode1 = ac.createStereoPanner();
const panNode2 = ac.createStereoPanner();

track1.connect(gainNode1).connect(panNode1).connect(ac.destination);
track2.connect(gainNode2).connect(panNode2).connect(ac.destination);

const crossfader = document.getElementById("crossfader");

crossfader.addEventListener("input", e => {
  const inputValue = e.currentTarget.value;
  gainNode1.gain.value = 1.0 - inputValue;
  gainNode2.gain.value = inputValue;
});

const speed1 = document.getElementById("speed1");
const speed2 = document.getElementById("speed2");

speed1.addEventListener("input", e => {
  changeSpeed(1, e.currentTarget.value);
});

speed2.addEventListener("input", e => {
  changeSpeed(2, e.currentTarget.value);
});

const pan1 = document.getElementById("pan1");
const pan2 = document.getElementById("pan2");

pan1.addEventListener("input", e => {
  panNode1.pan.value = e.currentTarget.value;
})

pan2.addEventListener("input", e => {
  panNode2.pan.value = e.currentTarget.value;
})

const changeSpeed = (n, speed) => {
  const audio = n === 1 ? track1.mediaElement : track2.mediaElement;
  audio.playbackRate = speed;
}

const playOrPause = (n) => {
  const ppButton = document.getElementById(`ppButton${n}`);
  const audio = n === 1 ? track1.mediaElement : track2.mediaElement;
  const record_img = audio.parentElement.querySelector('.record-img');
  if (audio.paused) {
    ppButton.innerHTML = "pause";
    record_img.classList.add("rotate");
    audio.play();
  } else {
    ppButton.innerHTML = "play";
    record_img.classList.remove("rotate");
    audio.pause();
  }
};