import calcLineCenter from "./calcLineCenter";
import calcPolygonCenter from "./calcPolygonCenter";

export default function getElementCenter(element: any) {
    switch(element.type) {
        case "ellipse":
            return { x: element.cx, y: element.cy };
        case "rect":
            return { x: element.x + element.width / 2, y: element.y + element.height / 2 };
        case "line":
            return calcLineCenter(element);
        case "polygon":
            return calcPolygonCenter(element.vertices);
        case "starPolygon":
            return calcPolygonCenter(element.vertices);
        default:
            return { x: 0, y: 0 };
    }
}