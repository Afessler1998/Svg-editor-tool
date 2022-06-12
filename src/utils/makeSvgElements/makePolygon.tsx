import Vector2 from "../vector2";

export interface Polygon{
    type: string,
    vertices: Array<Vector2>,
    sides: number,
    fill: string,
    id: string,
}

export function makePolygon(sides: number, vertices: Array<Vector2>, fill: string, id: string): Polygon {
    return {
        type: "polygon",
        sides,
        vertices,
        fill,
        id
    }
}

export function getPolygonSvg(polygon: Polygon) {
    const { vertices, fill, id } = polygon;
    const stringPoints = vertices.map(({x, y}) => `${x},${y}`).join(" ");
    return <polygon points={stringPoints} fill={fill} id={id} key={id} />
}