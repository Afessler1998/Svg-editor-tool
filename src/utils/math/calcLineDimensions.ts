import { Line } from "../makeSvgElements/makeLine";

export default function calcLineDimensions(line: Line) {
    return {
        width: Math.abs(line.x1 - line.x2),
        height: Math.abs(line.y1 - line.y2),
    };
}