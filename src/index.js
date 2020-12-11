import "./styles/index.scss";
import Track from "./scripts/track";
import Turntable from "./scripts/turntable";

const ac = new (window.AudioContext || window.webkitAudioContext)();

const turntable1 = new Turntable(ac, 1);
const turntable2 = new Turntable(ac, 2);
const turntables = [turntable1, turntable2];

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
  const label = document.createElement("div");
  label.classList.add("label");
  label.innerText = track.title;
  li.appendChild(label);
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

document.getElementById('track1').addEventListener('loadeddata', () => {
  turntable1.gainNode.gain.value = 1.0;
});

document.getElementById('track2').addEventListener('loadeddata', () => {
  turntable2.gainNode.gain.value = 0.0;
});

document.getElementById('crossfader').addEventListener('input', e => {
  const inputValue = e.currentTarget.value;
  turntable1.gainNode.gain.value = 1.0 - inputValue;
  turntable2.gainNode.gain.value = inputValue;
});

turntables.forEach(turntable => {
  turntable.speed.addEventListener('input', e => {
    turntable.changeSpeed(e.currentTarget.value);
  });
  turntable.ppButton.addEventListener('click', () => {
    turntable.playOrPause();
  });
  turntable.pan.addEventListener('input', e => {
    turntable.panNode.pan.value = e.currentTarget.value;
  })
})