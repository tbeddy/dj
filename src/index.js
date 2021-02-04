import "./styles/index.scss";
import Track from "./scripts/track";
import Turntable from "./scripts/turntable";
const trackList = require("./tracks.json");

document.addEventListener("DOMContentLoaded", () => {
  const ac = new (window.AudioContext || window.webkitAudioContext)();
  
  const turntable1 = new Turntable(ac, 1);
  const turntable2 = new Turntable(ac, 2);
  
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
      e.preventDefault();
      const trackInfo = tracks[e.dataTransfer.getData("text")];
      if ("1" === el.id.match(/track-area(\d)/)[1]) {
        turntable1.changeTrack(trackInfo);
      } else {
        turntable2.changeTrack(trackInfo);
      }
    });
  });
  
  document.querySelectorAll('button').forEach(el => {
    el.addEventListener('click', () => {
      if (ac.state === 'suspended') ac.resume();
    });
  })

  turntable1.gainNode.gain.value = 1.0;
  turntable2.gainNode.gain.value = 0.0;
  
  document.getElementById('crossfader').addEventListener('input', e => {
    const inputValue = e.currentTarget.value;
    turntable1.gainNode.gain.value = 1.0 - inputValue;
    turntable2.gainNode.gain.value = inputValue;
  });

  document.querySelector('#about-modal-button').addEventListener('click', () => {
    document.querySelector('#about-modal').style.display = "block";
    document.querySelector('#modal-background').style.display = "block";
  });

  document.querySelector('#instructions-modal-button').addEventListener('click', () => {
    document.querySelector('#instructions-modal').style.display = "block";
    document.querySelector('#modal-background').style.display = "block";
  });

  window.onclick = e => {
    const el = e.target;
    if (el === document.getElementById("modal-background")) {
      el.style.display = "none";
      el.querySelectorAll(".modal").forEach(modal => {
        modal.style.display = "none";
      });
    }
  }
});