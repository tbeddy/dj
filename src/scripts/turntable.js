export default class Turntable {
  constructor(ac, n) {
    this.rotateVar = `--track-${n}-speed`;
    this.rotateClass = `rotate${n}`;
    this.speed = document.getElementById(`speed${n}`);
    this.track = ac.createMediaElementSource(document.getElementById(`track${n}`));
    this.audio = this.track.mediaElement;
    this.gainNode = ac.createGain();
    this.pan = document.getElementById(`pan${n}`);
    this.panNode = ac.createStereoPanner();
    this.ppButton = document.getElementById(`ppButton${n}`);

    this.track
      .connect(this.gainNode)
      .connect(this.panNode)
      .connect(ac.destination);
  }

  changeSpeed(newSpeed) {
    this.audio.playbackRate = newSpeed;
    document.documentElement
      .style.setProperty(this.rotateVar, `${1 / newSpeed}s`);
  }

  playOrPause() {
    const record_img = this.audio.parentElement.querySelector('.record-img');
    if (this.audio.paused) {
      record_img.classList.add(this.rotateClass);
      this.audio.play();
    } else {
      record_img.classList.remove(this.rotateClass);
      this.audio.pause();
    }
  }
}