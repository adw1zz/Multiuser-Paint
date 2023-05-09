import Tool from "./Tool";

export default class Brush extends Tool {

    mouseDown = false;
    toolType = 'brush'

    constructor(canvas:any , socket: WebSocket, id: any) {
        super(canvas, socket, id);
        this.listen();
    }

    listen() {
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
        this.canvas.onmousedown = this.mouseDownHandler.bind(this);
        this.canvas.onmouseup = this.mouseUpHandler.bind(this);
    }

    mouseUpHandler() {
        this.mouseDown = false;
        if (this.mouseDown) {
            this.socket.send(JSON.stringify({
                method: "draw",
                id: this.id,
                figure: {
                    type: 'finish',
                }
            }))
        }
    }

    mouseDownHandler(e: any) {
        this.mouseDown = true;
        this.ctx.beginPath();
        this.ctx.moveTo(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop);
    }

    mouseMoveHandler(e: any) {
        if (this.mouseDown) {
            this.socket.send(JSON.stringify({
                method: "draw",
                id: this.id,
                figure: {
                    type: this.toolType,
                    x: e.pageX - e.target.offsetLeft,
                    y: e.pageY - e.target.offsetTop,
                    stroke: this.ctx.strokeStyle,
                    width: this.ctx.lineWidth,
                }
            }))
        }
    }

    static draw(ctx: any, x: number, y: number, stroke: any, width: number) {
        ctx.strokeStyle = stroke;
        ctx.lineWidth = width;
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}