import Vector2 from "../../types/vector2";

export default function calcPolygonDimensions(vertices: Array<Vector2>) {
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
        width: maxX - minX,
        height: maxY - minY,
    };
}
