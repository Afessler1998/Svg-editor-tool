import React from 'react';
import style from "../../styles/toolbar.module.css";
import { RootState } from '../../redux-store/store';
import { setSelectedTool } from '../../redux-store/reducers/selectTool';
import { useDispatch, useSelector } from 'react-redux';

const DropdownMenu = ({ title, items }) => {
    const selectedTool = useSelector((state: RootState) => state.selectTool.selectedTool);
    const dispatch = useDispatch();

    return (
        <div className={style.dropdown}>
            {title}
            <div className={style.dropdownContent}>
                {items.map(({ title, tool }) => {
                    return <div onClick={() => dispatch(setSelectedTool(tool))} className={selectedTool === tool ? style.dropdownItemSelected : style.dropdownItem} key={title}>{title}</div>
                })}
            </div>
        </div>
    );
};

export default DropdownMenu;