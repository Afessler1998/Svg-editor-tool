import { Line } from "../makeSvgElements/makeLine";

export default function calcLineCenter(line: Line) {
    return {
        x: (line.x1 + line.x2) / 2,
        y: (line.y1 + line.y2) / 2,
    };
}