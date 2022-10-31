export interface Rect{
    type: string,
    width: number,
    height: number,
    x: number,
    y: number,
    fill: string,
    transform: string,
    id: string,
}

export function makeRect(width: number, height: number, x: number, y: number, fill: string, transform: string, id: string): Rect {
    return {
        type: "rect",
        width,
        height,
        x,
        y,
        fill,
        transform,
        id
    }
}

export function getRectSvg(rect: Rect) {
    const { width, height, x, y, fill, transform, id } = rect;
    return <rect width={width} height={height} x={x} y={y} fill={fill} transform={transform} id={id} key={id} />
}