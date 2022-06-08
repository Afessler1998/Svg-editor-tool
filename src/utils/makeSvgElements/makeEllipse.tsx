export interface Ellipse{
    type: string,
    rx: number,
    ry: number,
    cx: number,
    cy: number,
    fill: string,
    id: string,
}

export function makeEllipse(rx: number, ry: number, cx: number, cy: number, fill: string, id: string): Ellipse {
    return {
        type: "ellipse",
        rx,
        ry,
        cx,
        cy,
        fill,
        id
    }
}

export function getEllipseSvg(ellipse: Ellipse) {
    const { rx, ry, cx, cy, fill, id } = ellipse;
    return <ellipse rx={rx} ry={ry} cx={cx} cy={cy} fill={fill} key={id} />
}