import { makeAutoObservable } from "mobx";

class CanvasState {
    canvas = null;
    nickname = '';
    id = '';
    socket = {};

    constructor() {
        makeAutoObservable(this);
    }

    setSessionId(id: string) {
        this.id = id;
    }

    setSocket(socket: WebSocket) {
        this.socket = socket;
    }

    setNickname(nickname: string) {
        this.nickname = nickname;
    }

    setCanvas(canvas: any) {
        this.canvas = canvas;
    }

}

export default new CanvasState();