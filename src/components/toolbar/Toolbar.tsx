import React from 'react';
import style from "../../styles/toolbar.module.css";
import ProjectTitlebar from './ProjectTitlebar';
import SaveExportBar from './SaveExportBar';
import DropdownMenu from './DropdownMenu';

const Toolbar = () => {
    return (
        <div className={style.container}>
            <ProjectTitlebar />
            <DropdownMenu title="Tools" items={[
                {title: "Resize Tool", tool: "resize"},
                {title: "Transform Tool", tool: "transform"},
                {title: "Node Tool", tool: "node"},
            ]} />
            <DropdownMenu title="Elements" items={[
                {title: "Ellipse", tool: "ellipse"},
                {title: "Rectangle", tool: "rect"},
                {title: "Line", tool: "line"},
                {title: "Polygon", tool: "polygon"},
                {title: "Star", tool: "star"},
                {title: "Path", tool: "path"},
            ]}/>
            <SaveExportBar />
        </div>
    );
};

export default Toolbar;