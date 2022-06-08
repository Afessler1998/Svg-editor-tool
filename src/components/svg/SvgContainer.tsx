import React, { useState } from 'react'; 
import { RootState } from '../../redux-store/store';
import { useDispatch, useSelector } from 'react-redux';
import style from "../../styles/svg.module.css";
import { getEllipseSvg } from '../../utils/makeSvgElements/makeEllipse';
import { getRectSvg } from '../../utils/makeSvgElements/makeRect';
import { getLineSvg } from '../../utils/makeSvgElements/makeLine';
import { makeLine } from '../../utils/makeSvgElements/makeLine';
import getSvgEventHandlers from '../../utils/getSvgEventHandlers';
import { addElement, removeElement } from '../../redux-store/reducers/svgList';

const SvgContainer = () => {
    const list = useSelector((state: RootState) => state.svgList.list);
    const selectedTool = useSelector((state: RootState) => state.selectTool.selectedTool);

    const dispatch = useDispatch();

    const [downCoords, setDownCoords] = useState({x: -1, y: -1});

    const svgElementList = list.map((element) => {
        switch(element.type) {
            case "ellipse":
                return getEllipseSvg(element);
            case "rect":
                return getRectSvg(element);
            case "line":
                return getLineSvg(element);
            default:
                return;
        }
    });

    //const eventHandlers = getSvgEventHandlers(selectedTool);
    //const { handleClick } = eventHandlers;

    return (
        <div className={style.container}>
            <div
            className={style.mask}
            //onClick={handleClick}
            onMouseDown={(e: React.MouseEvent) => {
                const target = e.target as SVGElement;
                const containerBounds = target.getBoundingClientRect();

                const mouseX = Math.round(e.clientX - containerBounds.left);
                const mouseY = Math.round(e.clientY - containerBounds.top);

                setDownCoords({ x: mouseX, y: mouseY });
            }}
            onMouseMove={(e: React.MouseEvent) => {
                if (downCoords.x === -1) return;
                dispatch(removeElement(`${downCoords.x}${downCoords.y}`));

                const target = e.target as SVGElement;
                const containerBounds = target.getBoundingClientRect();

                const mouseX = Math.round(e.clientX - containerBounds.left);
                const mouseY = Math.round(e.clientY - containerBounds.top);

                const line = makeLine(downCoords.x, downCoords.y, mouseX, mouseY, "#000", `${downCoords.x}${downCoords.y}`);
                dispatch(addElement(line));
            }}
            onMouseUp={(e: React.MouseEvent) => {
                const target = e.target as SVGElement;
                const containerBounds = target.getBoundingClientRect();

                const mouseX = Math.round(e.clientX - containerBounds.left);
                const mouseY = Math.round(e.clientY - containerBounds.top);

                dispatch(removeElement(`${downCoords.x}${downCoords.y}`));
                const line = makeLine(downCoords.x, downCoords.y, mouseX, mouseY, "#000", `${downCoords.x}${downCoords.y}`);
                dispatch(addElement(line));

                setDownCoords({ x: -1, y: -1 });
            }}
            />
            <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" style={{ height: 400, width: 400 }}>
                {svgElementList}
            </svg>
        </div>
    );
};

export default SvgContainer;