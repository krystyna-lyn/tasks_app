import React, { useState } from "react";

const Todolist = ({ title, tasks = [], removeTask, changeFilter, addTask, changeStatus,filter, id }) => {
    const [userTask, setuserTask] = useState();
    const [error, seterror] = useState(null);

    const userTaskHandler = (e) => {
        setuserTask(e.currentTarget.value);
    };

    const onPressHandler = (e) => {
        seterror(null);
        if (e.key === "Enter" && !!userTask) {
            addTask(userTask,id);
            setuserTask("");
        }
    };

    const addTaskHandler = () => {
        
        seterror(null);
        if (!!userTask && userTask.trim() !== "") {

            addTask(userTask,id);
            setuserTask("");
        } else {
            seterror("Please enter a task");
        }

    };

    const onAllClickedHandler = (e) => {
        changeFilter("all", id);
    };
    const onActiveClickedHandler = (e) => {
        changeFilter("active", id);
    };
    const onCompletedClickedHandler = (e) => {
        changeFilter("completed", id);
    };

    return (
        <div className="todo-container">
         
            <h1 className="todo-title">{title}</h1>

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

            <ul className="todo-list">
                {
                    tasks.map((task) => (

                        <li key={task.id} className={`todo-item ${task.isDone ? "is-done" : ""}`}>
                            <input type="checkbox" onChange={(e) => changeStatus(task.id, e.currentTarget.checked, id)} checked={task.isDone} />
                            {task.title}
                            <span className="todo-text">
                                <button className="remove-btn" onClick={() => removeTask(task.id, id)}>x</button>
                            </span>
                        </li>
                    ))
                }
            </ul>
            <div className="actions">
                <button className={filter==='all' ? "active-filter" : "actions-btn"} onClick={onAllClickedHandler}>All</button>
                <button className={filter==='active' ? "active-filter" : "actions-btn"} onClick={onActiveClickedHandler}>Active</button>
                <button className={filter==='completed' ? "active-filter" : "actions-btn"} onClick={onCompletedClickedHandler}>Completed</button>
            </div>
            </div> 
        
    );
};

export default Todolist;
