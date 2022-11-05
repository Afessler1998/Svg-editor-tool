import Vector2 from "../../types/vector2";

export function calcPolygonVertices(sides: number, radius: number, center: Vector2): Array<Vector2> {
    const vertices: Vector2[] = [];
    for (let i = 0; i < sides; i++) {
        const angle = (i / sides) * Math.PI * 2;
        const x = radius * Math.cos(angle) + center.x;
        const y = radius * Math.sin(angle) + center.y;
        vertices.push({x, y});
    }
    return vertices;
}








