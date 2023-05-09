import { useEffect, useRef, useState } from "react";
import "../styles/canvas.scss";
import { observer } from "mobx-react-lite";
import canvasState from "../store/canvasState";
import toolState from "../store/toolState";
import Brush from "../tools/Brush";
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from "react-router-dom";
import Eraser from "../tools/Eraser";

const Canvas = observer(() => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const nicknameRef = useRef<HTMLInputElement>(null)
    const params = useParams();
    const [modal, setModal] = useState(true);

    useEffect(() => {
        if (canvasState.nickname) {
            const socket = new WebSocket(`ws://localhost:5000/`);
            canvasState.setSocket(socket);
            canvasState.setSessionId(params.id);
            toolState.setTool(new Brush(canvasRef.current, socket, params.id));
            socket.onopen = () => {
                socket.send(JSON.stringify({
                    id: params.id,
                    nickname: canvasState.nickname,
                    method: "connection",
                }))
            }
            socket.onmessage = (e) => {
                let msg = JSON.parse(e.data);
                switch (msg.method) {
                    case "connection":
                        console.log(`user  ${msg.nickname} connected`);
                        canvasState.setState(msg.state);
                        break;
                    case "draw":
                        drawHandler(msg);
                        break;
                }
            }
        }
    }, [canvasState.nickname])

    const drawHandler = (msg: any) => {
        const figure = msg.figure;
        const ctx = canvasRef.current?.getContext('2d');
        switch (figure.type) {
            case "brush":
                Brush.draw(ctx, figure.x, figure.y, figure.stroke, figure.width);
                break;
            case "eraser":
                Eraser.draw(ctx, figure.x, figure.y, figure.width);
                break;
            case "finish":
                ctx?.beginPath();
                break;
        }
    }


    useEffect(() => {
        canvasState.setCanvas(canvasRef.current);
    }, [])

    
    const mouseUpHandler = () => {
        canvasState.socket.send(JSON.stringify({
            method: 'save-state',
            id: canvasState.id,
            state: canvasRef.current?.toDataURL(),
        }))
    }

    const connectHandler = () => {
        canvasState.setNickname(nicknameRef.current?.value);
        setModal(false);
    }

    return (
        <div className="canvas">
            <Modal show={modal} onHide={() => { }}>
                <Modal.Header>
                    <Modal.Title>Type your nickname</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input type="text" style={{ width: '50%', marginLeft: '25%' }} ref={nicknameRef} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => { connectHandler() }}>
                        Enter
                    </Button>
                </Modal.Footer>
            </Modal>
            <canvas onMouseUp={() => mouseUpHandler()} ref={canvasRef} width={1200} height={700}></canvas>
        </div>
    )
})

export default Canvas;