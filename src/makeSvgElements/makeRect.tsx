export interface Rect{
    type: string,
    width: number,
    height: number,
    x: number,
    y: number,
    fill: string,
    id: string,
}

export function makeRect(width: number, height: number, x: number, y: number, fill: string, id: string): Rect {
    return {
        type: "rect",
        width,
        height,
        x,
        y,
        fill,
        id
    }
}

export function getRectSvg(rect: Rect) {
    const { width, height, x, y, fill } = rect;
    return <rect width={width} height={height} x={x} y={y} fill={fill} onClick={(e) => e.stopPropagation()} />
}