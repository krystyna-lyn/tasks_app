import AddItemForm from "./AddItemForm";
import EditableTask from "./EditableTask";
import { Box, Button, IconButton, Checkbox } from "@mui/material";
import { Delete } from "@mui/icons-material";


const Todolist = ({ title, tasks = [], removeTask, changeFilter, addTask, changeStatus, changeTitle, filter, id, removeTodolist, changeTodolistTitle }) => {

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

        <Box>

            <h1 className="todo-title">
                <EditableTask
                    title={title}
                    onChange={(newValue) => changeTodolistTitle(newValue, id)}
                />
                <IconButton onClick={() => removeTodolist(id)}>
                    <Delete color='primary' />
                </IconButton>
            </h1>

            <AddItemForm addTask={addTasks} />

            <div className="todo-list">

                {
                    tasks.map((task) => (

                        <div key={task.id} className={`todo-item ${task.isDone ? "is-done" : ""}`}>


                            <Checkbox
                                onChange={(e) => changeStatus(task.id, e.currentTarget.checked, id)}
                                checked={task.isDone}
                            />

                            <EditableTask title={task.title}
                                onChange={
                                    (newValue) => changeTitle(task.id, newValue, id)
                                }

                            />

                            <IconButton onClick={() => removeTask(task.id, id)}>
                                <Delete color='primary' />
                            </IconButton>
                        </div>
                    ))
                }
            </div>

            <div className="actions">
                <Button
                    variant={filter === 'all' ? "outlined" : "text"}
                    onClick={onAllClickedHandler} >All
                </Button>
                <Button
                    variant={filter === 'active' ? "outlined" : "text"}
                    onClick={onActiveClickedHandler} >Active
                </Button>
                <Button
                    variant={filter === 'completed' ? "outlined" : "text"}
                    onClick={onCompletedClickedHandler} >Completed
                </Button>
            </div>

        </Box>

    );
};

export default Todolist;

