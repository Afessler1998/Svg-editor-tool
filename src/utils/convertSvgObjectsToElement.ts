import { getEllipseSvg } from './makeSvgElements/makeEllipse';
import { getRectSvg } from './makeSvgElements/makeRect';
import { getLineSvg } from './makeSvgElements/makeLine';
import { getPolygonSvg } from './makeSvgElements/makePolygon';
import { getStarPolygonSvg } from './makeSvgElements/makeStarPolygon';
import { getPathSvg } from './makeSvgElements/makePath';
import { getSelectedOutlineSvg } from './makeSvgElements/makeSelectedOutline';


export default function ConvertSvgObjectsToElements(list: Array<any>, selectedElement: string) {
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
            case "starPolygon":
                return getStarPolygonSvg(element);
            case "path":
                const selected = element.id === selectedElement ? true : false;
                return getPathSvg(element, selected);
            case "selectedOutline":
                return getSelectedOutlineSvg(element);
            default:
                return;
        }
    });
}