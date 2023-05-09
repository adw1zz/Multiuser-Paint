export default class Tool {
    canvas: any;
    socket: WebSocket;
    id: string;
    ctx: any;

    constructor(canvas: any, socket: WebSocket, id: string) {
        this.canvas = canvas;
        this.socket = socket;
        this.id = id;
        this.ctx = canvas.getContext('2d');
    }

    set lineWidth(width: number) {
        this.ctx.lineWidth = width;
    }

    set strokeColor(color: any) {
        this.ctx.strokeStyle = color;
    }

    destroyEvents() {
        this.canvas.onmousemove = null;
        this.canvas.onmousedown = null;
        this.canvas.onmouseup = null;
    }
    
}