import Brush from "./Brush";

export default class Eraser extends Brush {

    mouseDown = false;
    toolType = 'eraser';

    constructor(canvas: any, socket: WebSocket, id: string) {
        super(canvas, socket, id);
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
                    width: this.ctx.lineWidth,
                    stroke: "",
                }
            }))
        }
    }

    static draw(ctx: any, x: number, y: number, width: number) {
        ctx.strokeStyle = "white";
        ctx.lineWidth = width;
        ctx.lineTo(x, y)
        ctx.stroke()
    }
}