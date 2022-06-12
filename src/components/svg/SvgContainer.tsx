import React, { useState } from 'react'; 
import { RootState } from '../../redux-store/store';
import { useSelector, useDispatch } from 'react-redux';
import style from "../../styles/svg.module.css";
import ConvertSvgObjectsToElements from '../../utils/convertSvgObjectsToElement';
import getSvgEventHandlers from '../../utils/getSvgEventHandlers';

import getRelativePosition from '../../utils/getRelativePosition';
import { makePathNode, PathNode } from '../../utils/makeSvgElements/makePathNode';
import { CurveControlNode, makeCurveControlNode } from '../../utils/makeSvgElements/makePathCurveControl';
import { makePath } from '../../utils/makeSvgElements/makePath';
import { addElement, removeElement } from '../../redux-store/reducers/svgList';


const SvgContainer = ({ width, height }: { width: number, height: number }) => {
    const list = useSelector((state: RootState) => state.svgList.list);
    const selectedTool = useSelector((state: RootState) => state.selectTool.selectedTool);

    const svgElementList = ConvertSvgObjectsToElements(list);

    //const eventHandlers = getSvgEventHandlers(selectedTool);
    //const { handleMouseDown, handleMouseMove, handleMouseUp } = eventHandlers;

    const dispatch = useDispatch();

    const [mouseDown, setMouseDown] = useState(false);
    const [nodeCount, setNodeCount] = useState(0);
    const [pathNodes, setPathNodes] = useState<Array<PathNode>>([]);
    const [curveControlNodes, setCurveControlNodes] = useState<Array<CurveControlNode>>([]);
    const [pathId, setPathId] = useState("");

    return (
        <div className={style.container}>
            <div
            className={style.mask}
            onMouseDown={(e: React.MouseEvent) => {
                const { x, y } = getRelativePosition(e);
                setMouseDown(true);

                if (pathId === "") setPathId(`${x}${y}`);

                if (pathNodes.length !== 0) return;
                const pathNode = makePathNode(x, y, nodeCount);
                setPathNodes([...pathNodes, pathNode]);

                const path = makePath(pathNodes, curveControlNodes, "black", "none", pathId, true);
                dispatch(addElement(path));
            }}
            onMouseMove={(e: React.MouseEvent) => {
                let { x, y } = getRelativePosition(e);

                //if mouse is within 5x5 area of any node, snap to it
                for (let i = 0; i < nodeCount; i++) {
                    const node = pathNodes[i];
                    const nodeX = node.x;
                    const nodeY = node.y;
                    const xDiff = Math.abs(nodeX - x);
                    const yDiff = Math.abs(nodeY - y);

                    if (xDiff < 3 && yDiff < 3) {
                        x = nodeX;
                        y = nodeY;
                    }
                }

                if (mouseDown) {

                    const pathNode = makePathNode(x, y, nodeCount + 1);
                    const filteredPathNodes = pathNodes.filter(node => node.nodeNumber !== nodeCount + 1);
                    setPathNodes([...filteredPathNodes, pathNode]);

                    const x0 = pathNodes[nodeCount].x;
                    const y0 = pathNodes[nodeCount].y;
                    const x1 = x;
                    const y1 = y;
                    const x2 = pathNode.x;
                    const y2 = pathNode.y;

                    const curveControlNode = makeCurveControlNode(x0, y0, x1, y1, x2, y2, nodeCount + 1);
                    const filteredCurveControlNodes = curveControlNodes.filter(node => node.nodeNumber !== nodeCount + 1);
                    setCurveControlNodes([...filteredCurveControlNodes, curveControlNode]);

                    dispatch(removeElement(pathId));
                    const path = makePath(pathNodes, curveControlNodes, "black", "none", pathId, true);
                    dispatch(addElement(path));

                } else if (pathNodes.length > 0) {

                    const pathNode = makePathNode(x, y, nodeCount);
                    const filteredPathNodes = pathNodes.filter(node => node.nodeNumber !== nodeCount);
                    setPathNodes([...filteredPathNodes, pathNode]);

                    const prevCurveControlNode = curveControlNodes.find(node => node.nodeNumber === nodeCount);
                    if (prevCurveControlNode) {
                        const x0 = pathNodes[nodeCount - 1].x;
                        const y0 = pathNodes[nodeCount - 1].y;
                        const x1 = prevCurveControlNode.x1;
                        const y1 = prevCurveControlNode.y1;
                        const x2 = pathNode.x;
                        const y2 = pathNode.y;

                        const curveControlNode = makeCurveControlNode(x0, y0, x1, y1, x2, y2, nodeCount);
                        const filteredCurveControlNodes = curveControlNodes.filter(node => node.nodeNumber !== nodeCount);
                        setCurveControlNodes([...filteredCurveControlNodes, curveControlNode]);
                    }

                    dispatch(removeElement(pathId));
                    const path = makePath(pathNodes, curveControlNodes, "black", "none", pathId, true);
                    dispatch(addElement(path));
                }
            }}
            onMouseUp={() => {
                setMouseDown(false);
                setNodeCount(nodeCount + 1);
            }}
            />
            <svg viewBox={`0 0 ${width} ${height}`} xmlns="http://www.w3.org/2000/svg" style={{ width, height }} >
                {svgElementList}
            </svg>
        </div>
    );
};

export default SvgContainer;