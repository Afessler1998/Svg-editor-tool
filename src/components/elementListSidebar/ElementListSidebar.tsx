import React from 'react';
import style from "../../styles/elementListSidebar.module.css";
import { RootState } from '../../redux-store/store';
import { useDispatch, useSelector } from 'react-redux';
import getElementName from '../../utils/getElementName';

const elementListSidebar = () => {

    const list = useSelector((state: RootState) => state.svgList.list);
    const dispatch = useDispatch();

    let key = -1;

    return (
        <div className={style.container}>
            {list.map((element) => <div className={style.listItem} key={key++}>{getElementName(element)}</div>)}
        </div>
    );
};

export default elementListSidebar;