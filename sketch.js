var path,mainCyclist;
var cycleBell, pinkG, yellowG, redG
var pathImg,mainRacerImg1,mainRacerImg2;

var END =0;
var PLAY =1;
var gameState = PLAY;

var Distance=0;

function preload(){
  pathImg = loadImage("images/Road.png");
  
  mainRacerImg1 = loadAnimation("images/mainPlayer1.png","images/mainPlayer2.png");
  mainRacerImg2= loadAnimation("images/mainPlayer3.png");
  pinkImg=
    loadAnimation("opponent1.png","opponent2.png")
  pinkImg2=
    loadAnimation ("opponent3.png")
   opp2Img=
    loadAnimation("opponent4.png","opponent5.png")
  opp2Img2=
    loadAnimation("opponent6.png")
  opp3Img=
    loadAnimation("opponent7.png","opponent8.png")
  opp3Img2=
    loadAnimation("opponent9.png")
    gameOverImg=loadImage("gameOver.png")
  obstaclesImg1= loadAnimation ("obstacle1.png")


}

function setup(){
  
  pinkG = createGroup();
  yellowG = createGroup(); 
  redG = createGroup(); 
  obG = createGroup();

  
createCanvas(500,300);
  
// Moving background
path=createSprite(100,150);
path.addImage(pathImg);
path.velocityX = -5;

//creating boy running
mainCyclist  = createSprite(70,150,20,20);
mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
mainCyclist.addAnimation ("sahilStop", mainRacerImg2)
mainCyclist.scale=0.07;
mainCyclist.debug= false
mainCyclist.setCollider("circle", 0, 0, 600)

  
gameOver= createSprite (250, 150, 20, 20)
gameOver.addImage ("off", gameOverImg)
gameOver.scale=0.5
gameOver.visible=false
  
}

function draw() {
  background(180);
    
  if(gameState===PLAY){
    mainCyclist.y = World.mouseY;
    Distance = Distance + Math.round(getFrameRate()/60);
    var selectPlay= Math.round(random(1,4))
    
    
    if (World.frameCount%150==0){
     if (selectPlay==1){
        pinkCyclists()
     }
     if (selectPlay==4){
       opp2Cyclists()
    }
     if (selectPlay==3){
       opp3Cyclists()
    }
      if (selectPlay==2){
       obstacles()
    }
    }

      
   if(keyDown("space")){
      bell.play()
      }  
   edges= createEdgeSprites();
   mainCyclist .collide(edges);
  
   path.velocityX = -(4 + 3* Distance/100)


    if(path.x < 0 ){
    path.x = width/2;
  }  
}
   drawSprites();
  textSize(20);
  fill(255);
  text("Distance: "+ Distance,370,280);
  
if(mainCyclist.isTouching(pinkG)||mainCyclist.isTouching(yellowG)||mainCyclist.isTouching(redG)||mainCyclist.isTouching(obG)){
       gameState = END
}
  

  if (gameState === END) {
  mainCyclist.changeAnimation ("sahilStop", mainRacerImg2)
  //player1.changeAnimation ("pinkStop", pinkImg2)
  //player2.changeAnimation ("opp2Stop", opp2Img2)
  //player3.changeAnimation ("opp3Stop", opp3Img2)

  gameOver.visible = true;
  textSize(12)
  text("Press Up Arrow to Restart the game!", 150,190);

  path.velocityX = 0;
  mainCyclist.velocityX = 0
    
  yellowG.setLifetimeEach(-1);
  redG.setLifetimeEach(-1);
  pinkG.setLifetimeEach(-1);
  obG.setLifetimeEach(-1);
     
  pinkG.setVelocityXEach(0);
  yellowG.setVelocityXEach(0);
  redG.setVelocityXEach(0);
  obG.setVelocityXEach(0);
  if(keyDown("UP_ARROW")){
     reset()
     }
}
}

function pinkCyclists(){
  player1= createSprite (600 , Math.round(random(50,100)), 10, 10)
  player1.scale=0.06
  player1.addAnimation ("blah2", pinkImg)
  player1.addAnimation ("pinkStop", pinkImg2)
  player1.setLifetime=200
  player1.setCollider("circle", 0, 0, 600)
  player1.velocityX = -(3 + 3* Distance/100)
  pinkG.add(player1)
}
function opp2Cyclists(){
  player2= createSprite (600 , Math.round(random(35,90)), 10, 10)
  player2.scale=0.06
  player2.addAnimation ("blah1", opp2Img)
  //player2.addAnimation ("opp2Stop", opp2Img2)
  player2.setLifetime=200
  player2.setCollider("circle", 0, 0, 600)
  player2.velocityX = -(4 + 3* Distance/100)
  yellowG.add(player2)
}
function opp3Cyclists(){
  player3= createSprite (600 , Math.round(random(35,90)), 10, 10)
  player3.scale=0.06
  player3.addAnimation ("blah3", opp3Img)
  //player3.addAnimation ("opp3Stop", opp3Img2)
  player3.setLifetime=200
  player3.velocityX = -(3 + 3* Distance/100)
  player3.setCollider("circle", 0, 0, 600)
  redG.add(player3)
}
function obstacles(){
  obsta1 = createSprite (600, Math.round(random(35,190)), 10, 10)
  obsta1.scale = 0.1
  obsta1.addAnimation("blah4", obstaclesImg1 )
  obsta1.setLifetime=200
  obsta1.velocityX = -(3 + 3* Distance/100)
  obsta1.setCollider("circle", 0, 0, 300)
  obG.add(obsta1)
}
function reset(){
  gameState= PLAY
  gameOver.visible = false
  pinkG.destroyEach()
  yellowG.destroyEach()
  redG.destroyEach()
  obG.destroyEach()
  mainCyclist.changeAnimation ("SahilRunning", mainRacerImg1)

  Distance = 0
}