import React from "react";
import toolState from "../store/toolState";
import Brush from "../tools/Brush";
import "../styles/toolbar.scss";
import canvasState from "../store/canvasState";
import Eraser from "../tools/Eraser";


const Toolbar = () => {

    const changeColor = (e: any) => {
        toolState.setStrokeColor(e.target.value);
    }

    const download = () => {
        const dataUrl = canvasState.canvas.toDataURL();
        const a = document.createElement('a');
        a.download = `${canvasState.id}.png`;
        a.href = dataUrl;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    } 

    return (
        <div className='toolbar'>
            <button className='toolbar__btn brush' onClick={() =>toolState.setTool(new Brush(canvasState.canvas, canvasState.socket, canvasState.id))}/>
            <button className='toolbar__btn eraser' onClick={() =>toolState.setTool(new Eraser(canvasState.canvas, canvasState.socket, canvasState.id))}/>
            <input className="toolbar__btn color" type="color" onChange={(e) => changeColor(e)} />
            <button className='toolbar__btn save' onClick={() => download()}/>
        </div>
    )
}

export default Toolbar;