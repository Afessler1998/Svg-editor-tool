import { makeEllipse } from "../../makeSvgElements/makeEllipse";

export default function resizeEllipse(ellipse: any, node: any, x: number, y: number) {

    let resizedEllipse = ellipse;
    const rx = ellipse.cx - x;
    const ry = ellipse.cy - y;

    switch(node.number) {
        case 1:
            if (rx < 0) break;
            if (ry < 0) break;

            resizedEllipse = makeEllipse(rx, ry, ellipse.cx, ellipse.cy, ellipse.fill, ellipse.transform, ellipse.id);
            break;
        case 2:
            if (rx > 0) break;
            if (ry < 0) break;

            resizedEllipse = makeEllipse(Math.abs(rx), ry, ellipse.cx, ellipse.cy, ellipse.fill, ellipse.transform, ellipse.id);
            break;
        case 3:
            if (rx > 0) break;
            if (ry > 0) break;

            resizedEllipse = makeEllipse(Math.abs(rx), Math.abs(ry), ellipse.cx, ellipse.cy, ellipse.fill, ellipse.transform, ellipse.id);
            break;
        case 4:
            if (rx < 0) break;
            if (ry > 0) break;

            resizedEllipse = makeEllipse(rx, Math.abs(ry), ellipse.cx, ellipse.cy, ellipse.fill, ellipse.transform, ellipse.id);
            break;
    }

    return resizedEllipse;
}