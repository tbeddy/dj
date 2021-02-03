export default class Turntable {
  constructor(ac, n) {
    this.ac = ac;
    this.rotateVar = `--track-${n}-speed`;
    this.rotateClass = `rotate${n}`;
    this.paused = true;
    this.speedVal = 1.0;
    this.speedInput = document.getElementById(`speed${n}`);
    this.pan = document.getElementById(`pan${n}`);
    this.ppButton = document.getElementById(`ppButton${n}`);
    this.recordImg = document.getElementById(`record-img${n}`);
    this.panNode = ac.createStereoPanner();
    this.gainNode = ac.createGain();

    document.getElementById(`speed${n}`).addEventListener('input', e => {
      this.changeSpeed(e.currentTarget.value);
    });
    document.getElementById(`pan${n}`).addEventListener('input', e => {
      this.panNode.pan.value = e.currentTarget.value;
    })
    this.ppButton.addEventListener('click', () => {
      this.playOrPause();
    });
  }

  changeTrack(url) {
    if (this.track) this.track.stop();
    this.ppButton.setAttribute("disabled", true);
    const myRequest = new Request(url);
    fetch(myRequest)
      .then(response => response.arrayBuffer())
      .then(buffer => {
        this.ac.decodeAudioData(buffer, decodedBuffer => {
          this.buffer = decodedBuffer;
          this.reloadBuffer();
          this.ppButton.removeAttribute("disabled");
        });
      });
  }

  reloadBuffer() {
    this.track = this.ac.createBufferSource();
    this.track.buffer = this.buffer;
    this.track
      .connect(this.gainNode)
      .connect(this.panNode)
      .connect(this.ac.destination);
    this.changeSpeed(this.speedVal);
  }

  changeSpeed(newSpeed) {
    this.speedVal = newSpeed;
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