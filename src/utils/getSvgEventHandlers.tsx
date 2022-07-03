import React from "react";
import { RootState } from "../redux-store/store";
import { useDispatch, useSelector } from "react-redux";
import { addElement, removeElement, setFirstPointCoordinates } from "../redux-store/reducers/svgList";
import { setPathId, setNodeCount, setPathNodes, setCurveControlNodes } from "../redux-store/reducers/pathCreation";
import { setMouseIsDown } from "../redux-store/reducers/eventListener";
import { makeRect } from "./makeSvgElements/makeRect";
import { makeEllipse } from "./makeSvgElements/makeEllipse";
import { makeLine } from "./makeSvgElements/makeLine";
import { makePolygon } from "./makeSvgElements/makePolygon";
import { makeStarPolygon } from "./makeSvgElements/makeStarPolygon";
import { makePath } from "./makeSvgElements/makePath";
import { makePathNode } from "./makeSvgElements/makePathNode";
import { makeCurveControlNode } from "./makeSvgElements/makePathCurveControl";
import { colorPallete } from "../colorPallete";
import { calcPolygonVertices } from "./math/calcPolygonVertices";
import { calcStarVertices } from "./math/calcStarVertices";
import calcHypotenuse from "./math/calcHypotenuse";
import getRelativePosition from "./getRelativePosition";

export default function getSvgEventHandlers(selectedTool: string) {

    const mouseIsDown = useSelector((state: RootState) => state.eventListener.mouseIsDown);
    
    const firstPointCoordinates = useSelector((state: RootState) => state.svgList.firstPointCoordinates);
    const { x0, y0 } = firstPointCoordinates;

    //the bottom 4 lines are for the path creation tool
    const pathId = useSelector((state: RootState) => state.pathCreation.pathId);
    const pathNodes = useSelector((state: RootState) => state.pathCreation.pathNodes);
    const curveControlNodes = useSelector((state: RootState) => state.pathCreation.curveControlNodes);
    const nodeCount = useSelector((state: RootState) => state.pathCreation.nodeCount);

    const dispatch = useDispatch();

    switch(selectedTool) {
        case "rect":
            return {
                handleMouseDown: (e: React.MouseEvent) => {
                    dispatch(setMouseIsDown(true));
                    let { x, y } = getRelativePosition(e);

                    dispatch(setFirstPointCoordinates({ x0: x, y0: y }));
                },
                handleMouseMove: (e: React.MouseEvent) => {
                    if (!mouseIsDown) return;
                    dispatch(removeElement(`${x0}${y0}`));
                    let { x, y } = getRelativePosition(e);

                    const width = x - x0;
                    const height = y - y0;

                    let xPosition = x0;
                    let yPosition = y0;

                    if (width < 0) xPosition = x;
                    if (height < 0) yPosition = y;

                    const rect = makeRect(Math.abs(width), Math.abs(height), xPosition, yPosition, colorPallete.babyBlue, `${x0}${y0}`);
                    dispatch(addElement(rect));
                },
                handleMouseUp: () => {
                    dispatch(setMouseIsDown(false));
                }
            };
        case "ellipse":
            return {
                handleMouseDown: (e: React.MouseEvent) => {
                    dispatch(setMouseIsDown(true));
                    let { x, y } = getRelativePosition(e);

                    dispatch(setFirstPointCoordinates({ x0: x, y0: y }));
                },
                handleMouseMove: (e: React.MouseEvent) => {
                    if (!mouseIsDown) return;
                    let { x, y } = getRelativePosition(e);

                    dispatch(removeElement(`${x0}${y0}`));

                    const width = Math.abs(x - x0);
                    const height = Math.abs(y - y0);

                    const ellipse = makeEllipse(width, height, x0, y0, colorPallete.babyBlue, `${x0}${y0}`);
                    dispatch(addElement(ellipse));
                },
                handleMouseUp: () => {
                    dispatch(setMouseIsDown(false));
                }
            };
        case "polygon":
            return {
                handleMouseDown: (e: React.MouseEvent) => {
                    dispatch(setMouseIsDown(true));
                    let { x, y } = getRelativePosition(e);

                    dispatch(setFirstPointCoordinates({ x0: x, y0: y }));
                },
                handleMouseMove: (e: React.MouseEvent) => {
                    if (!mouseIsDown) return;
                    dispatch(removeElement(`${x0}${y0}`));

                    let { x, y } = getRelativePosition(e);

                    const radius = calcHypotenuse(x - x0, y - y0);
                    const rotation = Math.atan2(y - y0, x - x0);

                    const polygonVertices = calcPolygonVertices(5, radius, {x: x0, y: y0}, rotation);
                    const polygon = makePolygon(5, polygonVertices, colorPallete.babyBlue, `${x0}${y0}`);

                    dispatch(addElement(polygon));
                },
                handleMouseUp: () => {
                    dispatch(setMouseIsDown(false));
                }
            };
        case "star":
            return {
                handleMouseDown: (e: React.MouseEvent) => {
                    dispatch(setMouseIsDown(true));
                    let { x, y } = getRelativePosition(e);
                    
                    dispatch(setFirstPointCoordinates({ x0: x, y0: y }));
                },
                handleMouseMove: (e: React.MouseEvent) => {
                    if (!mouseIsDown) return;
                    let { x, y } = getRelativePosition(e);
                    dispatch(removeElement(`${x0}${y0}`));
    
                    const radius = calcHypotenuse(x - x0, y - y0);
                    const rotation = Math.atan2(y - y0, x - x0);
    
                    const polygonVertices = calcStarVertices(5, radius, {x: x0, y: y0}, rotation, 0.4);
                    const starPolygon = makeStarPolygon(5, polygonVertices, radius, colorPallete.babyBlue, `${x0}${y0}`);
    
                    dispatch(addElement(starPolygon));
                },
                handleMouseUp: () => {
                    dispatch(setMouseIsDown(false));
                }
            };
        case "line":
            return {
                handleMouseDown: (e: React.MouseEvent) => {
                    dispatch(setMouseIsDown(true));
                    let { x, y } = getRelativePosition(e);

                    dispatch(setFirstPointCoordinates({ x0: x, y0: y }));
                },
                handleMouseMove: (e: React.MouseEvent) => {
                    if (!mouseIsDown) return;
                    let { x, y } = getRelativePosition(e);
                    dispatch(removeElement(`${x0}${y0}`));

                    const line = makeLine(x0, y0, x, y, "#000", `${x0}${y0}`);
                    dispatch(addElement(line));
                },
                handleMouseUp: () => {
                    dispatch(setMouseIsDown(false));
                },
            };
        case "path":
            return {
                handleMouseDown: (e: React.MouseEvent) => {
                    
                //if right click, finish current path and reset path state
                if (e.nativeEvent.button === 2) {
                    if (pathId === "") return;
                    const filteredPathNodes = pathNodes.filter(node => node.nodeNumber !== nodeCount);
                    dispatch(removeElement(pathId));
                    const path = makePath(filteredPathNodes, curveControlNodes, "black", "none", pathId, false);
                    dispatch(addElement(path));
                    dispatch(setPathId(""));
                    dispatch(setPathNodes([]));
                    dispatch(setCurveControlNodes([]));
                    dispatch(setNodeCount(0));
                    return;
                }

                dispatch(setMouseIsDown(true));

                let { x, y } = getRelativePosition(e);

                //if mouse is within 4x4 area of any node, snap to it
                for (let i = 0; i < nodeCount; i++) {
                    const node = pathNodes[i];
                    if (!node) continue;
                    const nodeX = node.x;
                    const nodeY = node.y;
                    const xDiff = Math.abs(nodeX - x);
                    const yDiff = Math.abs(nodeY - y);

                    if (xDiff < 4 && yDiff < 4) {
                        x = nodeX;
                        y = nodeY;
                    }
                }

                let id = `${x}${y}`;
                if (pathId === "") dispatch(setPathId(id));

                const pathNode = makePathNode(x, y, nodeCount);
                const filteredPathNodes = pathNodes.filter(node => node.nodeNumber !== nodeCount);
                dispatch(setPathNodes([...filteredPathNodes, pathNode]));

                dispatch(removeElement(pathId || id));
                const path = makePath(pathNodes, curveControlNodes, "black", "none", pathId || id, true);

                dispatch(addElement(path));
                },
                handleMouseMove: (e: React.MouseEvent) => {
                    let { x, y } = getRelativePosition(e);

                //if mouse is within 4x4 area of any node, snap to it
                for (let i = 0; i < nodeCount; i++) {
                    const node = pathNodes[i];
                    if (!node) continue;
                    const nodeX = node.x;
                    const nodeY = node.y;
                    const xDiff = Math.abs(nodeX - x);
                    const yDiff = Math.abs(nodeY - y);

                    if (xDiff < 4 && yDiff < 4) {
                        x = nodeX;
                        y = nodeY;
                    }
                }

                if (mouseIsDown) {

                    const pathNode = makePathNode(x, y, nodeCount + 1);
                    const filteredPathNodes = pathNodes.filter(node => node.nodeNumber !== nodeCount + 1);
                    dispatch(setPathNodes([...filteredPathNodes, pathNode]));

                    const x0 = pathNodes[nodeCount].x;
                    const y0 = pathNodes[nodeCount].y;
                    const x1 = x;
                    const y1 = y;
                    const x2 = pathNode.x;
                    const y2 = pathNode.y;

                    const curveControlNode = makeCurveControlNode(x0, y0, x1, y1, x2, y2, nodeCount + 1);
                    const filteredCurveControlNodes = curveControlNodes.filter(node => node.nodeNumber !== nodeCount + 1);
                    dispatch(setCurveControlNodes([...filteredCurveControlNodes, curveControlNode]));

                    dispatch(removeElement(pathId));
                    const path = makePath(pathNodes, curveControlNodes, "black", "none", pathId, true);
                    dispatch(addElement(path));

                } else if (pathNodes.length > 0) {

                    const pathNode = makePathNode(x, y, nodeCount);
                    const filteredPathNodes = pathNodes.filter(node => node.nodeNumber !== nodeCount);
                    dispatch(setPathNodes([...filteredPathNodes, pathNode]));

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
                        dispatch(setCurveControlNodes([...filteredCurveControlNodes, curveControlNode]));
                    }

                    dispatch(removeElement(pathId));
                    const path = makePath(pathNodes, curveControlNodes, "black", "none", pathId, true);
                    dispatch(addElement(path));
                }
                },
                handleMouseUp: (e: React.MouseEvent) => {
                    dispatch(setMouseIsDown(false));
                    if (e.nativeEvent.button !== 2) dispatch(setNodeCount(nodeCount + 1));
                },
            };
        default:
            return {
                handleMouseDown: () => {
                    return;
                },
                handleMouseMove: () => {
                    return;
                },
                handleMouseUp: () => {
                    return;
                }
            };
    }
}