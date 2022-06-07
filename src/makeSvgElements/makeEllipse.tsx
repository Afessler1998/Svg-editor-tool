export interface Ellipse{
    rx: number,
    ry: number,
    cx: number,
    cy: number,
    fill: string,
    id: string,
}

export function makeEllipse(rx: number, ry: number, cx: number, cy: number, fill: string, id: string): Ellipse {
    return {
        rx,
        ry,
        cx,
        cy,
        fill,
        id
    }
}

export function getEllipseSvg(ellipse: Ellipse) {
    const { rx, ry, cx, cy, fill } = ellipse;
    return <ellipse rx={rx} ry={ry} cx={cx} cy={cy} fill={fill} onClick={(e) => e.stopPropagation()} />
}