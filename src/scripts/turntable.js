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
    this.analyserNode = ac.createAnalyser();
    this.filterNode = ac.createBiquadFilter();
    
    this.track
      .connect(this.gainNode)
      .connect(this.panNode)
      .connect(ac.destination);
    
    this.track
      .connect(this.filterNode)
      .connect(this.analyserNode);

    this.filterNode.type = "lowpass";
    this.filterNode.frequency.value = 100;
    this.analyserNode.fftSize = 2048;
    
    this.canvas = document.getElementById(`beat-canvas${n}`);
    this.ctx = this.canvas.getContext("2d");
    this.WIDTH = this.canvas.width;
    this.HEIGHT = this.canvas.height;
    
    this.sliceCount = 100;
    this.sliceWidth = this.WIDTH * 1.0 / this.sliceCount;
    this.slices = Array(this.sliceCount).fill(0);
  }

  draw() {
    requestAnimationFrame(this.draw.bind(this));
    const dataArray = new Uint8Array(this.sliceCount);
    this.analyserNode.getByteTimeDomainData(dataArray);
    const newMax = Math.max(...dataArray) - 128;

    this.slices.pop();
    this.slices.unshift(newMax);

    this.ctx.fillStyle = 'black';
    this.ctx.beginPath();
    this.ctx.rect(0, 0, this.WIDTH, this.HEIGHT);
    this.ctx.fill()
    this.ctx.lineWidth = 1;
    this.ctx.strokeStyle = 'red';
    this.ctx.beginPath();
    let x = 0;
    
    this.slices.forEach((slice, idx) => {
      let y = this.HEIGHT - slice;
      if (idx === 0) {
        this.ctx.moveTo(x, y);
      } else {
        this.ctx.lineTo(x, y);
      }
      x += this.sliceWidth;
    })
    this.ctx.lineTo(this.WIDTH, this.HEIGHT);
    this.ctx.stroke();
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