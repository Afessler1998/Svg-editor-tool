import resizeRect from "./resizeRect";
import resizeEllipse from "./resizeEllipse";

export default function resizeElement(element: any, point: number, x: number, y: number) {

    let resizedElement = element;

    switch(element.type) {
        case 'rect':
            resizedElement = resizeRect(element, point, x, y);
            break;
        case 'ellipse':
            resizedElement = resizeEllipse(element, point, x, y);
            break;
        default:
            return resizedElement;
    }

    return resizedElement;
}