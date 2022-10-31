import React from 'react';
import style from "../../styles/elementControlSidebar.module.css";
import TransformationControls from './TransformationControls';
import { useSelector } from 'react-redux';

const elementControlSidebar = () => {4
    const elementSelected = useSelector((state: any) => state.svgList.selectedElement);
    return (
        <div className={style.container}>
            {elementSelected && <TransformationControls />}
        </div>
    );
};

export default elementControlSidebar;