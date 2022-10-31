import resizeRect from "./resizeRect";
import resizeEllipse from "./resizeEllipse";
import resizePolygon from "./resizePolygon";

export default function resizeElement(element: any, node: any, x: number, y: number, x0: number, y0: number) {

    let resizedElement = element;

    switch(element.type) {
        case 'rect':
            resizedElement = resizeRect(element, node, x, y);
            break;
        case 'ellipse':
            resizedElement = resizeEllipse(element, node, x, y);
            break;
        case 'polygon':
            resizedElement = resizePolygon(element, x, y, x0, y0);
            break;
        default:
            return resizedElement;
    }

    return resizedElement;
}