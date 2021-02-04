export default class Turntable {
  constructor(ac, tracks, n) {
    this.tracks = tracks;
    this.ac = ac;
    this.rotateVar = `--track-${n}-speed`;
    this.rotateClass = `rotate${n}`;
    this.paused = true;
    this.speed = 1.0;
    this.ppButton = document.getElementById(`ppButton${n}`);
    this.recordImg = document.getElementById(`record-img${n}`);
    this.titleText = document.getElementById(`track-title${n}`);
    this.artistText = document.getElementById(`track-artist${n}`);
    this.trackArea = document.getElementById(`track-area${n}`);
    this.panNode = ac.createStereoPanner();
    this.gainNode = ac.createGain();
    this.gainNode.gain.value = n === 1 ? 1.0 : 0.0;

    document.getElementById(`speed${n}`).addEventListener('input', e => {
      this.changeSpeed(e.currentTarget.value);
    });
    document.getElementById(`pan${n}`).addEventListener('input', e => {
      this.panNode.pan.value = e.currentTarget.value;
    })
    this.ppButton.addEventListener('click', () => {
      this.playOrPause();
    });
    this.trackArea.addEventListener('dragover', e => {
      e.preventDefault();
    });
    this.trackArea.addEventListener('drop', e => {
      e.preventDefault();
      const trackInfo = this.tracks[e.dataTransfer.getData("text")];
      this.changeTrack(trackInfo);
    });
  }

  changeTrack(trackInfo) {
    this.ppButton.setAttribute("disabled", true);
    this.titleText.innerHTML = "Loading";
    this.artistText.innerHTML = "";
    const myRequest = new Request(trackInfo.url);
    fetch(myRequest)
      .then(response => response.arrayBuffer())
      .then(buffer => this.ac.decodeAudioData(buffer))
      .then(decodedBuffer => {
        this.buffer = decodedBuffer;
        this.reloadBuffer();
        this.ppButton.removeAttribute("disabled");
        this.titleText.innerHTML = trackInfo.title;
        this.artistText.innerHTML = trackInfo.artist;
      });
  }

  reloadBuffer() {
    this.track = this.ac.createBufferSource();
    this.track.buffer = this.buffer;
    this.track
      .connect(this.gainNode)
      .connect(this.panNode)
      .connect(this.ac.destination);
    this.changeSpeed(this.speed);
  }

  changeSpeed(newSpeed) {
    this.speed = newSpeed;
    this.track.playbackRate.value = newSpeed;
    document.documentElement
      .style.setProperty(this.rotateVar, `${1 / newSpeed}s`);
  }

  playOrPause() {
    if (this.paused) {
      this.recordImg.classList.add(this.rotateClass);
      this.track.start();
      this.paused = false;
    } else {
      this.recordImg.classList.remove(this.rotateClass);
      this.track.stop();
      this.reloadBuffer();
      this.paused = true;
    }
  }
}