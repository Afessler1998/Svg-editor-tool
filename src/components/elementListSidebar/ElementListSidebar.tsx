import React from 'react';
import style from "../../styles/elementListSidebar.module.css";
import { RootState } from '../../redux-store/store';
import { useDispatch, useSelector } from 'react-redux';
import getElementName from '../../utils/getElementName';
import { addElement, removeElement, setSelectedElement, setSelectedOutline } from '../../redux-store/reducers/svgList';
import getElementCenter from '../../utils/math/getElementCenter';
import getElementDimensions from '../../utils/math/getElementDimensions';
import { makeSelectedOutline } from '../../utils/makeSvgElements/makeSelectedOutline';
import { setSelectedTool } from '../../redux-store/reducers/selectTool';

const elementListSidebar = () => {

    const list = useSelector((state: RootState) => state.svgList.list);
    const selectedElement = useSelector((state: RootState) => state.svgList.selectedElement);
    const selectedTool = useSelector((state: RootState) => state.selectTool.selectedTool);
    const dispatch = useDispatch();

    return (
        <div className={style.container}>
            {list.map((element) => {
                if (element.type === "selectedOutline") return null;
                return <div 
                className={element.id === selectedElement ? style.listItemSelected : style.listItem} 
                key={element.id}
                onClick={() => {
                    dispatch(removeElement("selectedOutline"));
                    dispatch(setSelectedTool("resize node"));

                    if (selectedElement === element.id) {
                        dispatch(setSelectedElement(null));
                        dispatch(setSelectedOutline(null));
                        dispatch(setSelectedTool(""));
                        return;
                    }

                    dispatch(setSelectedElement(element.id));

                    const targetElement = list.find((targetElement) => targetElement.id === element.id);
                    const center = getElementCenter(targetElement);
                    const { width, height } = getElementDimensions(targetElement);
                    const selectedOutline = makeSelectedOutline(center, width, height);
                    dispatch(addElement(selectedOutline));
                    dispatch(setSelectedOutline(selectedOutline));
                }}>
                    {getElementName(element)}
                </div>;
            })}
        </div>
    );
};

export default elementListSidebar;