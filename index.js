var Brick = require("brick");
var CenteredCover = require("centered-cover-background");
var PlayfairDisplay = require("playfair-display");
var request = require("get-json");
var onKey = require("key-event");
var player = require("./player");
var loaded;

module.exports = Brick(CenteredCover, PlayfairDisplay, {
  update: update,
  loop: loop,
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

function loop (playing, next) {
  setTimeout(next, 5000);
}

function show (paradise) {
  CenteredCover.methods.show(paradise, 'https://farm3.staticflickr.com/2876/10973316604_a40772826c_o.jpg');
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
}
