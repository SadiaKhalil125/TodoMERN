import React from 'react';
import './TodoItem.css';

const TodoItem = ({ todo, toggleComplete, deleteTodo }) => {
  return (
    <div className="todo-item">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleComplete(todo._id)}
        className="todo-checkbox"
      />
      <span className={`todo-title ${todo.completed ? 'completed' : ''}`}>
        {todo.title}
      </span>
      <button onClick={() => deleteTodo(todo._id)} className="delete-btn">
        Delete
      </button>
    </div>
  );
};

export default TodoItem;
