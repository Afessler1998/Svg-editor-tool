import React from 'react';
import style from "../../styles/elementListSidebar.module.css";
import { RootState } from '../../redux-store/store';
import { useDispatch, useSelector } from 'react-redux';
import getElementName from '../../utils/getElementName';
import { setSelectedElement } from '../../redux-store/reducers/svgList';

const elementListSidebar = () => {

    const list = useSelector((state: RootState) => state.svgList.list);
    const selectedElement = useSelector((state: RootState) => state.svgList.selectedElement);
    const dispatch = useDispatch();

    return (
        <div className={style.container}>
            {list.map((element) => 
                <div 
                className={element.id === selectedElement ? style.listItemSelected : style.listItem} 
                key={element.id}
                onClick={() => {
                    dispatch(setSelectedElement(element.id));
                }}>
                    {getElementName(element)}
                </div>)}
        </div>
    );
};

export default elementListSidebar;