import React from "react";
import { RootState } from "../redux-store/store";
import { useDispatch, useSelector } from "react-redux";
import { addElement, removeElement, setFirstPointCoordinates, setSelectedElement, setSelectedOutline, setSelectedNode } from "../redux-store/reducers/svgList";
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
import { calcPolygonVertices } from "./math/calcPolygonVertices";
import { calcStarVertices } from "./math/calcStarVertices";
import useNodeClicked from "./math/resizeElements/useNodeClicked";
import calcHypotenuse from "./math/calcHypotenuse";
import getRelativePosition from "./getRelativePosition";
import resizeElement from "./math/resizeElements/resizeElement";
import getElementCenter from "./math/getElementCenter";
import getElementDimensions from "./math/getElementDimensions";
import { makeSelectedOutline } from "./makeSvgElements/makeSelectedOutline";
import getTransformString from "./getTransformString";


export default function getSvgEventHandlers(selectedTool: string) {

    const list = useSelector((state: RootState) => state.svgList.list);
    const listSize = list.length;

    const mouseIsDown = useSelector((state: RootState) => state.eventListener.mouseIsDown);
    
    const firstPointCoordinates = useSelector((state: RootState) => state.svgList.firstPointCoordinates);
    const { x0, y0 } = firstPointCoordinates;

    const selectedOutline = useSelector((state: RootState) => state.svgList.selectedOutline);
    const selectedElement = useSelector((state: RootState) => state.svgList.selectedElement);
    const selectedNode = useSelector((state: RootState) => state.svgList.selectedNode);

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

                    const xCenter = 0 + Math.abs(width) / 2;
                    const yCenter = 0 + Math.abs(height) / 2;

                    const transform = getTransformString({translateX: xPosition, translateY: yPosition, skewX: 0, skewY: 0, scaleX: 1, scaleY: 1, rotate: 0, rotateX: xCenter, rotateY: yCenter});
                    const rect = makeRect(Math.abs(width), Math.abs(height), 0, 0, "#89CFF0", transform, `${x0}${y0}`);
                    dispatch(addElement(rect));
                },
                handleMouseUp: (e: React.MouseEvent) => {
                    dispatch(setMouseIsDown(false));
                    dispatch(removeElement(`${x0}${y0}`));
                    let { x, y } = getRelativePosition(e);

                    const width = x - x0;
                    const height = y - y0;

                    let xPosition = x0;
                    let yPosition = y0;

                    if (width < 0) xPosition = x;
                    if (height < 0) yPosition = y;

                    const xCenter = 0 + Math.abs(width) / 2;
                    const yCenter = 0 + Math.abs(height) / 2;

                    const transform = getTransformString({translateX: xPosition, translateY: yPosition, skewX: 0, skewY: 0, scaleX: 1, scaleY: 1, rotate: 0, rotateX: xCenter, rotateY: yCenter});
                    const rect = makeRect(Math.abs(width), Math.abs(height), 0, 0, "#89CFF0", transform, `${listSize}`);
                    dispatch(addElement(rect));
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

                    const transform = getTransformString({translateX: x0, translateY: y0, skewX: 0, skewY: 0, scaleX: 1, scaleY: 1, rotate: 0, rotateX: 0, rotateY: 0});
                    const ellipse = makeEllipse(width, height, 0, 0, "#89CFF0", transform, `${x0}${y0}`);
                    dispatch(addElement(ellipse));
                },
                handleMouseUp: (e: React.MouseEvent) => {
                    dispatch(setMouseIsDown(false));

                    let { x, y } = getRelativePosition(e);

                    dispatch(removeElement(`${x0}${y0}`));

                    const width = Math.abs(x - x0);
                    const height = Math.abs(y - y0);

                    const transform = getTransformString({translateX: x0, translateY: y0, skewX: 0, skewY: 0, scaleX: 1, scaleY: 1, rotate: 0, rotateX: 0, rotateY: 0});
                    const ellipse = makeEllipse(width, height, 0, 0, "#89CFF0", transform, `${listSize}`);
                    dispatch(addElement(ellipse));
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
                    const degrees = Math.round(rotation * 180 / Math.PI);

                    const polygonVertices = calcPolygonVertices(5, radius, {x: 0, y: 0});
                    const transform = getTransformString({translateX: x0, translateY: y0, skewX: 0, skewY: 0, scaleX: 1, scaleY: 1, rotate: degrees, rotateX: 0, rotateY: 0});
                    const polygon = makePolygon(5, polygonVertices, "#89CFF0", transform, `${x0}${y0}`);

                    dispatch(addElement(polygon));
                },
                handleMouseUp: (e: React.MouseEvent) => {
                    dispatch(setMouseIsDown(false));

                    dispatch(removeElement(`${x0}${y0}`));

                    let { x, y } = getRelativePosition(e);

                    const radius = calcHypotenuse(x - x0, y - y0);
                    const rotation = Math.atan2(y - y0, x - x0);
                    const degrees = Math.round(rotation * 180 / Math.PI);

                    const polygonVertices = calcPolygonVertices(5, radius, {x: 0, y: 0});
                    const transform = getTransformString({translateX: x0, translateY: y0, skewX: 0, skewY: 0, scaleX: 1, scaleY: 1, rotate: degrees, rotateX: 0, rotateY: 0});
                    const polygon = makePolygon(5, polygonVertices, "#89CFF0", transform, `${listSize}`);

                    dispatch(addElement(polygon));
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
                    const degrees = Math.round(rotation * 180 / Math.PI);
    
                    const polygonVertices = calcStarVertices(5, radius, {x: 0, y: 0}, 0.4);
                    const transform = getTransformString({translateX: x0, translateY: y0, skewX: 0, skewY: 0, scaleX: 1, scaleY: 1, rotate: degrees, rotateX: 0, rotateY: 0});
                    const starPolygon = makeStarPolygon(5, polygonVertices, radius, "#89CFF0", transform, `${x0}${y0}`);
    
                    dispatch(addElement(starPolygon));
                },
                handleMouseUp: (e: React.MouseEvent) => {
                    dispatch(setMouseIsDown(false));

                    let { x, y } = getRelativePosition(e);
                    dispatch(removeElement(`${x0}${y0}`));
    
                    const radius = calcHypotenuse(x - x0, y - y0);
                    const rotation = Math.atan2(y - y0, x - x0);
                    const degrees = Math.round(rotation * 180 / Math.PI);
    
                    const polygonVertices = calcStarVertices(5, radius, {x: 0, y: 0}, 0.4);
                    const transform = getTransformString({translateX: x0, translateY: y0, skewX: 0, skewY: 0, scaleX: 1, scaleY: 1, rotate: degrees, rotateX: 0, rotateY: 0});
                    const starPolygon = makeStarPolygon(5, polygonVertices, radius, "#89CFF0", transform, `${listSize}`);
    
                    dispatch(addElement(starPolygon));
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

                    const lineXCenter = (x0 + x)/2;
                    const lineYCenter = (y0 + y)/2;

                    const lineX1 = x0 - lineXCenter;
                    const lineY1 = y0 - lineYCenter;
                    const lineX2 = x - lineXCenter;
                    const lineY2 = y - lineYCenter;
                    
                    const transform = getTransformString({translateX: lineXCenter, translateY: lineYCenter, skewX: 0, skewY: 0, scaleX: 1, scaleY: 1, rotate: 0, rotateX: 0, rotateY: 0});
                    const line = makeLine(lineX1, lineY1, lineX2, lineY2, "#000", transform, `${x0}${y0}`);
                    dispatch(addElement(line));
                },
                handleMouseUp: (e: React.MouseEvent) => {
                    dispatch(setMouseIsDown(false));

                    let { x, y } = getRelativePosition(e);
                    dispatch(removeElement(`${x0}${y0}`));

                    const lineXCenter = (x0 + x)/2;
                    const lineYCenter = (y0 + y)/2;

                    const lineX1 = x0 - lineXCenter;
                    const lineY1 = y0 - lineYCenter;
                    const lineX2 = x - lineXCenter;
                    const lineY2 = y - lineYCenter;

                    const transform = getTransformString({translateX: lineXCenter, translateY: lineYCenter, skewX: 0, skewY: 0, scaleX: 1, scaleY: 1, rotate: 0, rotateX: 0, rotateY: 0});
                    const line = makeLine(lineX1, lineY1, lineX2, lineY2, "#000", transform, `${listSize}`);
                    dispatch(addElement(line));
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
                        dispatch(setSelectedElement(""));
                        const transform = getTransformString({translateX: 0, translateY: 0, skewX: 0, skewY: 0, scaleX: 1, scaleY: 1, rotate: 0, rotateX: 0, rotateY: 0});
                        const path = makePath(filteredPathNodes, curveControlNodes, "black", "none", transform, `${listSize}`);
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
                    const transform = getTransformString({translateX: 0, translateY: 0, skewX: 0, skewY: 0, scaleX: 1, scaleY: 1, rotate: 0, rotateX: 0, rotateY: 0});
                    const path = makePath(pathNodes, curveControlNodes, "black", "none", transform, pathId || id);

                    dispatch(setSelectedElement(pathId || id));

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
                        const transform = getTransformString({translateX: 0, translateY: 0, skewX: 0, skewY: 0, scaleX: 1, scaleY: 1, rotate: 0, rotateX: 0, rotateY: 0});
                        const path = makePath(pathNodes, curveControlNodes, "black", "none", transform, pathId);
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
                        const transform = getTransformString({translateX: 0, translateY: 0, skewX: 0, skewY: 0, scaleX: 1, scaleY: 1, rotate: 0, rotateX: 0, rotateY: 0});
                        const path = makePath(pathNodes, curveControlNodes, "black", "none", transform, pathId);
                        dispatch(addElement(path));
                    }
                },
                handleMouseUp: (e: React.MouseEvent) => {
                    dispatch(setMouseIsDown(false));
                    if (e.nativeEvent.button !== 2) dispatch(setNodeCount(nodeCount + 1));
                },
            };
        case "resize node":
            return {
                handleMouseDown: (e: React.MouseEvent) => {
                    dispatch(setMouseIsDown(true));

                    let { x, y } = getRelativePosition(e);
                    
                    const nodeClicked = useNodeClicked(list, x, y);
                    if (!nodeClicked) return;

                    dispatch(setFirstPointCoordinates({ x0: nodeClicked.x, y0: nodeClicked.y }));
                    dispatch(setSelectedNode(nodeClicked));
                },
                handleMouseMove: (e: React.MouseEvent) => {
                    if (!mouseIsDown) return;
                    if (!selectedNode) return;

                    let { x, y } = getRelativePosition(e);

                    const targetElement = list.find(element => element.id === selectedElement);
                    
                    const resizedElement = resizeElement(targetElement, selectedNode, x, y, x0, y0);

                    dispatch(removeElement(selectedElement));
                    dispatch(addElement(resizedElement));

                    dispatch(removeElement(selectedOutline.id));
                    const center = getElementCenter(resizedElement);
                    const { width, height } = getElementDimensions(resizedElement);
                    const newSelectedOutline = makeSelectedOutline(center, width, height);
                    dispatch(addElement(newSelectedOutline));
                    dispatch(setSelectedOutline(newSelectedOutline));
                },
                handleMouseUp: (e: React.MouseEvent) => {
                    dispatch(setMouseIsDown(false));
                    dispatch(setSelectedNode(null));
                    dispatch(setFirstPointCoordinates({ x0: 0, y0: 0 }));
                },
        }
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