import React, { useState } from "react";

const Todolist = ({ title, tasks = [], removeTask, changeFilter, addTask, changeStatus,filter }) => {
    const [userTask, setuserTask] = useState();
    const [error, seterror] = useState(null);

    const userTaskHandler = (e) => {
        setuserTask(e.currentTarget.value);
    };

    const onPressHandler = (e) => {
        seterror(null);
        if (e.key === "Enter" && !!userTask) {
            addTask(userTask);
            setuserTask("");
        }
    };

    const addTaskHandler = () => {
        if (!!userTask && userTask.trim() !== "") {

            addTask(userTask);
            setuserTask("");
        } else {
            seterror("Please enter a task");
        }

    };

    const onAllClickedHandler = (e) => {
        changeFilter("all");
    };
    const onActiveClickedHandler = (e) => {
        changeFilter("active");
    };
    const onCompletedClickedHandler = (e) => {
        changeFilter("completed");
    };

    return (
        <div style={{ marginRight: "50px" }}>
            <h1>{title}</h1>

            <input
                value={userTask}
                onChange={userTaskHandler}
                onKeyPress={onPressHandler}
                type="text"
                placeholder="Enter task"
                className={error ? "error" : ""}
            />

            <button type="submit" onClick={addTaskHandler}>
                +
            </button>
            {error && <div className="error-message">{error}</div>}

            <ul>
                {
                    tasks.map((task) => (

                        <li key={task.id} className={task.isDone? "is-done": ""}>
                            <input type="checkbox" onChange={(e) => changeStatus(task.id, e.currentTarget.checked)} checked={task.isDone} />
                            {task.title}
                            <span>
                                <button onClick={() => removeTask(task.id)}>x</button>
                            </span>
                        </li>
                    ))
                }
            </ul>
            <div>
                <button className={filter==='all' ? "active-filter" : ""} onClick={onAllClickedHandler}>All</button>
                <button className={filter==='active' ? "active-filter" : ""} onClick={onActiveClickedHandler}>Active</button>
                <button className={filter==='completed' ? "active-filter" : ""} onClick={onCompletedClickedHandler}>Completed</button>
            </div>
        </div>
    );
};

export default Todolist;
