import calcPolygonCenter from "./calcPolygonCenter";
import Vector2 from "../../types/vector2";

export default function calcPolygonRotation(vertices: Array<Vector2>): number {
    const center = calcPolygonCenter(vertices);
    const angle = Math.atan2(vertices[0].y - center.y, vertices[0].x - center.x);
    return angle;
}