import React, { useState } from 'react'

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

        ? <input value={changedTitle} onChange={onChangehandler} onBlur={activateViewMode} autoFocus />
        : <span onDoubleClick={activateEditMode}>{title}</span>


}

export default EditableTask