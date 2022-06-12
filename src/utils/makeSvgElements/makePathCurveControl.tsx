export interface CurveControlNode{
    type: string;
    x0: number;
    y0: number;
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    nodeNumber: number;
}

export function makeCurveControlNode(x0: number, y0: number, x1: number, y1: number, x2: number, y2: number, nodeNumber: number): CurveControlNode {
    return {
        type: "CurveControlNode",
        x0,
        y0,
        x1,
        y1,
        x2,
        y2,
        nodeNumber
    }
}

export function getCurveControlNodeSvg(CurveControlNode: CurveControlNode) {
    const { x0, y0, x1, y1, x2, y2, nodeNumber } = CurveControlNode;

    return (
        <g stroke={"#89CFF0"} key={`curveControlNode${x1}${y1}${x2}${y2}${nodeNumber}`}>
            <line x1={x0} y1={y0} x2={x1} y2={y1} strokeWidth={3} />
            <circle cx={x1} cy={y1} r={6} strokeWidth={3} fill={"#fff"} />
            <circle cx={x2} cy={y2} r={6} strokeWidth={3} fill={"#fff"} />
        </g>
    );
}