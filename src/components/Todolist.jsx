import React, { useState } from "react";
import AddItemForm from "./AddItemForm";
import EditableTask from "./EditableTask";

const Todolist = ({ title, tasks = [], removeTask, changeFilter, addTask, changeStatus, changeTitle, filter, id, removeTodolist }) => {
    const [userTask, setuserTask] = useState();
    const [error, seterror] = useState(null);

    const addTasks = (title) => {
        addTask(title, id)
    }

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
            <button className="remove-todolist" onClick={() => removeTodolist(id)}>x</button>

            <AddItemForm addTask={addTasks} />

            <ul className="todo-list">

                {
                    tasks.map((task) => (

                        <li key={task.id} className={`todo-item ${task.isDone ? "is-done" : ""}`}>
                            <input type="checkbox" onChange={(e) => changeStatus(task.id, e.currentTarget.checked, id)} checked={task.isDone} />
                            <EditableTask title={task.title}
                                onChange={
                                    (newValue) => changeTitle(task.id, newValue, id)
                                }
                                
                            />
                            <span className="todo-text">
                                <button className="remove-btn" onClick={() => removeTask(task.id, id)}>x</button>
                            </span>
                        </li>
                    ))
                }
            </ul>
            <div className="actions">
                <button className={filter === 'all' ? "active-filter" : "actions-btn"} onClick={onAllClickedHandler}>All</button>
                <button className={filter === 'active' ? "active-filter" : "actions-btn"} onClick={onActiveClickedHandler}>Active</button>
                <button className={filter === 'completed' ? "active-filter" : "actions-btn"} onClick={onCompletedClickedHandler}>Completed</button>
            </div>
        </div>

    );
};



export default Todolist;

