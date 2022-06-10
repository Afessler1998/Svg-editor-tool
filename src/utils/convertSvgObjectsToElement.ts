import { getEllipseSvg } from './makeSvgElements/makeEllipse';
import { getRectSvg } from './makeSvgElements/makeRect';
import { getLineSvg } from './makeSvgElements/makeLine';
import { getPolygonSvg } from './makeSvgElements/makePolygon';


export default function ConvertSvgObjectsToElements(list: Array<any>) {
    return list.map((element) => {
        switch(element.type) {
            case "ellipse":
                return getEllipseSvg(element);
            case "rect":
                return getRectSvg(element);
            case "line":
                return getLineSvg(element);
            case "polygon":
                return getPolygonSvg(element);
            default:
                return;
        }
    });
}