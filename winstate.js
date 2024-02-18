function Emoji(x, y)
{
    this.x = x;
    this.y = y;
    this.size = 70;

    this.update = function(context)
    {
        this.y -= 10;
        this.size -= 1;
        
        context.drawImage(imgEmoji, this.x, this.y, this.size, this.size);
    }
}


function WinState(gsm, canvas){

    this.gsm = gsm;
    this.canvas = canvas;
    this.emojis = [];
    this.numEmoji = 10;

    this.init = function(){
        for (let i=0; i<this.numEmoji; i++)
        {
            let x = Math.floor(Math.random() * this.canvas.width);
            let y = Math.floor(Math.random() * x) + this.canvas.height;
            this.emojis.push(new Emoji(x, y));
        }
    }

    this.update = function(){
    }

    this.render = function(context){
        context.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
        for (let i=0; i<this.emojis.length; i++)
        {
            if (this.emojis[i].y < 0){
                this.emojis[i].y = Math.floor(Math.random() * 100) + this.canvas.height;
                this.emojis[i].x = Math.floor(Math.random() * this.canvas.width);
                this.emojis[i].size = 60;
            }
            this.emojis[i].update(context);
        }
    }

}