function PlayState(gsm, canvas){

    this.gsm = gsm;
    this.canvas = canvas;
    this.slots = [];

    const tileNums = 9;
    const widthSize = Math.floor(canvas.width / 3);
    const heightSize = Math.floor(canvas.height / 3);
    const offset = 5;

    this.init = function(){
        var row = 0;
        var col = 0;

        for(var i=0; i<tileNums; i++){
            var x = widthSize * col + offset;
            var y = heightSize * row + offset;
            this.slots[i] = new Slot(x, y, widthSize - offset, heightSize - offset);
            if(i != tileNums-1){
                var tile = new Tile(x, y, widthSize - offset, heightSize - offset, i);
                this.slots[i].tile = tile;
            }
            col++;
            if(col == 3){
                col = 0;
                row++;
            }
            if(i == tileNums - 1){
                this.slots[i].empty = true;
            }
        }

        let swapOptions = [
            [[0,4], [1,2], [3, 7], [5,6]],
            [[0,3], [6,2], [4, 7], [5,1]],
            [[7,4], [1,5], [3, 0], [2,6]],
            [[0, 6], [1, 7], [2, 4], [5,3]],
            [[0, 1], [2, 3], [4, 5], [6, 7]],
        ];
        let toSwap = swapOptions[Math.floor(Math.random() * swapOptions.length)];

        for(var i=0; i < toSwap.length; i++){

            let temp = this.slots[toSwap[i][0]].tile;
            this.slots[toSwap[i][0]].tile = this.slots[toSwap[i][1]].tile;
            this.slots[toSwap[i][1]].tile = temp;

            this.slots[toSwap[i][0]].alignTile();
            this.slots[toSwap[i][1]].alignTile();

        }
        this.render(context);
    }

    this.update = function(){

    }

    this.render = function(context){
        for(var i=0; i<this.slots.length; i++){
            if(this.slots[i].tile){
                this.slots[i].tile.render(context);
            }
        }
    }

    this.checkWin = function()
    {
        for (let i=0; i<this.slots.length-1; i++)
        {
            if (this.slots[i].empty) return false;
            if (this.slots[i].tile.number != i){
                return false;
            }
        }
        return true;
    }

    this.mouseMove = function(pos){
        for(var i=0; i<tileNums; i++){
            if(this.slots[i].collides(pos) && !this.slots[i].empty){
                var movable = false;
                if(i != 0 && i != 3 && i != 6){
                    if(this.slots[i-1].empty){
                        this.moveTile(this.slots[i], this.slots[i-1]);
                        movable = true;
                    }
                }
                if((i != 2 && i != 5 && i != 8) && !movable){
                    if(this.slots[i+1].empty){
                        this.moveTile(this.slots[i], this.slots[i+1]);
                        movable = true;
                    }
                }
                if((i != 0 && i != 1 && i != 2) && !movable){
                    if(this.slots[i-3].empty){
                        this.moveTile(this.slots[i], this.slots[i-3]);
                        movable = true;
                    }
                }
                if((i != 6 && i != 7 && i != 8) && !movable){
                    if(this.slots[i+3].empty){
                        this.moveTile(this.slots[i], this.slots[i+3]);
                    }
                }
            }
        }

        if (this.checkWin())
        {
            this.gsm.set(new WinState(this.gsm, this.canvas));
        }
    }

    this.moveTile = function(slotSrc, slotDes){
        slotDes.tile = slotSrc.tile;
        slotSrc.tile = null;
        slotDes.tile.x = slotDes.x;
        slotDes.tile.y = slotDes.y;
        slotSrc.empty = true;
        slotDes.empty = false;
    }


}