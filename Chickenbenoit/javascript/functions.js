function fireBullet () {

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
}


function collectGraine (player, graine) {
	    
    // Removes the graine from the screen
    graine.kill();

    //  Add and update the score
    score += 1;
    scoreText.text = 'Score: ' + score + ' graines';
    /*health -= 1;
    healthText.text = 'Health : '+ health +' lifes';*/


}

function collectSeed (player, seed) {
    seed.kill();
    score+=100;
    score.text = 'Score: ' + score + ' graines';
    /*health -= 1;
    healthText.text = 'Health : '+ health +' lifes';*/
}

function collideEnnemy (player, ennemy){
	player.kill();

	setTimeout(function(){
		player.reset(2800, 510);
	}, 750);
	
	// score+=10;
	// health -= 1;
 //    healthText.text = 'Health : '+ health +' lifes';

}

function collideEgg (ennemy, bullet){
	ennemy.kill();

	setTimeout(function(){
		bullet.kill();
	}, 1000);			
}

function deleteEgg (bullet){
	if(oneEgg){
		setTimeout(function(){
			bullet.kill();
		}, 1000);
	}
	oneEgg = false;
	return oneEgg;	
}