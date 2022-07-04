import calcPolygonDimensions from "./calcPolygonDimensions";
import calcLineDimensions from "./calcLineDimensions";

export default function getElementDimensions(element: any) {
    switch(element.type) {
        case "ellipse":
            return { width: element.rx * 2, height: element.ry * 2 };
        case "rect":
            return { width: element.width, height: element.height };
        case "line":
            return calcLineDimensions(element);
        case "polygon":
            return calcPolygonDimensions(element.vertices);
        case "starPolygon":
            return calcPolygonDimensions(element.vertices);
        default:
            return { width: 0, height: 0 };
    }
}