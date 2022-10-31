import Vector2 from "../../types/vector2";

export interface Polygon{
    type: string,
    vertices: Array<Vector2>,
    sides: number,
    fill: string,
    transform: string,
    id: string,
}

export function makePolygon(sides: number, vertices: Array<Vector2>, fill: string, transform: string, id: string): Polygon {
    return {
        type: "polygon",
        sides,
        vertices,
        fill,
        transform,
        id
    }
}

export function getPolygonSvg(polygon: Polygon) {
    const { vertices, fill, transform, id } = polygon;
    const stringPoints = vertices.map(({x, y}) => `${x},${y}`).join(" ");
    return <polygon points={stringPoints} fill={fill} transform={transform} id={id} key={id} />
}