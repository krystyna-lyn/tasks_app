import React, { useState } from 'react';

function App() {
 const [task, setTask] = useState('');
 const [tasks, setTasks] = useState([]);

 const handleChange = (e) => {
    setTask(e.target.value);
 };

 const handleSubmit = (e) => {
    e.preventDefault();

    // Validation check: do not add todo if it's empty
    if (task.trim() === '') {
      alert('Please enter a task');
      return;
    }

    setTasks([...tasks, { task, completed: false }]);
    setTask('');
 };

 const toggleTaskCompleted = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
 };

 return (
    <div>
      <h1>What to learn</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Enter task" value={task} onChange={handleChange} />
        <button type="submit">Add</button>
      </form>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            <input type='checkbox' checked={task.completed} onChange={() => toggleTaskCompleted(index)} />
            {task.task}
          </li>
        ))}
      </ul>
    </div>
 );
}

export default App;