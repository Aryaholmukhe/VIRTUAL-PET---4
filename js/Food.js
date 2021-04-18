class Food{
    constructor(x, y){
        this.foodStock= 0
        this.image = loadImage("images/milk.png")
    }

    updateFoodStock(foodStock){
      this.foodStock = foodStock
  }
  deductFood(){
    if(this.foodStock>0){
      this.foodStock = this.foodStock-1
    }
  }
    getFoodStock(){
      return this.foodStock
    }
    
    bedroom(){
      background(bedroom,550,500);  
  }
    
  garden(){
      background(garden,550,500);  
  } 

  washroom(){
      background(washroom,550,500); 
  }

    display(){
      var x = 70
      var y =120
      imageMode(CENTER)

        if(this.foodStock!=0){
            for(var i=0;i<this.foodStock;i++){
              if(i%10==0){
                x=70;
                y=y+80;
              }
              image(this.image,x,y,70,70);
              x=x+40;
            }
          }
    }
}