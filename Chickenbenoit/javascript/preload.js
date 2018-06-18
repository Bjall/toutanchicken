var game = new Phaser.Game(800, 640, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {

	game.load.tilemap('map', 'assets/tilemaps/maps/test.json', null, Phaser.Tilemap.TILED_JSON);
	game.load.image('desert32', 'assets/tilemaps/tiles/desert32.png');
    game.load.spritesheet('chicken', 'assets/chicken.png', 54, 69);
    game.load.image('background', 'assets/background.png');
    game.load.image('graine', 'assets/granou.png');
    game.load.image('seed', 'assets/seedtrue.png');
    game.load.spritesheet('croco', 'assets/croco.png', 69, 72);
	game.load.spritesheet('momie', 'assets/momie.png', 66, 72);		
	game.load.spritesheet('scarabe', 'assets/scarabe.png', 43, 24);	
	game.load.image('egg', 'assets/egg.png', 30, 31);	
}

var map;
var layer;
var cursors;
var player;
var croco;
var croco2;
var momie;
var scarabe;
var bulletTime = 0;
var oneEgg = false;


var weapon;
var seeds;
var graines;

var cursors;
var fireButton;


var health = 3;
var healthText;
var score = 0;
var scoreText;