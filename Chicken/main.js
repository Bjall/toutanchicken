var
  game = new Phaser.Game(800, 600, Phaser.AUTO, 'game'),
  Main = function () {},
  gameOptions = {
    playSound: true,
    playMusic: true
  },
  musicPlayer;

Main.prototype = {

  preload: function () {
    game.load.image('sky', 'assets/images/sky.png');
    game.load.image('loading', 'assets/images/loading.png');
    game.load.image('brand', 'assets/images/logo.png');
    game.load.script('polyfill', 'lib/polyfill.js');
    game.load.script('utils', 'lib/utils.js');
    game.load.script('splash', 'states/Splash.js');
    game.load.tilemap('map', 'assets/tilemaps/maps/test.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('desert32', 'assets/tilemaps/tiles/desert32.png');
    game.load.spritesheet('chicken', 'assets/images/chicken.png', 54, 69);
    game.load.spritesheet('poussin', 'assets/images/poussin.png', 18, 22);
    game.load.image('background', 'assets/images/background.png');
    game.load.image('graine', 'assets/images/granou.png');
    game.load.image('seed', 'assets/images/seedtrue.png');
    game.load.spritesheet('croco', 'assets/images/croco.png', 69, 72);
    game.load.spritesheet('momie', 'assets/images/momie.png', 66, 72);   
    game.load.spritesheet('scarabe', 'assets/images/scarabe.png', 43, 24); 
    game.load.spritesheet('bats', 'assets/images/bats.png', 52, 56);
    game.load.spritesheet('scorpion', 'assets/images/scorpion.png', 60, 41);
    game.load.spritesheet('sphinx', 'assets/images/sphinx.png', 112, 128); 
    game.load.image('egg', 'assets/images/egg.png', 30, 31); 
    game.load.bitmapFont('carrier_command', 'assets/font/carrier_command.png', 'assets/font/carrier_command.xml');
  },

  create: function () {
    game.state.add('Splash', Splash);
    game.state.start('Splash');
  }

};

game.state.add('Main', Main);
game.state.start('Main');