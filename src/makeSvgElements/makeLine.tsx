export interface Line{
    type: string,
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    stroke: string,
    id: string,
}

export function makeRect(x1: number, y1: number, x2: number, y2: number, stroke: string, id: string): Line {
    return {
        type: "line",
        x1,
        y1,
        x2,
        y2,
        stroke,
        id
    }
}

export function getLineSvg(line: Line) {
    const { x1, y1, x2, y2, stroke } = line;
    return <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={stroke} onClick={(e) => e.stopPropagation()} />
}