function update() {
			
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
	game.physics.arcade.collide(bullets, layer);


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

	game.physics.arcade.overlap(bullets, momie, collideEgg, null, this);
	game.physics.arcade.overlap(bullets, momie2, collideEgg, null, this);
	game.physics.arcade.overlap(bullets, croco, collideEgg, null, this);
	game.physics.arcade.overlap(bullets, croco2, collideEgg, null, this);
	game.physics.arcade.overlap(bullets, scarabe, collideEgg, null, this);
	game.physics.arcade.overlap(bullets, layer, deleteEgg, null, this);

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
	    console.log("x :"+player.body.x+" , y: "+player.body.y);
	}
	else
	{
	    // Joueur s'arrête
	    player.animations.stop();
	    player.frame = 2;
	}

	// Permet au joueur de sauter s'il est sur une plate-forme
	if (cursors.up.isDown && player.body.onFloor())
	{
	    player.body.velocity.y = -500;
	    player.animations.play('jump');
	}

	if (cursors.down.isDown && bullets.total == 0)
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
			player.reset(2800, 510);
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

	if(scarabe.body.x < 2880){
	    
		scarabe.body.velocity.x = 50;
		scarabe.animations.play('right');
	}
	if(scarabe.body.x > 3090 && scarabe.body.x < 3200){
		scarabe.body.velocity.y = -400;
			scarabe.animations.play('jump');
	}
	if(scarabe.body.x > 3100){
		scarabe.body.velocity.y = 10;
			scarabe.animations.play('fly');
	}
	if(scarabe.body.x > 3290){
		scarabe.animations.play('right');
	}

}