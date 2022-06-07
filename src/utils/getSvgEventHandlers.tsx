import React from "react";
import { useDispatch } from "react-redux";
import { addElement } from "../redux-store/reducers/svgList";
import { makeRect, getRectSvg } from "../makeSvgElements/makeRect";
import { makeEllipse, getEllipseSvg } from "../makeSvgElements/makeEllipse";
import { colorPallete } from "../colorPallete";

export default function getSvgEventHandlers(selectedTool: string) {

    const dispatch = useDispatch();

    switch(selectedTool) {
        case "Rect":
            return {
                handleClick: (e: React.MouseEvent) => {
                    const target = e.target as SVGElement;
                    const containerBounds = target.getBoundingClientRect();

                    const mouseX = Math.round(e.clientX - containerBounds.left);
                    const mouseY = Math.round(e.clientY - containerBounds.top);

                    const rect = makeRect(50, 50, mouseX, mouseY, colorPallete.babyBlue, `${mouseX}${mouseY}`);

                    dispatch(addElement(getRectSvg(rect)));
                },
                handleMouseover: () => {
                    return;
                }
            };
        case "Ellipse":
            return {
                handleClick: (e: React.MouseEvent) => {
                    const target = e.target as SVGElement;
                    const containerBounds = target.getBoundingClientRect();

                    const mouseX = Math.round(e.clientX - containerBounds.left);
                    const mouseY = Math.round(e.clientY - containerBounds.top);

                    const ellipse = makeEllipse(50, 50, mouseX, mouseY, colorPallete.babyBlue, `${mouseX}${mouseY}`);

                    dispatch(addElement(getEllipseSvg(ellipse)));
                },
                handleMouseover: () => {
                    return;
                }
            };
        case "Polygon":
            return {
                handleClick: () => {
                    return;
                },
                handleMouseover: () => {
                    return;
                }
            };
        case "Line":
            return {
                handleClick: () => {
                    return;
                },
                handleMouseover: () => {
                    return;
                },
            };
        default:
            return {
                handleClick: () => {
                    return;
                },
                handleMouseover: () => {
                    return;
                }
            };
    }
}