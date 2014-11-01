var Brick = require("brick");
var CenteredCover = require("centered-cover-background");
var PlayfairDisplay = require("playfair-display");
var request = require("get-json");
var onKey = require("key-event");
var player = require("./player");
var loaded;

module.exports = Brick(CenteredCover, PlayfairDisplay, {
  update: update,
  show: show,
  ready: ready
});

function update (paradise, done) {
  request('http://api.listenparadise.org', function (error, response) {
    if (error) throw error;
    paradise.songs = response.result;
    done();
  });
}

function show (paradise) {
  CenteredCover.methods.show(paradise, 'https://farm4.staticflickr.com/3896/14215383097_83c5cd4780_o.jpg');
  paradise.brick.bind('ul li', paradise.songs.map(function (song) {
    return { ':first': { _html: song } };
  }));

  paradise.brick.bind('.songs', {
    'class': loaded ? 'songs' : 'songs loading'
  });

  paradise.brick.bind('.cover-content', paradise.brick.template('songs'));
}

function ready (paradise) {
  loaded = true;
  paradise.brick.select('.songs').removeClass('loading');
  player.start();
  onKey(window, 'space', player.toggle);

  setInterval(paradise.brick.refresh, 3000);
}
