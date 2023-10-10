import React from "react";
import "./App.css";
import Todolist from "./components/Todolist";
import { useState } from "react";
import { v1 } from "uuid";
import AddItemForm from "./components/AddItemForm";

export const filterValues = "all" | "active" | "completed";

function App() {

  function removeTask(id, todolistId) {
    let tasks = tasksObj[todolistId]

    let filteredTasks = tasks.filter((task) => task.id !== id);
    tasksObj[todolistId] = filteredTasks;
    setTasks({ ...tasksObj });
  }

  function addTask(title, todolistId) {
    // Create a new task object
    const newTask = {
      id: v1(),
      title: title,
      isDone: false,
    };
    // Copy the existing tasks for the specified todolist
    const existingTasks = tasksObj[todolistId];
    // Add the new task to the existing tasks
    const updatedTasks = [...existingTasks, newTask];
    tasksObj[todolistId] = updatedTasks;
    // Update the tasks object
    setTasks({ ...tasksObj });
  }

  function changeStatus(taskId, isDone, todolistId) {

    let tasks = tasksObj[todolistId];

    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, isDone } : task
    );
    // Update the tasksObj state for the specified todolistId
    setTasks({ ...tasksObj, [todolistId]: updatedTasks });
  }

  function changeTitle(taskId, newValue, todolistId) {

    //find  todolist
    let tasks = tasksObj[todolistId];
    
    //find task return ({ ...task, title: newValue })
    const updatedTasks = tasks.map((task) => 
    task.id === taskId ? ({ ...task, title: newValue }) :task
    );
    console.log(updatedTasks)
    setTasks({ ...tasksObj, [todolistId]: updatedTasks }); 
}


let todolistId1 = v1();
let todolistId2 = v1();

let [todolists, setTodolists] = useState([

  { id: todolistId1, title: 'What to learn', filter: 'completed' },
  { id: todolistId2, title: 'What to buy', filter: 'active' },

])

let removeTodolist = (todolistId) => {
  let filteredTodolists = todolists.filter((todolist) => todolist.id !== todolistId);
  setTodolists(filteredTodolists);
  delete tasksObj[todolistId];
  setTasks({ ...tasksObj })

}

let [tasksObj, setTasks] = useState({
  [todolistId1]: [
    { id: v1(), title: "CSS", isDone: true },
    { id: v1(), title: "JS", isDone: false },
    { id: v1(), title: "React", isDone: false },
    { id: v1(), title: "Angular", isDone: true },
  ],
  [todolistId2]: [
    { id: v1(), title: "Book", isDone: false },
    { id: v1(), title: "Milk", isDone: true }

  ]
})



function changeFilter(value, todolistId) {
  let newTodolist = todolists.map(
    (todolist) => todolist.id === todolistId ? { ...todolist, filter: value } : todolist)
  setTodolists(newTodolist);
}

function addTodolist(title) {
  let newTodolist = {
    id: v1(),
    filter: "all",
    title: title,
  }
  setTodolists([newTodolist, ...todolists]);
  setTasks({ ...tasksObj, [newTodolist.id]: [] })

}


return (
  <div>
    <AddItemForm addTask={addTodolist} />

    <div className="container">

      {todolists.map((todo) => {
        if (todo && todo.filter) {
          let filteredArray = tasksObj[todo.id];

          if (todo.filter === "completed") {
            filteredArray = filteredArray.filter((task) => task.isDone === true);
          }

          if (todo.filter === "active") {
            filteredArray = filteredArray.filter((task) => task.isDone === false);
          }

          if (todo.filter === "all") {
            filteredArray = tasksObj[todo.id];
          }

          return (
            <Todolist
              key={todo.id}
              id={todo.id}
              title={todo.title}
              tasks={filteredArray}
              removeTask={removeTask}
              changeFilter={changeFilter}
              addTask={addTask}
              changeStatus={changeStatus}
              changeTitle={changeTitle}
              filter={todo.filter}
              removeTodolist={removeTodolist}
            />
          );
        }
        return null; // Return null for invalid or undefined todo objects
      })}
    </div>
  </div>
);

}

export default App;
