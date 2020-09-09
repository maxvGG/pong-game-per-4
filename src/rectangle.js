import Point from './point';

export default class Rectangle{
    constructor(x,y, width, height) {
        this.position = new Point(x,y);
        this.velocity = new Point();
        this.size= new Point(width, height);
    }

    get left() {
        return this.position.x - this.size.x / 2;
        
    }
    get right() {
        return this.position.x + this.size.x / 2;
    }
    get top() {
        return this.position.y - this.size.y / 2;
    }
    get bottom() {
        return this.position.y + this.size.y / 2;
    }
}