var playAudio = require("play-audio");
var player;
var playing;

var urls = [
  { url: 'http://stream-tx4.radioparadise.com/mp3-192', type: 'mp3' },
  { url: 'http://stream-tx4.radioparadise.com/ogg-192', type: 'ogg' },
  { url: 'http://stream-dc1.radioparadise.com/aac-128', type: 'aac' }
];

module.exports = {
  start: play,
  play: play,
  stop: stop,
  toggle: toggle
};

function toggle () {
  if (playing) stop();
  else play();
}

function play () {
  if (playing) return;

  playing = true;

  player = playAudio(urls).autoplay().play();

  if (/iPhone/.test(navigator.userAgent)) {
    player.controls();
  }
}

function stop () {
  if (!playing) return;

  playing = false;

  player.element().parentNode.removeChild(player.element());
  player = undefined;
}
