export default class Tool {
    canvas = null;
    socket = {};
    id = '';
    ctx = null;

    constructor(canvas: any, socket: WebSocket, id: string) {
        this.canvas = canvas;
        this.socket = socket;
        this.id = id;
        this.ctx = canvas.getContext('2d');
    }

}