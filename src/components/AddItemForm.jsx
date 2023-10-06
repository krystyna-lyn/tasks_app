import React from 'react';
import { useState } from 'react';

const AddItemForm = ({addTask,id}) => {

    const [userTask, setuserTask] = useState();
    const [error, seterror] = useState(null);

    const userTaskHandler = (e) => {
        setuserTask(e.currentTarget.value);
    };

    const onPressHandler = (e) => {
        seterror(null);
        if (e.key === "Enter" && !!userTask) {
            addTask(userTask, id);
            setuserTask("");
        }
    };

    const addTaskHandler = () => {

        seterror(null);
        if (!!userTask && userTask.trim() !== "") {

            addTask(userTask, id);
            setuserTask("");
        } else {
            seterror("Please enter a task");
        }
    };


    return (
        <div>
            <input
                value={userTask}
                onChange={userTaskHandler}
                onKeyPress={onPressHandler}
                type="text"
                placeholder="Enter task"
                className={`todo-input ${error ? "error" : ""}`}
            />

            <button type="submit" className="add-btn" onClick={addTaskHandler}>
                +
            </button>
            {error && <div className="error-message">{error}</div>}
        </div>
    )
}

export default AddItemForm