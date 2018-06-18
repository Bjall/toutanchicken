// Variables globales
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
var scarabe_direction = 'right';

var weapon;
var seeds;
var graines;

var cursors;
var fireButton;

var health = 3;
var healthText;
var score = 0;
var scoreText;
var youWin;

var Game = function(game) {};

Game.prototype = {

  preload: function () {
    this.optionCount = 1;
  },

  create: function () {

    // ---------------------------
    //          MAP 
    // ---------------------------

    // On créé le background
    game.add.sprite(0, 0, 'background');

    // On créé la map (fichier JSON)
    map = game.add.tilemap('map');
    // Quel Tileset utiliser pour les blocs ?
    map.addTilesetImage('desert32');
    // Quel Layer (calque) utiliser ?
    layer = map.createLayer('Calque de Tile 1');
    // On fait tout rentrer dans le cadre 800x640
    layer.resizeWorld();
    // Détermine les tiles sur lesquelles le joueur entrera en collision. On a 16 tiles dans le décor.
    map.setCollisionBetween(1, 16);

    // ---------------------------
    //          POULET 
    // ---------------------------

    // Le joueur : Arg1 et Arg2 = coordonnées de départ ; Arg3 = nom de la spritesheet déclarée en preload
    player = game.add.sprite(40, 507, 'chicken');
    // On active le moteur physique sur le joueur
    game.physics.enable(player);
    // Les propriétés physiques du joueur. On paramètre ici le rebond, la gravité, etc.
    player.body.bounce.y = 0.1; // Rebond
    player.body.gravity.y = 300; // Poids (gravité du joueur)
    player.body.collideWorldBounds = false;;

    // La caméra suit le joueur
    game.camera.follow(player);

    // Animation du joueur, marche vers la droite ou la gauche, saute, etc.
    // player.animations.add(key, framesarray, fps, repeat);
    player.animations.add('right', [0, 1, 2, 3, 4, 5, 6, 7], 10, true);
    player.animations.add('left', [8, 9, 10, 11, 12, 13, 14, 15], 10, true)
    ;
    player.animations.add('jump', [0, 1, 2, 3, 4, 5, 6, 7], 10, true);

    // ---------------------------
    //           CROCO 
    // ---------------------------

    // Les crocodiles : Arg1 et Arg2 = coordonnées de départ ; Arg3 = nom de la spritesheet déclarée en preload
    croco = game.add.sprite(725, 510, 'croco');
    croco2 = game.add.sprite(3652, 507, 'croco');
    // On active le moteur physique sur les crocodiles
    game.physics.enable(croco);
    game.physics.enable(croco2);

    // Gravité du monde
    game.physics.arcade.gravity.y = 500;

    // Animation des crocodiles
    croco.animations.add('left', [8, 9, 10, 11, 12, 13, 14, 15], 10, true);
    croco.animations.add('right', [0, 1, 2, 3, 4, 5, 6, 7], 10, true);
    croco2.animations.add('left', [8, 9, 10, 11, 12, 13, 14, 15], 10, true);
    croco2.animations.add('right', [0, 1, 2, 3, 4, 5, 6, 7], 10, true);

    // ---------------------------
    //           MOMIE 
    // ---------------------------

    // The momie and its settings
    momie = game.add.sprite(2396, 347, 'momie');
    momie2 = game.add.sprite(5102, 251, 'momie');

    //  We need to enable physics on the momie
    game.physics.arcade.enable(momie);
    game.physics.arcade.enable(momie2);

    //  Player physics properties. Give the little guy a slight bounce.
    momie.body.bounce.y = 0.2;
    momie.body.gravity.y = 300;
    momie.body.collideWorldBounds = true;

    //  Our two animations, walking left and right.
    momie.animations.add('left', [8, 9, 10, 11, 12, 13, 14, 15], 10, true);
    momie.animations.add('right', [0, 1, 2, 3, 4, 5, 6, 7], 10, true);
    momie2.animations.add('left', [8, 9, 10, 11, 12, 13, 14, 15], 10, true);
    momie2.animations.add('right', [0, 1, 2, 3, 4, 5, 6, 7], 10, true);

    // ---------------------------
    //           SCARABE 
    // ---------------------------

    // The scarabe and its settings
    scarabe = game.add.sprite(2875, 264, 'scarabe');

    //  We need to enable physics on the scarabe
    game.physics.arcade.enable(scarabe);

    //  Player physics properties. Give the little guy a slight bounce.
    scarabe.body.bounce.y = 0.2;
    scarabe.body.gravity.y = 50;
    scarabe.body.collideWorldBounds = true;

    //  Our two animations, walking left and right.
    scarabe.animations.add('left', [7, 8, 9], 10, true);
    scarabe.animations.add('right', [0, 1, 2], 10, true);
    scarabe.animations.add('fly', [4, 5], 10, true);
    // scarabe.animations.add('jump', [3], 10, true);

    // ---------------------------
    //           BATS 
    // ---------------------------

    // The bats and its settings
    bats = game.add.sprite(4795, 350, 'bats');
    bats2 = game.add.sprite(5715, 220, 'bats');

    //  We need to enable physics on the bats
    game.physics.arcade.enable(bats);
    game.physics.arcade.enable(bats2);

    //  Player physics properties. Give the little guy a slight bounce.
    bats.body.collideWorldBounds = true;
    bats2.body.collideWorldBounds = true;

    //  Our two animations, walking left and right.
    bats.animations.add('left', [4, 5, 6, 7], 10, true);
    bats.animations.add('right', [0, 1, 2, 3], 10, true);
    bats2.animations.add('left', [4, 5, 6, 7], 10, true);
    bats2.animations.add('right', [0, 1, 2, 3], 10, true);

    // ---------------------------
    //           SCORPION 
    // ---------------------------

    // The scorpion and its settings
    scorpion = game.add.sprite(1010, 283, 'scorpion');
    scorpion2 = game.add.sprite(1781, 123, 'scorpion');

    //  We need to enable physics on the scorpion
    game.physics.arcade.enable(scorpion);
    game.physics.arcade.enable(scorpion2);

    //  Player physics properties. Give the little guy a slight bounce.
    scorpion.body.collideWorldBounds = true;
    scorpion2.body.collideWorldBounds = true;

    //  Our two animations, walking left and right.
    scorpion.animations.add('left', [4, 5, 6, 7], 10, true);
    scorpion.animations.add('right', [0, 1, 2, 3], 10, true);
    scorpion.animations.add('full', [0, 1, 2, 3, 4, 5, 6, 7], 8, true);
    scorpion2.animations.add('left', [4, 5, 6, 7], 10, true);
    scorpion2.animations.add('right', [0, 1, 2, 3], 10, true);
    scorpion2.animations.add('full', [0, 1, 2, 3, 4, 5, 6, 7], 8, true);

    // ---------------------------
    //           EGGS 
    // ---------------------------

    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;
    bullets.createMultiple(1, 'egg');
    bullets.setAll('anchor.x', 0.5);
    bullets.setAll('anchor.y', 0.5);
    bullets.setAll('checkWorldBounds', true);
    bullets.setAll('outOfBoundsKill', true);
    bullets.setAll('body.bounce.y', 0.3);

    // ---------------------------
    //           POUSSIN 
    // ---------------------------

    // The poussin and its settings
    poussin = game.add.sprite(6260, 443, 'poussin');

    //  We need to enable physics on the poussin
    game.physics.arcade.enable(poussin);

    //  Player physics properties. Give the little guy a slight bounce.
    poussin.body.collideWorldBounds = true;

    //  Our two animations, walking left and right.
    poussin.animations.add('move', [0,1], 7, true);
    // poussin.animations.add('jump', [3], 10, true);

    // ---------------------------
    //           SPHINX 
    // ---------------------------

    // The sphinx and its settings
    sphinx = game.add.sprite(4200, 300, 'sphinx');

    //  We need to enable physics on the sphinx
    game.physics.arcade.enable(sphinx);

    //  Player physics properties. Give the little guy a slight bounce.
    sphinx.body.bounce.y = 0.1;
    sphinx.body.collideWorldBounds = true;

    //  Our two animations, walking left and right.
    sphinx.animations.add('move', [0,1,2,3,4], 6, true);
    // sphinx.animations.add('jump', [3], 10, true);

    // ---------------------------
    //           GRAINES 
    // ---------------------------

    // Le groupe contenant les graines
    graines = game.add.group();
    // On active le moteur physique pour chaque graine du groupe
      graines.enableBody = true;

      // On créé 12 graines
    for (var i = 0; i < 12; i++)
    {
        // Créé une graine dans le groupe 'graines'
        var graine = graines.create(i * 70, 0, 'graine');
        // Active la gravité sur la graine (elle tombe au sol)
        graine.body.gravity.y = 300;
    }

    // On créé 1 tas de graines (super pouvoir à déterminer)
    seeds = game.add.group();
    seeds.enableBody = true;

    for (var j = 0; j < 2; j++)
    {
        var seed = seeds.create(j * 300, 0, 'seed');
        seed.body.gravity.y=300;
    }

    // ---------------------------
    //           AUTRES 
    // ---------------------------

    // Gestion du score
    scoreText = game.add.text(16, 16, 'score: 0 graines', { fontSize: '25px', fill: '#000' });

    // Les contrôles du joueur
    cursors = game.input.keyboard.createCursorKeys();

    // La santé du joueur
    healthText = game.add.text(600, 16, 'Health : 3 lifes', { fontsize: '32px', fill: 'red'});

    // Ecriture WIN
    youWin = game.add.bitmapText(6000, 200, 'carrier_command', 'You Win !', 34);
    youWin.visible = false;
    // youWin.fixedToCamera = true;
    youWin.anchor.x = 0.5;
    youWin.anchor.y = 0.5;

  },

  update: function () {
    // Le joueur entre en collision avec les plate-formes
    var hitPlatform = game.physics.arcade.collide(player, layer);
    // Idem entre les différents éléments du jeu
    game.physics.arcade.collide(graines, layer);
    game.physics.arcade.collide(seeds, layer);
    game.physics.arcade.collide(croco, layer);
    game.physics.arcade.collide(croco2, layer);
    game.physics.arcade.collide(momie, layer);
    game.physics.arcade.collide(momie2, layer);
    game.physics.arcade.collide(scarabe, layer);
    game.physics.arcade.collide(bats, layer);
    game.physics.arcade.collide(bats2, layer);
    game.physics.arcade.collide(scorpion, layer);
    game.physics.arcade.collide(scorpion2, layer);
    game.physics.arcade.collide(bullets, layer);
    game.physics.arcade.collide(poussin, layer);
    game.physics.arcade.collide(sphinx, layer);

    // On vérifie si le joueur mange une graine, si c'est le cas, on appelle la fonction collectGraine
    game.physics.arcade.overlap(player, graines, collectGraine, null, this);
    // Idem s'il mange un tas de graines
    game.physics.arcade.overlap(player, seeds, collectSeed, null, this);
    // On vérifie si le joueur touche un crocodile, si c'est le cas, on appelle la fonction collideCroco
    game.physics.arcade.overlap(player, croco, collideEnnemy, null, this);
    game.physics.arcade.overlap(player, croco2, collideEnnemy, null, this);
    game.physics.arcade.overlap(player, momie, collideEnnemy, null, this);
    game.physics.arcade.overlap(player, momie2, collideEnnemy, null, this);
    game.physics.arcade.overlap(player, scarabe, collideEnnemy, null, this);
    game.physics.arcade.overlap(player, bats, collideEnnemy, null, this);
    game.physics.arcade.overlap(player, bats2, collideEnnemy, null, this);
    game.physics.arcade.overlap(player, scorpion, collideEnnemy, null, this);
    game.physics.arcade.overlap(player, scorpion2, collideEnnemy, null, this);
    game.physics.arcade.overlap(player, sphinx, collideEnnemy, null, this);
    game.physics.arcade.overlap(bullets, momie, collideEgg, null, this);
    game.physics.arcade.overlap(bullets, momie2, collideEgg, null, this);
    game.physics.arcade.overlap(bullets, croco, collideEgg, null, this);
    game.physics.arcade.overlap(bullets, croco2, collideEgg, null, this);
    game.physics.arcade.overlap(bullets, scarabe, collideEgg, null, this);
    game.physics.arcade.overlap(bullets, bats, collideEgg, null, this);
    game.physics.arcade.overlap(bullets, bats2, collideEgg, null, this);
    game.physics.arcade.overlap(bullets, scorpion, collideEgg, null, this);
    game.physics.arcade.overlap(bullets, scorpion2, collideEgg, null, this);
    game.physics.arcade.overlap(bullets, layer, deleteEgg, null, this);
    game.physics.arcade.overlap(player, poussin, winLevel, null, this);

    // ---------------------------
    //       PLAYER MOVES
    // ---------------------------

    // On initialise la vitesse du joueur à 0
    player.body.velocity.x = 0;

    if (cursors.left.isDown)
    {
      // Déplacement à gauche (recule)
      player.body.velocity.x = -200;
      // Lance l'animantion 'left'
      player.animations.play('left');
    }
    else if (cursors.right.isDown)
    {
      // Déplacement à droite (avance)
      player.body.velocity.x = 200;
      player.animations.play('right');
    }
    else {
      // Joueur s'arrête
      if (cursors.left.timeUp > cursors.right.timeUp) {
        player.animations.stop();
        player.frame = 13;
      }
      else {
        player.animations.stop();
        player.frame = 2;
      }
    }

    // Permet au joueur de sauter s'il est sur une plate-forme
    if (cursors.up.isDown && player.body.onFloor())
    {
        player.body.velocity.y = -500;
        player.animations.play('jump');
    }

    if (cursors.down.isDown && bullets.total == 0 && player.alive == true)
    {
      fireBullet();
      oneEgg = true;
    }

    if (health == 0)
    {
      game.add.text(400, 300, 'YOU DIED', { fontsize: '300px', fill: 'GREEN'});
      //player.animations.stop()
    }

    if (player.y > game.world.height){
      player.kill();

      setTimeout(function(){
      game.state.restart();
      }, 750);
    }

    // ---------------------------
    //        CROCO MOVES
    // ---------------------------

      if(croco.body.x > 720){
          croco.animations.play('left');
          croco.body.velocity.x = -80;
      }
      if(croco.body.x < 400){
          croco.animations.play('right');
          croco.body.velocity.x = 80;
      }

      // CROCO 2

      if(croco2.body.x > 3880){
          croco2.animations.play('left');
          croco2.body.velocity.x = -80;
      }
      if(croco2.body.x < 3655){
          croco2.animations.play('right');
          croco2.body.velocity.x = 80;
      }

    // ---------------------------
    //        MOMIE MOVES
    // ---------------------------

      if(momie.body.x > 2760){
          momie.animations.play('left');
          momie.body.velocity.x = -50;
      }
      if(momie.body.x < 2400){
          momie.animations.play('right');
          momie.body.velocity.x = 50;
      }

      // MOMIE 2

      if(momie2.body.x > 5425){
          momie2.animations.play('left');
          momie2.body.velocity.x = -50;
      }
      if(momie2.body.x < 5105){
          momie2.animations.play('right');
          momie2.body.velocity.x = 50;
      }

    // ---------------------------
    //        SCARABE MOVES
    // ---------------------------

    // Demi-tour 
    if(scarabe.body.x < 2880){
          scarabe_direction = 'right';
        scarabe.body.velocity.x = 50;
        scarabe.animations.play('right');
      }

      // 1° Plateforme
      if(scarabe.body.x > 2880 && scarabe.body.x < 3110){
        if(scarabe_direction == 'right'){
          scarabe.body.velocity.x = 50;
          scarabe.animations.play('right');
        }
        else if(scarabe_direction == 'left'){
          scarabe.body.velocity.x = -50;
          scarabe.animations.play('left');
        }
      }

      // Vol
      if(scarabe.body.x > 3110){
          scarabe.animations.play('fly');
      }

      // 2° Plateforme
      if(scarabe.body.x > 3280 && scarabe.body.x < 3490){
        if(scarabe_direction == 'right'){
          scarabe.body.velocity.x = 50;
          scarabe.animations.play('right');
        }
        else if(scarabe_direction == 'left'){
          scarabe.body.velocity.x = -50;
          scarabe.animations.play('left');
        }
      }

      // Demi-tour
      if(scarabe.body.x > 3490){
        scarabe_direction = 'left';
        scarabe.body.velocity.x = -50;
        scarabe.animations.play('left');
      }

      // Reste à la même hauteur en vol
      if(scarabe.body.y > 264){
            scarabe.body.velocity.y = -30;
        }


    // ---------------------------
    //        BATS MOVES
    // ---------------------------

    // BATS 1
      if(bats.body.x < 4800){
          bats.animations.play("right");
          bats.body.velocity.x = 100;
      }
      if(bats.body.x > 5075){
          bats.animations.play("left");
          bats.body.velocity.x = -100;
      }

      // Ne descend pas trop
      if(bats.body.y > 370){
            bats.body.velocity.y = -60;
        }

        // BATS 1
      if(bats2.body.x < 5720){
          bats2.animations.play("right");
          bats2.body.velocity.x = 100;
      }
      if(bats2.body.x > 6070){
          bats2.animations.play("left");
          bats2.body.velocity.x = -100;
      }

      // Ne descend pas trop
      if(bats2.body.y > 220){
            bats2.body.velocity.y = -60;
        }


    // ---------------------------
    //        SCORPION MOVES
    // ---------------------------

      scorpion.animations.play('full');
      scorpion2.animations.play('full');


    // ---------------------------
    //        POUSSIN MOVES
    // ---------------------------

      poussin.animations.play('move');


    // ---------------------------
    //        SPHINX MOVES
    // ---------------------------

      sphinx.animations.play('move');

      if(sphinx.body.onFloor()){
        sphinx.body.velocity.y = -380;
      }
    
  },

  fireBullet: function () {

    //  To avoid them being allowed to fire too fast we set a time limit
    if (game.time.now > bulletTime)
    {
        //  Grab the first bullet we can from the pool
        bullet = bullets.getFirstExists(false);

        if (bullet)
        {
            //  And fire it
            bullet.reset(player.x +15, player.y +50);
            bullet.body.velocity.y = 400;
            bulletTime = game.time.now + 200;
        }
    }
  },


  collectGraine: function (player, graine) {
      
    // Removes the graine from the screen
    graine.kill();

    //  Add and update the score
    score += 1;
    scoreText.text = 'Score: ' + score + ' graines';
    /*health -= 1;
    healthText.text = 'Health : '+ health +' lifes';*/

  },

  collectSeed: function (player, seed) {
      seed.kill();
      score+=100;
      score.text = 'Score: ' + score + ' graines';
      /*health -= 1;
      healthText.text = 'Health : '+ health +' lifes';*/
  },

  collideEnnemy: function (player, ennemy){
    player.kill();

    setTimeout(function(){
      game.state.restart();
    }, 750);
    
    // score+=10;
    // health -= 1;
   //    healthText.text = 'Health : '+ health +' lifes';

  },

  collideEgg: function (ennemy, bullet){
    ennemy.kill();

    setTimeout(function(){
      bullet.kill();
    }, 1000);     
  },

  deleteEgg: function (bullet){
    if(oneEgg){
      setTimeout(function(){
        bullet.kill();
      }, 1000);
    }
    oneEgg = false;
    return oneEgg;  
  },

  winLevel: function (player, poussin){
    youWin.visible = true;
  }
};