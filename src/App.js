import React from "react";
import "./App.css";
import Todolist from "./components/Todolist";
import { useState } from "react";
import { v1 } from "uuid";

export const filterValues = "all" | "active" | "completed";

function App() {

  let [tasks, setTasks] = useState([
    { id: v1(), title: "CSS", isDone: true },
    { id: v1(), title: "JS", isDone: false },
    { id: v1(), title: "React", isDone: false },
    { id: v1(), title: "Angular", isDone: true },
  ]);

  let [filter, setFilter] = useState(filterValues);

  function removeTask(id) {
    let filteredTasks = tasks.filter((task) => task.id !== id);
    setTasks(filteredTasks);
  }

  function addTask(title) {
    let newTask = {
      id: v1(),
      title: title,
      isDone: false,
    };
     //add changed Task to init Array use spred [...tasks]
    let newTasks = [newTask, ...tasks];
    setTasks(newTasks);
  }

  function changeFilter(value) {
    setFilter(value);
  }

  let filteredArray = tasks;

  if (filter === "completed") {
    filteredArray = tasks.filter((task) => task.isDone === true);
  }

  if (filter === "active") {
    filteredArray = tasks.filter((task) => task.isDone === false);
  }

  function changeStatus(taskId, check) {
   
    let task = tasks.find(task => task.id === taskId);
    if (task) {
      tasks.isDone = check;
    }
    //add changed Task to copy init Array use spred [...tasks]
    setTasks([...tasks]);
  }

  return (
    <div style={{ display: "flex" }}>
      <Todolist
        title="Projects for today"
        tasks={filteredArray}
        removeTask={removeTask}
        changeFilter={changeFilter}
        addTask={addTask}
        changeStatus={changeStatus}
        filter={filter}
      />
    </div>
  );
}

export default App;
