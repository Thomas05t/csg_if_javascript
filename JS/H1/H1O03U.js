function setup() {
  let audioEl = createVideo('intro.mp4');
  audioEl.showControls();
  audioEl.onended(sayDone);
}

function sayDone(elt) {
  alert('done playing ' + elt.src);
}