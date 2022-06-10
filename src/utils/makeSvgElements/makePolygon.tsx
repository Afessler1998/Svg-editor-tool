export interface Polygon{
    type: string,
    points: string,
    fill: string,
    id: string,
}

export function makePolygon(points: string, fill: string, id: string): Polygon {
    return {
        type: "polygon",
        points,
        fill,
        id
    }
}

export function getPolygonSvg(polygon: Polygon) {
    const { points, fill, id } = polygon;
    return <polygon points={points} fill={fill} key={id} />
}