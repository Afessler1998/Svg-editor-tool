import Vector2 from "../../types/vector2";

export function calcStarVertices(points: number, radius: number, center: Vector2, innerRadiusRatio: number): Array<Vector2> {
    const vertices: Vector2[] = [];
    for (let i = 0; i < points; i += 0.5) {
        const angle = (i / points) * Math.PI * 2;
        let x = radius * Math.cos(angle) + center.x;
        let y = radius * Math.sin(angle) + center.y;
        if (!Number.isInteger(i)) {
            x = radius * innerRadiusRatio * Math.cos(angle) + center.x;
            y = radius * innerRadiusRatio * Math.sin(angle) + center.y;
        }
        vertices.push({x, y});
    }
    return vertices;
}