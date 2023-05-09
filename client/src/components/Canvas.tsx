import { useRef, useEffect, useState } from 'react';
import "../styles/canvas.scss";
import { observer } from "mobx-react-lite";
import Modal from 'react-bootstrap/Modal';

const Canvas = observer(() => {
    const canvasRef = useRef();
    const [modal, setModal] = useState(false);

    return (
        <div className="canvas">
            <canvas width={600} height={400}></canvas>
        </div>
    )
})

export default Canvas;