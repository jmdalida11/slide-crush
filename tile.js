function Tile(x, y, w, h, number){

    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.number = number;

    this.imagePositions = [];



    this.alignImage = function()
    {
        if(this.number == 0){
            this.imagePositions = [0, 0];
        }else if(this.number == 1){
            this.imagePositions = [w, 0];
        }else if(this.number == 2){
            this.imagePositions = [2 * w, 0];
        }else if(this.number == 3){
            this.imagePositions = [0, h];
        }else if(this.number == 4){
            this.imagePositions = [w, h];
        }else if(this.number == 5){
            this.imagePositions = [2 * w, h];
        }else if(this.number == 6){
            this.imagePositions = [0, h * 2];
        }else if(this.number == 7){
            this.imagePositions = [w, h * 2];
        }
    }

    this.update = function(){

    }

    this.render = function(context){
        // context.fillStyle = 'blue';
        //context.fillRect(this.x, this.y, this.w, this.h);
        //context.drawImage(img, this.x, this.y, this.w, this.h, this.x, this.y, this.w, this.h);
        //context.fillStyle = 'black';
        //context.font = "30px Arial";
        //context.fillText(this.number , this.x + this.w / 2 , this.y + this.h / 2);
        context.drawImage(img, this.imagePositions[0], this.imagePositions[1],  this.w,  this.h,  this.x,  this.y,  this.w,  this.h);
    }

    this.alignImage();
}