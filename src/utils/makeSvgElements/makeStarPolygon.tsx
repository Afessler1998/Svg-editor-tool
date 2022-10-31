import Vector2 from "../../types/vector2";

export interface StarPolygon{
    type: string,
    vertices: Array<Vector2>,
    sides: number,
    innerRadius: number,
    fill: string,
    transform: string,
    id: string,
}

export function makeStarPolygon(sides: number, vertices: Array<Vector2>, innerRadius: number, fill: string, transform: string, id: string): StarPolygon {
    return {
        type: "starPolygon",
        sides,
        vertices,
        innerRadius,
        fill,
        transform,
        id
    }
}

export function getStarPolygonSvg(starPolygon: StarPolygon) {
    const { vertices, fill, transform, id } = starPolygon;
    const stringPoints = vertices.map(({x, y}) => `${x},${y}`).join(" ");
    return <polygon points={stringPoints} fill={fill} transform={transform} id={id} key={id} />
}