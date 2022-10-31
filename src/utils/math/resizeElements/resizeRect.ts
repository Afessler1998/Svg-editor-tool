import { makeRect } from "../../makeSvgElements/makeRect";

export default function resizeRect(rect: any, node: any, x: number, y: number) {

    let resizedRect = rect;
    let width = 0;
    let height = 0;

    switch(node.number) {
        case 1:
            width = rect.x - x + rect.width;
            height = rect.y - y + rect.height;

            if (width < 0) break;
            if (height < 0) break;

            resizedRect = makeRect(width, height, x, y, rect.fill, rect.id);
            break;
        case 2:
            width = rect.x - x;
            height = rect.y - y + rect.height;

            if (height < 0) break;
            if (x < rect.x) break;

            resizedRect = makeRect(Math.abs(width), height, rect.x, y, rect.fill, rect.id);
            break;
        case 3:
            width = rect.x - x;
            height = rect.y - y;

            if (width > 0) break;
            if (height > 0) break;

            resizedRect = makeRect(Math.abs(width), Math.abs(height), rect.x, rect.y, rect.fill, rect.id);
            break;
        case 4:
            width = rect.x - x + rect.width;
            height = rect.y - y;

            if (width < 0) break;
            if (y < rect.y) break;

            resizedRect = makeRect(width, Math.abs(height), x, rect.y, rect.fill, rect.id);
            break;
        }

    return resizedRect;
}