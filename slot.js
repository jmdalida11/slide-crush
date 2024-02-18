function Slot(x, y, w, h){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.tile = null;
    this.empty = false;

    this.collides = function(pos){
        return pos.x > this.x && pos.x < this.w + this.x &&
               pos.y > this.y && pos.y < this.h + this.y;
    }

    this.alignTile = function()
    {
        if (this.tile == null) return;

        this.tile.x = this.x;
        this.tile.y = this.y;
        this.tile.w = this.w;
        this.tile.h = this.h;

        this.tile.alignImage();
    }

}