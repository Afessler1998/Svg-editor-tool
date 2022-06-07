import React from 'react'; 
import { RootState } from '../../redux-store/store';
import { useSelector } from 'react-redux';
import style from "../../styles/svg.module.css";
import getSvgEventHandlers from '../../utils/getSvgEventHandlers';

const SvgContainer = () => {
    const list = useSelector((state: RootState) => state.svgList.list);
    const selectedTool = useSelector((state: RootState) => state.selectTool.selectedTool);

    const eventHandlers = getSvgEventHandlers(selectedTool);
    const { handleClick, handleMouseover } = eventHandlers;

    return (
        <div className={style.container}>
            <svg
            viewBox="0 0 400 400"
            xmlns="http://www.w3.org/2000/svg"
            onClick={handleClick}
            onMouseOver={handleMouseover}
            >
                {list}
            </svg>
        </div>
    );
};

export default SvgContainer;