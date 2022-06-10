import { Vector2 } from "../math/calcPolygonVertices";

export interface Polygon{
    type: string,
    points: Array<Vector2>,
    fill: string,
    id: string,
}

export function makePolygon(points: Array<Vector2>, fill: string, id: string): Polygon {
    return {
        type: "polygon",
        points,
        fill,
        id
    }
}

export function getPolygonSvg(polygon: Polygon) {
    const { points, fill, id } = polygon;
    const stringPoints = points.map(({x, y}) => `${x},${y}`).join(" ");
    return <polygon points={stringPoints} fill={fill} id={id} key={id} />
}