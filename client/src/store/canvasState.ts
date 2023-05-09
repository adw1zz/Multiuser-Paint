import { makeAutoObservable } from "mobx";

class CanvasState {
    canvas: any;
    nickname: any;
    id: any;
    socket: any;

    constructor() {
        makeAutoObservable(this);
    }

    setSessionId(id: any) {
        this.id = id;
    }

    setSocket(socket: WebSocket) {
        this.socket = socket;
    }

    setNickname(nickname: any) {
        this.nickname = nickname;
    }

    setCanvas(canvas: any) {
        this.canvas = canvas;
    }

    setState(data: any) {
        let ctx = this.canvas.getContext('2d');
            let dataUrl = data;
            let img = new Image();
            img.src = dataUrl;
            img.onload = () => {
                ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
            }
    }

}

export default new CanvasState();