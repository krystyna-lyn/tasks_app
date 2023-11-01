import React from 'react';
import { useState } from 'react';
import { Box, IconButton, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const AddItemForm = ({ addTask, id }) => {

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

        <Box>
            <TextField
                id="filled-basic"
                label="Enter task"
                variant="standard"
                autoFocus
                required
                error={!!error}
                helperText={error}

                value={userTask}
                onChange={userTaskHandler}
                onKeyPress={onPressHandler}
                type="text"
            />
            <IconButton sx={{ margin: '10px' }} type="submit" color="primary" onClick={addTaskHandler}>
                <AddIcon />
            </IconButton>
        </Box>

    )
}

export default AddItemForm