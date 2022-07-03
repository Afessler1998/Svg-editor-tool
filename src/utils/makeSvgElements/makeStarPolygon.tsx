import Vector2 from "../math/vector2";

export interface StarPolygon{
    type: string,
    vertices: Array<Vector2>,
    sides: number,
    innerRadius: number,
    fill: string,
    id: string,
}

export function makeStarPolygon(sides: number, vertices: Array<Vector2>, innerRadius: number, fill: string, id: string): StarPolygon {
    return {
        type: "starPolygon",
        sides,
        vertices,
        innerRadius,
        fill,
        id
    }
}

export function getStarPolygonSvg(starPolygon: StarPolygon) {
    const { vertices, fill, id } = starPolygon;
    const stringPoints = vertices.map(({x, y}) => `${x},${y}`).join(" ");
    return <polygon points={stringPoints} fill={fill} id={id} key={id} />
}