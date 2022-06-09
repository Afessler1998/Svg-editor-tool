import React from 'react'; 
import { RootState } from '../../redux-store/store';
import { useSelector } from 'react-redux';
import style from "../../styles/svg.module.css";
import { getEllipseSvg } from '../../utils/makeSvgElements/makeEllipse';
import { getRectSvg } from '../../utils/makeSvgElements/makeRect';
import { getLineSvg } from '../../utils/makeSvgElements/makeLine';
import getSvgEventHandlers from '../../utils/getSvgEventHandlers';

const SvgContainer = ({ width, height }: { width: number, height: number }) => {
    const list = useSelector((state: RootState) => state.svgList.list);
    const selectedTool = useSelector((state: RootState) => state.selectTool.selectedTool);

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

    const eventHandlers = getSvgEventHandlers(selectedTool);
    const { handleClick, handleMouseDown, handleMouseMove, handleMouseUp } = eventHandlers;

    return (
        <div className={style.container}>
            <div
            className={style.mask}
            onClick={handleClick}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            />
            <svg viewBox={`0 0 ${width} ${height}`} xmlns="http://www.w3.org/2000/svg" style={{ width, height }} >
                {svgElementList}
            </svg>
        </div>
    );
};

export default SvgContainer;