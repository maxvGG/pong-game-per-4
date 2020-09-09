export default class Canvas {
    constructor(id, bgcolor, fillcolor, z) {
        this.canvas = document.createElement('canvas');
        this.canvas.width = 1000;
        this.canvas.height = 700;
        this.canvas.style.backgroundColor = bgcolor;
        this.canvas.style.zIndex = z;
        this.canvas.id = id;
        this.context = this.canvas.getContext('2d');
        this.context.fillStyle = fillcolor;

        document.body.appendChild(this.canvas);


    }
}