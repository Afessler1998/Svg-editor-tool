import Vector2 from "../math/vector2";
import { PathNode, getPathNodeSvg } from "./makePathNode";
import { CurveControlNode, getCurveControlNodeSvg } from "./makePathCurveControl";

export interface PathCommand {
    type: string;
    points: Array<Vector2>;
}

export interface Path{
    type: string,
    d: string,
    pathNodes: Array<PathNode>,
    curveControlNodes: Array<CurveControlNode>,
    stroke: string,
    fill: string,
    id: string,
    selected: boolean,
}

//make a function that returns the string for the d attribute of an svg path
function deriveDFromNodes(pathNodes: Array<PathNode>, curveControlNodes: Array<CurveControlNode>) {
    let d = "";

    for (let i = 0; i < pathNodes.length; i++) {
        if (i === 0) {
            d += `M ${pathNodes[i].x} ${pathNodes[i].y} `;
            continue;
        }

        const prevCurveControlNode = curveControlNodes.find(node => node.nodeNumber === i - 1);
        const curveControlNode = curveControlNodes.find(node => node.nodeNumber === i);
        const nextCurveControlNode = curveControlNodes.find(node => node.nodeNumber === i + 1);

        //if there are two curve controls in a row, it should be a cubic curve
        if (curveControlNode && nextCurveControlNode) {

            d += `C ${curveControlNode.x1} ${curveControlNode.y1} ${nextCurveControlNode.x1} ${nextCurveControlNode.y1} ${nextCurveControlNode.x0} ${nextCurveControlNode.y0} `;
        
            //if there is only one curve in a row, it should be a quadratic curve
        } else if (curveControlNode && !prevCurveControlNode && !nextCurveControlNode) {

            d += `Q ${curveControlNode.x1} ${curveControlNode.y1} ${curveControlNode.x2} ${curveControlNode.y2} `;

        //    
        } else {
            d += `L ${pathNodes[i].x} ${pathNodes[i].y} `;
        }
    }

    return d;
}

export function makePath(pathNodes: Array<PathNode>, curveControlNodes: Array<CurveControlNode>, stroke: string, fill: string, id: string, selected: boolean): Path {
    
    const d = deriveDFromNodes(pathNodes, curveControlNodes);

    return {
        type: "path",
        d,
        pathNodes,
        curveControlNodes,
        stroke,
        fill,
        id,
        selected
    }
}

export function getPathSvg(path: Path) {
    const { d, stroke, fill, id, pathNodes, curveControlNodes, selected } = path;

    if (selected) {
        //console.log(id);
        return <g key={id}>
            <path d={d} stroke={stroke} fill={fill} id={id} />
            {curveControlNodes.map(node => getCurveControlNodeSvg(node))}
            {pathNodes.map(node => getPathNodeSvg(node))}
        </g>
    } else {
        return <path d={d} stroke={stroke} fill={fill} id={id} key={id} />
    }
}

/*
path {
    type: "path",
    d: [{
        type: "M",
        points: [{
            x: 10,
            y: 10
        }]
    }, {
        type: "C",
        points: [{
            x: 20,
            y: 20
        }, {
            x: 40,
            y: 20,
        }, {
            x: 50,
            y: 10
        }]
    }],
    pathNodes: [{ x: 10, y: 10 }, { x: 50, y: 10 }],
    curveControlNodes: [{ x: 20, y: 20 }, { x: 40, y: 20 }],
    stroke: "#000",
    fill: "none",
    id: "path1"
}

*/