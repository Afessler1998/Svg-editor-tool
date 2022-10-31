export interface Ellipse{
    type: string,
    rx: number,
    ry: number,
    cx: number,
    cy: number,
    fill: string,
    transform: string,
    id: string,
}

export function makeEllipse(rx: number, ry: number, cx: number, cy: number, fill: string, transform: string, id: string): Ellipse {
    return {
        type: "ellipse",
        rx,
        ry,
        cx,
        cy,
        fill,
        transform,
        id
    }
}

export function getEllipseSvg(ellipse: Ellipse) {
    const { rx, ry, cx, cy, fill, transform, id } = ellipse;
    return <ellipse rx={rx} ry={ry} cx={cx} cy={cy} fill={fill} transform={transform} id={id} key={id} />
}