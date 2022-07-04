import React from 'react'; 
import { RootState } from '../../redux-store/store';
import { useSelector } from 'react-redux';
import style from "../../styles/svg.module.css";
import ConvertSvgObjectsToElements from '../../utils/convertSvgObjectsToElement';
import getSvgEventHandlers from '../../utils/getSvgEventHandlers';

const SvgContainer = ({ width, height }: { width: number, height: number }) => {
    const list = useSelector((state: RootState) => state.svgList.list);
    const selectedTool = useSelector((state: RootState) => state.selectTool.selectedTool);
    const selectedElement = useSelector((state: RootState) => state.svgList.selectedElement);

    const svgElementList = ConvertSvgObjectsToElements(list, selectedElement);

    const eventHandlers = getSvgEventHandlers(selectedTool);
    const { handleMouseDown, handleMouseMove, handleMouseUp } = eventHandlers;

    return (
        <div className={style.container}>
            {!selectedElement && <div
            className={style.mask}
            onContextMenu={(e) => e.preventDefault()}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            />}
            <svg viewBox={`0 0 ${width} ${height}`} xmlns="http://www.w3.org/2000/svg" style={{ width, height }} >
                {svgElementList}
            </svg>
        </div>
    );
};

export default SvgContainer;