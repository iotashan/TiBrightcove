var brightcove = require('com.appersonlabs.brightcove');


var catalog = brightcove.createCatalog({
  token: 'RNj-yS616_T1GQ4znMqS3ut3ijXuGrG69w3oYJBMVahURwi7P4ZH4Q..',
});

var player = brightcove.createPlayerView({
  top: 20,
  left: 20,
  width: 200,
  height: 200,
});

var playButton = Ti.UI.createButton({
  systemButton: Ti.UI.iPhone.SystemButton.PLAY,
});
playButton.addEventListener('click', function(e) {
  player.play();
});

var pauseButton = Ti.UI.createButton({
  systemButton: Ti.UI.iPhone.SystemButton.PAUSE,
});
pauseButton.addEventListener('click', function(e) {
  player.pause();
});

var advanceButton = Ti.UI.createButton({
  systemButton: Ti.UI.iPhone.SystemButton.FAST_FORWARD,
});
advanceButton.addEventListener('click', function(e) {
  player.advanceToNext();
});

var toolbar = Ti.UI.iOS.createToolbar({
  items: [playButton, pauseButton, advanceButton],
  bottom: 0,
  borderTop: true,
  borderBottom: false,
});

var videoButton = Ti.UI.createButton({
  bottom: 48,
  title: 'Load Video',
});
videoButton.addEventListener('click', function() {
  catalog.findVideo('3873079666001', function(e) {
    if (e.success) {
      player.video = e.result;
      Ti.API.info("set video");
    }
    else {
      Ti.API.error(e.error);
    }
  })
});

var win = Ti.UI.createWindow({
	backgroundColor:'white'
});

win.add(player);
win.add(toolbar);
win.add(videoButton);

win.addEventListener('open', function(e) {
  catalog.findPlaylist('3868842075001', function(e) {
    if (e.success) {
      player.playlist = e.result;
      Ti.API.info("set playlist");
    }
    else {
      Ti.API.error(e.error);
    }
  })
});

win.open();
