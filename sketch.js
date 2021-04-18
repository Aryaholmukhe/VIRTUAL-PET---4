var dog,sadDog,happyDog,garden,washroom, database, dogImg, livingRoom;
var foodS,foodStock;
var fedTime,lastFed,currentTime;
var feed,addFood, takeBath, sleep, play, playInPark;
var foodObj;
var gameState,readState;
var background;

function preload(){
dogImg=loadImage("images/Dog.png");
happyDog=loadImage("images/Happy.png");
garden=loadImage("images/Garden.png");
washroom=loadImage("images/WashRoom.png");
bedroom=loadImage("images/BedRoom.png");
livingRoom=loadImage("images/Living Room.png")
}

function setup() {
  database=firebase.database();
  createCanvas(700,700);
  
  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });

  //read game state from database
  readState=database.ref('gameState');
  readState.on("value",function(data){
    gameState=data.val();
  });
   
  dog=createSprite(550,250,10,10);
  dog.addImage(dogImg);
  dog.scale=0.15;

  
  feed=createButton("Feed Dog");
  feed.position(100,15);
  feed.mousePressed(feedDog);
  feed.style("background-color", "#edffec")

  addFood=createButton("Add food");
  addFood.position(190,15);
  addFood.mousePressed(addFoods);
  addFood.style("background-color", "#ffd3b4")

  takeBath=createButton("I want to take a bath")
  takeBath.position(280, 15)
  takeBath.style("background-color", "#caf7e3")

  sleep=createButton("Sleep")
  sleep.position(430, 15)
  sleep.style("background-color", "#a1cae2")

  play=createButton("Let's play!")
  play.position(500, 15)
  play.style("background-color", "#f6dfeb")

  playInPark=createButton("Play in the park")
  playInPark.position(590, 15)
  playInPark.style("background-color", "#b8b5ff")
}

function draw() {
  background("green")
  currentTime=hour();

   if(takeBath.mousePressed(function(){
    update("3")
   }))
   if(gameState === "3"){
     dog.visible = false;
     foodObj.washroom()
   }

   if(sleep.mousePressed(function(){
    update("4")
   }))
   if(gameState === "4"){
     dog.visible = false;
     foodObj.bedroom()
   }

   if(play.mousePressed(function(){
    update("5")
   }))
   if(gameState === "5"){
     dog.visible = false;
     foodObj.livingRoom()
   }

   if(playInPark.mousePressed(function(){
    update("6")
   }))
   if(gameState === "6"){
     dog.visible = false;
     foodObj.garden()
   }
   
   if(gameState==="1"||gameState==="2"){
     foodObj.display()
   }
   
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


//function to update food stock and last fed time
function feedDog(){
  dog.addImage(happyDog);
  dog.visible = true;

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour(),
    gameState:"1"
  })
}

//function to add food in stock
function addFoods(){
  dog.addImage(dogImg)
  dog.visible = true;
  foodS++;
  database.ref('/').update({
    Food:foodS,
    gameState:"2"
  })
}

//update gameState
function update(state){
  database.ref('/').update({
    gameState:state
  })
}
