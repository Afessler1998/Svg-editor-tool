import Vector2 from "./vector2";

export default function calcPolygonCenter(vertices: Array<Vector2>) {
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;

    for (let i = 0; i < vertices.length; i++) {
        let vertex = vertices[i];

        if (vertex.x < minX) {
            minX = vertex.x;
        }
        if (vertex.x > maxX) {
            maxX = vertex.x;
        }
        if (vertex.y < minY) {
            minY = vertex.y;
        }
        if (vertex.y > maxY) {
            maxY = vertex.y;
        }
    }

    return {
        x: (minX + maxX) / 2,
        y: (minY + maxY) / 2,
    };
}