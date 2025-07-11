import React, { useState } from 'react';
import './TodoForm.css';

const TodoForm = ({ addTodo }) => {
  const [todoTitle, setTodoTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (todoTitle.trim()) {
      addTodo({
        title: todoTitle,
        completed: false,
      });
      setTodoTitle('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        type="text"
        value={todoTitle}
        onChange={(e) => setTodoTitle(e.target.value)}
        className="todo-input"
        placeholder="Add a new task..."
      />
      <button type="submit" className="add-btn">Add</button>
    </form>
  );
};

export default TodoForm;
