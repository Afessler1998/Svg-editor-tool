import resizeRect from "./resizeRect";

export default function resizeElement(element: any, point: number, x: number, y: number) {

    let resizedElement = element;

    switch(element.type) {
        case 'rect':
            resizedElement = resizeRect(element, point, x, y);
            break;
        default:
            return resizedElement;
    }

    return resizedElement;
}