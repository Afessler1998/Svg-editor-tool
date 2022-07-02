import React from 'react';
import style from "../../styles/toolbar.module.css";
import { RootState } from '../../redux-store/store';
import { useDispatch, useSelector } from 'react-redux';
import { setTitle } from '../../redux-store/reducers/project';

const ProjectTitlebar = () => {

    const title = useSelector((state: RootState) => state.project.title);
    const dispatch = useDispatch();

    return (
        <div className={style.projectTitlebar}>
            <input defaultValue={title} onChange={(e) => dispatch(setTitle(e.target.value))} className={style.titleInput} />
        </div>
    );
};

export default ProjectTitlebar;