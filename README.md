# DJ


This project implements a basic DJ setup where users transition between tracks (a.k.a. "mix" them).

[Live Link](https://tbeddy.github.io/dj/)

![site_image](../media/dj_demo.gif?raw=true)

## Features

- Users can manually change the tempo of a track to match the track it is being mixed with.
- Tracks are represented by a revolving turntable.

## Technology

The project is implemented in vanilla JavaScript, HTML, and SCSS. The core features are built with the WebAudio API.

## Challenges

I expected the audio functionality to be the most difficult part of my work, but that ended up being the styling. One particularly tricky task was making the records' rotation speed change with the playback speed. I ended up using two CSS variables to keep track of the turntables' speeds and using them to change the duration of CSS's native animation function.

```
JS:
changeSpeed(newSpeed) {
  this.audio.playbackRate = newSpeed;
  document.documentElement
    .style.setProperty(this.rotateVar, `${1 / newSpeed}s`);
}

CSS:
.rotate1 {
  animation: rotation var(--track-1-speed) infinite linear;
}
```