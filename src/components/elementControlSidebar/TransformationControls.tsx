import React, { useState } from 'react';
import style from "../../styles/elementControlSidebar.module.css";
import { useSelector, useDispatch } from 'react-redux';
import { addElement, removeElement } from '../../redux-store/reducers/svgList';
import parseTransformString from '../../utils/parseTransformString';
import transformElement from '../../utils/transformElement';

const TransformationControls = () => {

    const dispatch = useDispatch();

    const svgList = useSelector((state: any) => state.svgList.list);
    const selectedElementId = useSelector((state: any) => state.svgList.selectedElement);
    const selectedElement = svgList.find((element: any) => element.id === selectedElementId);
    const transforms = parseTransformString(selectedElement.transform);
    const { translateX, translateY, skewX, skewY, scaleX, scaleY, rotate } = transforms;

    const [translateXText, setTranslateX] = useState(`${translateX}`);
    const [translateYText, setTranslateY] = useState(`${translateY}`);
    const [skewXText, setSkewX] = useState(`${skewX}`);
    const [skewYText, setSkewY] = useState(`${skewY}`);
    const [scaleXText, setScaleX] = useState(`${scaleX}`);
    const [scaleYText, setScaleY] = useState(`${scaleY}`);
    const [rotateText, setRotate] = useState(`${rotate}`);

    return (
        <div>
            <div className={style.controlHeading}>Transforms</div>
            <div className={style.lineSpacer}></div>
            <div className={style.controlGroup}>
                <div className={style.controlInputRow}>
                    <div className={style.controlLabel}>Position</div>
                    <div className={style.controlInputContainer}>
                        <input className={style.controlInput}
                        value={`${translateXText}`}
                        onChange={(e) => {
                            setTranslateX(e.target.value);
                            if (isNaN(parseFloat(e.target.value))) return;
                            const transformedElement = transformElement(selectedElement, 'translateX', parseFloat(e.target.value));
                            dispatch(removeElement(selectedElementId));
                            dispatch(addElement(transformedElement));
                        }}/>
                        X
                    </div>
                    <div className={style.controlInputContainer}>
                        <input className={style.controlInput}
                        value={`${translateYText}`}
                        onChange={(e) => {
                            setTranslateY(e.target.value);
                            if (isNaN(parseFloat(e.target.value))) return;
                            const transformedElement = transformElement(selectedElement, 'translateY', parseFloat(e.target.value));
                            dispatch(removeElement(selectedElementId));
                            dispatch(addElement(transformedElement));
                        }}
                        />
                        Y
                    </div>
                </div>
                <div className={style.controlInputRow}>
                    <div className={style.controlLabel}>Scale</div>
                    <div className={style.controlInputContainer}>
                        <input className={style.controlInput}
                        value={`${scaleXText}`}
                        onChange={(e) => {
                            setScaleX(e.target.value);
                            if (isNaN(parseFloat(e.target.value))) return;
                            const transformedElement = transformElement(selectedElement, 'scaleX', parseFloat(e.target.value));
                            dispatch(removeElement(selectedElementId));
                            dispatch(addElement(transformedElement));
                        }}
                        />
                        X
                    </div>
                    <div className={style.controlInputContainer}>
                        <input className={style.controlInput}
                        value={`${scaleYText}`}
                        onChange={(e) => {
                            setScaleY(e.target.value);
                            if (isNaN(parseFloat(e.target.value))) return;
                            const transformedElement = transformElement(selectedElement, 'scaleY', parseFloat(e.target.value));
                            dispatch(removeElement(selectedElementId));
                            dispatch(addElement(transformedElement));
                        }}
                        />
                        Y
                    </div>
                </div>
                <div className={style.controlInputRow}>
                    <div className={style.controlLabel}>Skew</div>
                    <div className={style.controlInputContainer}>
                        <input className={style.controlInput}
                        value={`${skewXText}`}
                        onChange={(e) => {
                            setSkewX(e.target.value);
                            if (isNaN(parseFloat(e.target.value))) return;
                            const transformedElement = transformElement(selectedElement, 'skewX', parseFloat(e.target.value));
                            dispatch(removeElement(selectedElementId));
                            dispatch(addElement(transformedElement));
                        }}
                        />
                        X
                    </div>
                    <div className={style.controlInputContainer}>
                        <input className={style.controlInput}
                        value={`${skewYText}`}
                        onChange={(e) => {
                            setSkewY(e.target.value);
                            if (isNaN(parseFloat(e.target.value))) return;
                            const transformedElement = transformElement(selectedElement, 'skewY', parseFloat(e.target.value));
                            dispatch(removeElement(selectedElementId));
                            dispatch(addElement(transformedElement));
                        }}
                        />
                        Y
                    </div>
                </div>
                <div className={style.controlInputRow}>
                    <div className={style.controlLabel}>Rotate</div>
                    <div className={style.controlInputContainer}>
                        <input className={style.controlInput}
                        value={`${rotateText}`}
                        onChange={(e) => {
                            setRotate(e.target.value);
                            if (isNaN(parseFloat(e.target.value))) return;
                            const transformedElement = transformElement(selectedElement, 'rotate', parseFloat(e.target.value));
                            dispatch(removeElement(selectedElementId));
                            dispatch(addElement(transformedElement));
                        }}
                        />
                        Deg
                    </div>
                    <div className={style.controlInputSpacer} />
                </div>
            </div>
        </div>
    );
};

export default TransformationControls;