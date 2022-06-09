import React from "react";
import { RootState } from "../redux-store/store";
import { useDispatch, useSelector } from "react-redux";
import { addElement, removeElement, setFirstPointCoordinates } from "../redux-store/reducers/svgList";
import { makeRect } from "./makeSvgElements/makeRect";
import { makeEllipse } from "./makeSvgElements/makeEllipse";
import { makeLine } from "./makeSvgElements/makeLine";
import { colorPallete } from "../colorPallete";

export default function getSvgEventHandlers(selectedTool: string) {

    const firstPointCoordinates = useSelector((state: RootState) => state.svgList.firstPointCoordinates);

    const dispatch = useDispatch();

    switch(selectedTool) {
        case "rect":
            return {
                handleClick: (e: React.MouseEvent) => {
                    const target = e.target as SVGElement;
                    const containerBounds = target.getBoundingClientRect();

                    const mouseX = Math.round(e.clientX - containerBounds.left);
                    const mouseY = Math.round(e.clientY - containerBounds.top);

                    const rect = makeRect(50, 50, mouseX, mouseY, colorPallete.babyBlue, `${mouseX}${mouseY}`);

                    dispatch(addElement(rect));
                },
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
        case "ellipse":
            return {
                handleClick: (e: React.MouseEvent) => {
                    const target = e.target as SVGElement;
                    const containerBounds = target.getBoundingClientRect();

                    const mouseX = Math.round(e.clientX - containerBounds.left);
                    const mouseY = Math.round(e.clientY - containerBounds.top);

                    const ellipse = makeEllipse(50, 50, mouseX, mouseY, colorPallete.babyBlue, `${mouseX}${mouseY}`);

                    dispatch(addElement(ellipse));
                },
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
        case "polygon":
            return {
                handleClick: () => {
                    return;
                },
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
        case "line":
            return {
                handleClick: () => {
                    return;
                },
                handleMouseDown: (e: React.MouseEvent) => {
                    const target = e.target as SVGElement;
                const containerBounds = target.getBoundingClientRect();

                const mouseX = Math.round(e.clientX - containerBounds.left);
                const mouseY = Math.round(e.clientY - containerBounds.top);

                dispatch(setFirstPointCoordinates({ x: mouseX, y: mouseY }));
                },
                handleMouseMove: (e: React.MouseEvent) => {
                    if (firstPointCoordinates.x === -1) return;
                    dispatch(removeElement(`${firstPointCoordinates.x}${firstPointCoordinates.y}`));

                    const target = e.target as SVGElement;
                    const containerBounds = target.getBoundingClientRect();

                    const mouseX = Math.round(e.clientX - containerBounds.left);
                    const mouseY = Math.round(e.clientY - containerBounds.top);

                    const line = makeLine(firstPointCoordinates.x, firstPointCoordinates.y, mouseX, mouseY, "#000", `${firstPointCoordinates.x}${firstPointCoordinates.y}`);
                    dispatch(addElement(line));
                },
                handleMouseUp: (e: React.MouseEvent) => {
                    const target = e.target as SVGElement;
                    const containerBounds = target.getBoundingClientRect();

                    const mouseX = Math.round(e.clientX - containerBounds.left);
                    const mouseY = Math.round(e.clientY - containerBounds.top);

                    dispatch(removeElement(`${firstPointCoordinates.x}${firstPointCoordinates.y}`));
                    const line = makeLine(firstPointCoordinates.x, firstPointCoordinates.y, mouseX, mouseY, "#000", `${firstPointCoordinates.x}${firstPointCoordinates.y}`);
                    dispatch(addElement(line));

                    dispatch(setFirstPointCoordinates({ x: -1, y: -1 }));
                },
            };
        default:
            return {
                handleClick: () => {
                    return;
                },
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