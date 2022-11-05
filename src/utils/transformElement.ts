import parseTransformString from "./parseTransformString";
import getTransformString from "./getTransformString";
import { makeEllipse } from "./makeSvgElements/makeEllipse";
import { makeRect } from "./makeSvgElements/makeRect";
import { makeLine } from "./makeSvgElements/makeLine";
import { makePolygon } from "./makeSvgElements/makePolygon";
import { makeStarPolygon } from "./makeSvgElements/makeStarPolygon";
import { makePath } from "./makeSvgElements/makePath";


export default function transformElement(element: any, action: string, value: number) {
    const transforms = parseTransformString(element.transform);

    let updatedTransformString = element.transform;
    let transformedElement = element;

    switch (action) {
        case 'translateX':
            updatedTransformString = getTransformString({...transforms, translateX: value});
            break;
        case 'translateY':
            updatedTransformString = getTransformString({...transforms, translateY: value});
            break;
        case 'scaleX':
            updatedTransformString = getTransformString({...transforms, scaleX: value});
            break;
        case 'scaleY':
            updatedTransformString = getTransformString({...transforms, scaleY: value});
            break;
        case 'skewX':
            updatedTransformString = getTransformString({...transforms, skewX: value});
            break;
        case 'skewY':
            updatedTransformString = getTransformString({...transforms, skewY: value});
            break;
        case 'rotate':
            updatedTransformString = getTransformString({...transforms, rotate: value});
            break;
        default:
            break;
    }

    switch(element.type) {
        case 'ellipse':
            transformedElement = makeEllipse(element.rx, element.ry, element.cx, element.cy, element.fill, updatedTransformString, element.id);
            break;
        case 'rect':
            transformedElement = makeRect(element.width, element.height, element.x, element.y, element.fill, updatedTransformString, element.id);
            break;
        case 'line':
            transformedElement = makeLine(element.x1, element.y1, element.x2, element.y2, element.stroke, updatedTransformString, element.id);
            break;
        case 'polygon':
            transformedElement = makePolygon(element.sides, element.vertices, element.fill, updatedTransformString, element.id);
            break;
        case 'starPolygon':
            transformedElement = makeStarPolygon(element.sides, element.vertices, element.innerRadius, element.fill, updatedTransformString, element.id);
            break;
        case 'path':
            transformedElement = makePath(element.pathNodes, element.curveControlNodes, element.stroke, element.fill, updatedTransformString, element.id);
            break;
        }

    return transformedElement;
}