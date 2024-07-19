import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(null);

  const addTask = () => {
    if (newTask.trim()) {
      const updatedTasks = tasks.concat({ text: newTask, completed: false });
      setTasks(updatedTasks);
      setNewTask('');
    }
  };

  const editTask = (index) => {
    setIsEditing(true);
    setNewTask(tasks[index].text);
    setCurrentTaskIndex(index);
  };

  const updateTask = () => {
    if (newTask.trim()) {
      const updatedTasks = tasks.slice();
      updatedTasks[currentTaskIndex] = { ...updatedTasks[currentTaskIndex], text: newTask };
      setTasks(updatedTasks);
      setNewTask('');
      setIsEditing(false);
      setCurrentTaskIndex(null);
    }
  };

  const removeTask = (index) => {
    const updatedTasks = tasks.slice(0, index).concat(tasks.slice(index + 1));
    setTasks(updatedTasks);
  };

  const toggleCompletion = (index) => {
    const updatedTasks = tasks.slice();
    updatedTasks[index] = { ...updatedTasks[index], completed: !updatedTasks[index].completed };
    setTasks(updatedTasks);
  };

  return (
    <>
    <div className="todo-container">
      <h1>Todo List</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter a task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={isEditing ? updateTask : addTask}>
          {isEditing ? 'Update Task' : 'Add Task'}
        </button>
      </div>
      <ul>
        {tasks.map((task, index) => (
          <li key={index} className={task.completed ? 'completed' : ''}>
            <span onClick={() => toggleCompletion(index)}>{task.text}</span>
            <button className="edit" onClick={() => editTask(index)}>Edit</button>
            <button className="remove" onClick={() => removeTask(index)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
    </>
  );
};

export default App;