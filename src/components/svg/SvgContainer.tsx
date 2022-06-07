import React from 'react'; 
import { RootState } from '../../redux-store/store';
import { useSelector, useDispatch } from 'react-redux';
import { addElement } from '../../redux-store/reducers/svgList';
import style from "../../styles/svg.module.css";
import { makeEllipse, getEllipseSvg } from '../../makeSvgElements/makeEllipse';
import { colorPallete } from "../../colorPallete";

const SvgContainer = () => {
    const list = useSelector((state: RootState) => state.svgList.list);
    const dispatch = useDispatch();

    function handleClick(e: React.MouseEvent) {
        const target = e.target as SVGElement;
        const containerBounds = target.getBoundingClientRect();

        const mouseX = Math.round(e.clientX - containerBounds.left);
        const mouseY = Math.round(e.clientY - containerBounds.top);

        const ellipse = makeEllipse(100, 50, mouseX, mouseY, colorPallete.babyBlue, `${mouseX}${mouseY}`);

        dispatch(addElement(getEllipseSvg(ellipse)));
    }

    return (
        <div className={style.container}>
            <svg
            viewBox="0 0 400 400"
            xmlns="http://www.w3.org/2000/svg"
            onClick={handleClick}
            >
                {list}
            </svg>
        </div>
    );
};

export default SvgContainer;