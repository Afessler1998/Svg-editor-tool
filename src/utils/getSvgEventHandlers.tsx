import React from "react";
import { RootState } from "../redux-store/store";
import { useDispatch, useSelector } from "react-redux";
import { addElement, removeElement, setFirstPointCoordinates } from "../redux-store/reducers/svgList";
import { makeRect } from "./makeSvgElements/makeRect";
import { makeEllipse } from "./makeSvgElements/makeEllipse";
import { makeLine } from "./makeSvgElements/makeLine";
import { makePolygon } from "./makeSvgElements/makePolygon";
import { colorPallete } from "../colorPallete";
import { calcPolygonVertices } from "./math/calcPolygonVertices";
import { calcStarVertices } from "./math/calcStarVertices";
import calcHypotenuse from "./math/calcHypotenuse";

export default function getSvgEventHandlers(selectedTool: string) {

    const firstPointCoordinates = useSelector((state: RootState) => state.svgList.firstPointCoordinates);

    const { x, y } = firstPointCoordinates;

    const dispatch = useDispatch();

    switch(selectedTool) {
        case "rect":
            return {
                handleMouseDown: (e: React.MouseEvent) => {
                    const target = e.target as SVGElement;
                    const containerBounds = target.getBoundingClientRect();

                    const mouseX = Math.round(e.clientX - containerBounds.left);
                    const mouseY = Math.round(e.clientY - containerBounds.top);

                    dispatch(setFirstPointCoordinates({ x: mouseX, y: mouseY }));
                },
                handleMouseMove: (e: React.MouseEvent) => {
                    if (x === -1) return;
                    dispatch(removeElement(`${x}${y}`));

                    const target = e.target as SVGElement;
                    const containerBounds = target.getBoundingClientRect();

                    const mouseX = Math.round(e.clientX - containerBounds.left);
                    const mouseY = Math.round(e.clientY - containerBounds.top);

                    const width = mouseX - x;
                    const height = mouseY - y;

                    let xPosition = x;
                    let yPosition = y;

                    if (width < 0) xPosition = mouseX;
                    if (height < 0) yPosition = mouseY;

                    const rect = makeRect(Math.abs(width), Math.abs(height), xPosition, yPosition, colorPallete.babyBlue, `${x}${y}`);
                    dispatch(addElement(rect));
                },
                handleMouseUp: (e: React.MouseEvent) => {
                    dispatch(removeElement(`${x}${y}`));

                    const target = e.target as SVGElement;
                    const containerBounds = target.getBoundingClientRect();

                    const mouseX = Math.round(e.clientX - containerBounds.left);
                    const mouseY = Math.round(e.clientY - containerBounds.top);
                    
                    const width = mouseX - x;
                    const height = mouseY - y;

                    let xPosition = x;
                    let yPosition = y;

                    if (width < 0) xPosition = mouseX;
                    if (height < 0) yPosition = mouseY;

                    const rect = makeRect(Math.abs(width), Math.abs(height), xPosition, yPosition, colorPallete.babyBlue, `${x}${y}`);
                    dispatch(addElement(rect));

                    dispatch(setFirstPointCoordinates({ x: -1, y: -1 }));
                }
            };
        case "ellipse":
            return {
                handleMouseDown: (e: React.MouseEvent) => {
                    const target = e.target as SVGElement;
                    const containerBounds = target.getBoundingClientRect();

                    const mouseX = Math.round(e.clientX - containerBounds.left);
                    const mouseY = Math.round(e.clientY - containerBounds.top);

                    dispatch(setFirstPointCoordinates({ x: mouseX, y: mouseY }));
                },
                handleMouseMove: (e: React.MouseEvent) => {
                    if (x === -1) return;
                    dispatch(removeElement(`${x}${y}`));

                    const target = e.target as SVGElement;
                    const containerBounds = target.getBoundingClientRect();

                    const mouseX = Math.round(e.clientX - containerBounds.left);
                    const mouseY = Math.round(e.clientY - containerBounds.top);

                    const width = Math.abs(mouseX - x);
                    const height = Math.abs(mouseY - y);

                    const ellipse = makeEllipse(width, height, x, y, colorPallete.babyBlue, `${x}${y}`);
                    dispatch(addElement(ellipse));
                },
                handleMouseUp: (e: React.MouseEvent) => {
                    dispatch(removeElement(`${x}${y}`));

                    const target = e.target as SVGElement;
                    const containerBounds = target.getBoundingClientRect();

                    const mouseX = Math.round(e.clientX - containerBounds.left);
                    const mouseY = Math.round(e.clientY - containerBounds.top);

                    const width = Math.abs(mouseX - x);
                    const height = Math.abs(mouseY - y);

                    const ellipse = makeEllipse(width, height, x, y, colorPallete.babyBlue, `${x}${y}`);
                    dispatch(addElement(ellipse));

                    dispatch(setFirstPointCoordinates({ x: -1, y: -1 }));
                }
            };
        case "polygon":
            return {
                handleMouseDown: (e: React.MouseEvent) => {
                    const target = e.target as SVGElement;
                    const containerBounds = target.getBoundingClientRect();

                    const mouseX = Math.round(e.clientX - containerBounds.left);
                    const mouseY = Math.round(e.clientY - containerBounds.top);

                    dispatch(setFirstPointCoordinates({ x: mouseX, y: mouseY }));
                },
                handleMouseMove: (e: React.MouseEvent) => {
                    if (x === -1) return;
                    dispatch(removeElement(`${x}${y}`));

                    const target = e.target as SVGElement;
                    const containerBounds = target.getBoundingClientRect();

                    const mouseX = Math.round(e.clientX - containerBounds.left);
                    const mouseY = Math.round(e.clientY - containerBounds.top);

                    const radius = calcHypotenuse(mouseX - x, mouseY - y);
                    const rotation = Math.atan2(mouseY - y, mouseX - x);

                    const polygonVertices = calcPolygonVertices(5, radius, {x, y}, rotation);
                    const polygon = makePolygon(polygonVertices, colorPallete.babyBlue, `${x}${y}`);

                    dispatch(addElement(polygon));
                },
                handleMouseUp: (e: React.MouseEvent) => {
                    dispatch(removeElement(`${x}${y}`));

                    const target = e.target as SVGElement;
                    const containerBounds = target.getBoundingClientRect();

                    const mouseX = Math.round(e.clientX - containerBounds.left);
                    const mouseY = Math.round(e.clientY - containerBounds.top);

                    const radius = calcHypotenuse(mouseX - x, mouseY - y);
                    const rotation = Math.atan2(mouseY - y, mouseX - x);

                    const polygonVertices = calcPolygonVertices(5, radius, {x, y}, rotation);
                    const polygon = makePolygon(polygonVertices, colorPallete.babyBlue, `${x}${y}`);
                    dispatch(addElement(polygon));

                    dispatch(setFirstPointCoordinates({ x: -1, y: -1 }));
                }
            };
        case "star":
            return {
                handleMouseDown: (e: React.MouseEvent) => {
                    const target = e.target as SVGElement;
                    const containerBounds = target.getBoundingClientRect();
    
                    const mouseX = Math.round(e.clientX - containerBounds.left);
                    const mouseY = Math.round(e.clientY - containerBounds.top);
                    
                    dispatch(setFirstPointCoordinates({ x: mouseX, y: mouseY }));
                },
                handleMouseMove: (e: React.MouseEvent) => {
                    if (x === -1) return;
                    dispatch(removeElement(`${x}${y}`));
    
                    const target = e.target as SVGElement;
                    const containerBounds = target.getBoundingClientRect();
    
                    const mouseX = Math.round(e.clientX - containerBounds.left);
                    const mouseY = Math.round(e.clientY - containerBounds.top);
    
                    const radius = calcHypotenuse(mouseX - x, mouseY - y);
                    const rotation = Math.atan2(mouseY - y, mouseX - x);
    
                    const polygonVertices = calcStarVertices(5, radius, {x, y}, rotation, 0.4);
                    const polygon = makePolygon(polygonVertices, colorPallete.babyBlue, `${x}${y}`);
    
                    dispatch(addElement(polygon));
                },
                handleMouseUp: (e: React.MouseEvent) => {
                    dispatch(removeElement(`${x}${y}`));
    
                    const target = e.target as SVGElement;
                    const containerBounds = target.getBoundingClientRect();
    
                    const mouseX = Math.round(e.clientX - containerBounds.left);
                    const mouseY = Math.round(e.clientY - containerBounds.top);
    
                    const radius = calcHypotenuse(mouseX - x, mouseY - y);
                    const rotation = Math.atan2(mouseY - y, mouseX - x);
    
                    const polygonVertices = calcStarVertices(5, radius, {x, y}, rotation, 0.4);
                    const polygon = makePolygon(polygonVertices, colorPallete.babyBlue, `${x}${y}`);
                    dispatch(addElement(polygon));
    
                    dispatch(setFirstPointCoordinates({ x: -1, y: -1 }));
                }
            };
        case "line":
            return {
                handleMouseDown: (e: React.MouseEvent) => {
                    const target = e.target as SVGElement;
                    const containerBounds = target.getBoundingClientRect();

                    const mouseX = Math.round(e.clientX - containerBounds.left);
                    const mouseY = Math.round(e.clientY - containerBounds.top);

                    dispatch(setFirstPointCoordinates({ x: mouseX, y: mouseY }));
                },
                handleMouseMove: (e: React.MouseEvent) => {
                    if (x === -1) return;
                    dispatch(removeElement(`${x}${y}`));

                    const target = e.target as SVGElement;
                    const containerBounds = target.getBoundingClientRect();

                    const mouseX = Math.round(e.clientX - containerBounds.left);
                    const mouseY = Math.round(e.clientY - containerBounds.top);

                    const line = makeLine(x, y, mouseX, mouseY, "#000", `${x}${y}`);
                    dispatch(addElement(line));
                },
                handleMouseUp: (e: React.MouseEvent) => {
                    dispatch(removeElement(`${x}${y}`));

                    const target = e.target as SVGElement;
                    const containerBounds = target.getBoundingClientRect();

                    const mouseX = Math.round(e.clientX - containerBounds.left);
                    const mouseY = Math.round(e.clientY - containerBounds.top);

                    const line = makeLine(x, y, mouseX, mouseY, "#000", `${x}${y}`);
                    dispatch(addElement(line));

                    dispatch(setFirstPointCoordinates({ x: -1, y: -1 }));
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