import {makeAutoObservable} from "mobx";

class ToolState {
    tool: any;
    color: any;

    constructor() {
        makeAutoObservable(this);
    }

    setTool(tool: any) {
        this.tool = tool;
    }

    setStrokeColor(color: any) {
        this.tool.strokeColor = color;
    }

    setLineWidth(width: any) {
        this.tool.lineWidth = width;
    }
}