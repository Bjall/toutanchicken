function create() {

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
	player = game.add.sprite(5100, 510, 'chicken');
    // On active le moteur physique sur le joueur
	game.physics.enable(player);
	// Les propriétés physiques du joueur. On paramètre ici le rebond, la gravité, etc.
    player.body.bounce.y = 0.1; // Rebond
    player.body.gravity.y = 300; // Poids (gravité du joueur)
    player.body.collideWorldBounds = false;
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
    scarabe = game.add.sprite(2876, 264, 'scarabe');

    //  We need to enable physics on the scarabe
    game.physics.arcade.enable(scarabe);

    //  Player physics properties. Give the little guy a slight bounce.
    scarabe.body.bounce.y = 0.2;
    scarabe.body.gravity.y = 300;
    scarabe.body.collideWorldBounds = true;

    //  Our two animations, walking left and right.
    scarabe.animations.add('left', [7, 8, 9], 10, true);
    scarabe.animations.add('right', [0, 1, 2], 10, true);
    scarabe.animations.add('fly', [4, 5], 10, true);
    scarabe.animations.add('jump', [3], 10, true);


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

    // Gestion du score
    scoreText = game.add.text(16, 16, 'score: 0 graines', { fontSize: '25px', fill: '#000' });

    // Les contrôles du joueur
    cursors = game.input.keyboard.createCursorKeys();

    // La santé du joueur
	healthText = game.add.text(600, 16, 'Health : 3 lifes', { fontsize: '32px', fill: 'red'});
}