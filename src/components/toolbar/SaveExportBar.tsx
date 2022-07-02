import React from 'react';
import style from '../../styles/toolbar.module.css';

const SaveExportBar = () => {
    return (
        <div className={style.saveExportBar}>
            <div onClick={() => console.log("Save")} className={style.saveButton}>Save</div>
            <div onClick={() => console.log("Export")} className={style.exportButton}>Export</div>
        </div>
    );
};

export default SaveExportBar;