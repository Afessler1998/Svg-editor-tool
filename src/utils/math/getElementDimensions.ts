import calcPolygonDimensions from "./calcPolygonDimensions";

export default function getElementDimensions(element: any) {
    switch(element.type) {
        case "ellipse":
            return { width: element.rx * 2, height: element.ry * 2 };
        case "rect":
            return { width: element.width, height: element.height };
        case "line":
            return { width: element.x2 - element.x1, height: element.y2 - element.y1 };
        case "polygon":
            return calcPolygonDimensions(element.vertices);
        case "starPolygon":
            return calcPolygonDimensions(element.vertices);
        default:
            return { width: 0, height: 0 };
    }
}