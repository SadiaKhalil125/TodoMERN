import React, { useState, useEffect } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import './App.css';

const App = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    // Fetch initial to-dos from your backend (assuming MongoDB is connected)
    fetch('http://localhost:5000/api/todos')
      .then((response) => response.json())
      .then((data) => setTodos(data));
  }, []);

  const addTodo = (newTodo) => {
    fetch('http://localhost:5000/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTodo),
    })
      .then((response) => response.json())
      .then((data) => setTodos([...todos, data]));
  };

  const toggleComplete = (id) => {
    fetch(`http://localhost:5000/api/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: true }),
    })
      .then(() => {
        setTodos(
          todos.map((todo) =>
            todo._id === id ? { ...todo, completed: true } : todo
          )
        );
      });
  };

  const deleteTodo = (id) => {
    fetch(`http://localhost:5000/api/todos/${id}`, {
      method: 'DELETE',
    }).then(() => {
      setTodos(todos.filter((todo) => todo._id !== id));
    });
  };

  return (
    <div className="app">
      <h1>Todo App</h1>
      <TodoForm addTodo={addTodo} />
      <TodoList todos={todos} toggleComplete={toggleComplete} deleteTodo={deleteTodo} />
    </div>
  );
};

export default App;
