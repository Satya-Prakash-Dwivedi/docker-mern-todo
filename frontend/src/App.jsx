import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    axios.get('http://backend:5000/tasks')
    .then(res => setTasks(res.data))
      .catch(err => console.error(err));
  }, []);

  const addTask = () => {
    axios.post('http://backend:5000/tasks', { text })
      .then(res => setTasks([...tasks, res.data]))
      .catch(err => console.error(err));
  };

  const deleteTask = (id) => {
    axios.delete(`http://localhost:5000/tasks/${id}`)
      .then(() => setTasks(tasks.filter(task => task._id !== id)))
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h1>To-Do List</h1>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={addTask}>Add Task</button>
      <ul>
        {tasks.map(task => (
          <li key={task._id}>
            {task.text}
            <button onClick={() => deleteTask(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
