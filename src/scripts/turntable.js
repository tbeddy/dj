export default class Turntable {
  constructor(ac, tracks, n) {
    this.tracks = tracks;
    this.ac = ac;
    this.rotateVar = `--track-${n}-speed`;
    this.rotateClass = `rotate${n}`;
    this.paused = true;
    this.speed = 1.0;
    this.currentTime = 0.0;
    this.ppButton = document.getElementById(`ppButton${n}`);
    this.recordImg = document.getElementById(`record-img${n}`);
    this.titleText = document.getElementById(`track-title${n}`);
    this.artistText = document.getElementById(`track-artist${n}`);
    this.trackArea = document.getElementById(`track-area${n}`);
    this.panNode = ac.createStereoPanner();
    this.gainNode = ac.createGain();
    this.gainNode.gain.value = n === 1 ? 1.0 : 0.0;

    this.beatAnalyserNode = ac.createAnalyser();
    this.filterNode = ac.createBiquadFilter();
    this.filterNode.type = "lowpass";
    this.filterNode.frequency.value = 100;
    this.beatAnalyserNode.fftSize = 2048;
    this.beatCanvas = document.getElementById(`beat-canvas${n}`);
    this.beatCtx = this.beatCanvas.getContext("2d");
    this.BEAT_WIDTH = this.beatCanvas.width;
    this.BEAT_HEIGHT = this.beatCanvas.height;
    this.sliceCount = 100;
    this.sliceWidth = this.BEAT_WIDTH * 1.0 / this.sliceCount;
    this.slices = Array(this.sliceCount).fill(0);

    this.volumeAnalyserNode = ac.createAnalyser();
    this.volumeAnalyserNode.fftSize = 256;
    this.volumeCanvas = document.getElementById(`volume-canvas${n}`);
    this.volumeCtx = this.volumeCanvas.getContext("2d");
    this.VOLUME_WIDTH = this.volumeCanvas.width;
    this.VOLUME_HEIGHT = this.volumeCanvas.height;
    this.bufferLength = this.volumeAnalyserNode.frequencyBinCount;

    this.beatDraw();
    this.volumeDraw();

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
      if (this.paused) {
        this.changeTrack(trackInfo);
      } else {
        document.querySelector('#error-modal').style.display = "block";
        document.querySelector('#modal-background').style.display = "block";
      }
    });
  }

  beatDraw() {
    requestAnimationFrame(this.beatDraw.bind(this));
    const dataArray = new Uint8Array(this.sliceCount);
    this.beatAnalyserNode.getByteTimeDomainData(dataArray);
    const newMax = Math.max(...dataArray) - 128;

    this.slices.pop();
    this.slices.unshift(newMax);
    this.beatCtx.fillStyle = 'black';
    this.beatCtx.beginPath();
    this.beatCtx.rect(0, 0, this.BEAT_WIDTH, this.BEAT_HEIGHT);
    this.beatCtx.fill();
    this.beatCtx.lineWidth = 1;
    this.beatCtx.strokeStyle = 'red';
    this.beatCtx.beginPath();
    let x = 0;

    this.slices.forEach((slice, idx) => {
      let y = this.BEAT_HEIGHT - slice;
      if (idx === 0) {
        this.beatCtx.moveTo(x, y);
      } else {
        this.beatCtx.lineTo(x, y);
      }
      x += this.sliceWidth;
    })
    this.beatCtx.lineTo(this.BEAT_WIDTH, this.BEAT_HEIGHT);
    this.beatCtx.stroke();
  }

  volumeDraw() {
    requestAnimationFrame(this.volumeDraw.bind(this));
    const dataArray = new Uint8Array(this.bufferLength);
    this.volumeAnalyserNode.getByteFrequencyData(dataArray);

    this.volumeCtx.fillStyle = 'black';
    this.volumeCtx.beginPath();
    this.volumeCtx.rect(0, 0, this.VOLUME_WIDTH, this.VOLUME_HEIGHT);
    this.volumeCtx.fill();
    const barWidth = (this.VOLUME_WIDTH / this.bufferLength) * 2.5;
    let x = 0;
    for (let slice of dataArray) {
      const barHeight = slice / 2;
      this.volumeCtx.fillStyle = `rgb(${barHeight + 100},50,50)`;
      this.volumeCtx.fillRect(x, this.VOLUME_HEIGHT - barHeight / 2, barWidth, barHeight);
      x += barWidth + 1;
    }
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
        this.currentTime = 0.0;
      });
  }

  reloadBuffer() {
    this.track = this.ac.createBufferSource();
    this.track.buffer = this.buffer;
    this.track
      .connect(this.gainNode)
      .connect(this.panNode)
      .connect(this.ac.destination);
    this.track
      .connect(this.filterNode)
      .connect(this.beatAnalyserNode);
    this.track
      .connect(this.gainNode)
      .connect(this.volumeAnalyserNode);
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
      this.track.start(this.ac.currentTime, this.currentTime);
      this.paused = false;
      this.startDate = new Date();
    } else {
      this.recordImg.classList.remove(this.rotateClass);
      this.track.stop();
      this.reloadBuffer();
      this.paused = true;
      this.currentTime += (new Date() - this.startDate) / 1000;
    }
  }
}