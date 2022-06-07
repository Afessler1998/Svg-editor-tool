import React from 'react';
import { RootState } from '../../redux-store/store';
import { useSelector, useDispatch } from 'react-redux';
import { addElement } from '../../redux-store/reducers/svgList';
import style from "../../styles/svg.module.css";

const SvgContainer = () => {
    const list = useSelector((state: RootState) => state.svgList.list);
    console.log(list);
    const dispatch = useDispatch();

    return (
        <div className={style.container}>
            <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
                {list}
            </svg>
            <button onClick={() => dispatch(addElement(<rect width={100} height={100} x={50} y={50} fill={"black"} key={"5050"} />))}>add rectangle</button>
        </div>
    );
};

export default SvgContainer;