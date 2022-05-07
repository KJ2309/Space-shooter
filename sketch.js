var gameState = 0;
var player, enemy = [];
var playerBullet, enemyBullet;
var randNum;
var playerBulletGroup, enemyBulletGroup, enemyGroup;
var score;
function preload(){}

function setup() {
	createCanvas(1000, 700);
	player = createSprite(width/2,650,50,50);
 	playerBulletGroup = createGroup();
  enemyBulletGroup = createGroup()
  enemyGroup = createGroup();
}

function draw() {
  background("black");
  randNum = Math.round(random(25,50))
  //-------------------------------------------------//
  //Game has not started
  
  if (gameState == 0){
    player.visible = false;
    textSize(130);
    text("Space Shooter", 75, 250);
    textSize(25);
    text("Press enter to start",400,600);
  }
  
  if (keyWentDown("enter")){
    text.visible = false;
    gameState = 1;
  }
  
  //-------------------------------------------------//
  //Game has started
  
  if (gameState == 1){
    player.visible = true;
    textSize(30)
    text("Score:" + score,15,950)
    //Enemy spawning
    if(frameCount%45==0){
      enemy = createSprite(Math.round(random(100,900)),-50,45,45);
      enemy.velocityY = 6
      enemyGroup.add(enemy);

      if(frameCount%2==0){
          enemyBullet = createSprite(enemy.x,enemy.y,5,15);
          enemyBullet.velocityY = 20;
          enemyBulletGroup.add(enemyBullet);
      }
      }
  
    
    //Movement of player
    
    if(keyDown("left")){
      player.velocityX = -15;
    }
    if(keyDown("right")){
      player.velocityX = 15;
    }
    if(keyWentUp("left") || keyWentUp("right")){
      player.velocityX = 0;
    }
    
    if(keyWentUp("space")){
      playerBullet = createSprite(player.x,player.y,5,15);
      playerBullet.velocityY = -20;
      playerBulletGroup.add(playerBullet);
    }
    
    if(enemyGroup.isTouching(playerBulletGroup)){
      for(var i=0;i<enemyGroup.length;i++){      
       if(enemyGroup[i].isTouching(playerBulletGroup)){
            playerBulletGroup.destroyEach()
            enemyGroup[i].destroy();
          }
      
      }
    }

    if(player.isTouching(enemyBulletGroup)){
      player.destroy();
      gameState = 2;
    }
  }
  //-------------------------------------------------//
  if (gameState == 2){
    enemyBulletGroup.destroyEach();
    playerBulletGroup.destroyEach();
    enemyGroup.destroyEach();
    textSize(120)
    text("Game Over",200,200)
  }
  drawSprites();
}