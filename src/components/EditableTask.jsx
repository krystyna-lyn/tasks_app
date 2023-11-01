import React, { useState } from 'react';
import { TextField } from '@mui/material';

const EditableTask = ({ title, onChange }) => {

    let [editMode, setEditMode] = useState(false);
    let [changedTitle, setChangedTitle] = useState("");


    const activateEditMode = () => {
        setEditMode(true);
        setChangedTitle(title)
    }
    const activateViewMode = () => {
        setEditMode(false);
        onChange(changedTitle);
    }
    const onChangehandler = (e) => setChangedTitle(e.currentTarget.value);

    return editMode

        ? <TextField value={changedTitle} onChange={onChangehandler} onBlur={activateViewMode} autoFocus />
        : <span onDoubleClick={activateEditMode}>{title}</span>


}

export default EditableTask