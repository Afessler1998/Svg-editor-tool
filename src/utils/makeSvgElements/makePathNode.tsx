export interface PathNode{
    type: string;
    x: number;
    y: number;
    nodeNumber: number;
}

export function makePathNode(x: number, y: number, nodeNumber: number): PathNode {
    return {
        type: "pathNode",
        x,
        y,
        nodeNumber
    }
}

export function getPathNodeSvg(pathNode: PathNode) {
    const { x, y, nodeNumber } = pathNode;

    return <circle cx={x} cy={y} r={6} strokeWidth={3} stroke={"#89CFF0"} fill={"#fff"} key={`pathNode${x}${y}${nodeNumber}`} />;
}