import React, { useState } from 'react';
import {
  PlusCircle, LogOut, Trash2, Edit3, Save, CheckCircle, Circle
} from 'lucide-react';

export default function TodoPage({ onLogout }) {
  const [todos, setTodos] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', dueDate: '' });

  const addTodo = () => {
    if (!form.title.trim()) return;
    setTodos([
      ...todos,
      { ...form, editing: false, completed: false },
    ]);
    setForm({ title: '', description: '', dueDate: '' });
  };

  const removeTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  const toggleEdit = (index) => {
    setTodos(
      todos.map((todo, i) =>
        i === index ? { ...todo, editing: !todo.editing } : todo
      )
    );
  };

  const updateField = (index, field, value) => {
    setTodos(todos.map((todo, i) =>
      i === index ? { ...todo, [field]: value } : todo
    ));
  };

  const saveEdit = (e, index) => {
    e.preventDefault(); // évite la soumission automatique
    setTodos(todos.map((todo, i) =>
      i === index ? { ...todo, editing: false } : todo
    ));
  };

  const toggleComplete = (index) => {
    setTodos(
      todos.map((todo, i) =>
        i === index ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div className="todo-container">
      <div className="todo-header">
        <h1>Mes Todos</h1>
        <button onClick={onLogout} className="logout-button">
          <LogOut size={18} /> Déconnexion
        </button>
      </div>

      <div className="todo-form">
        <input
          type="text"
          placeholder="Titre"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <input
          type="date"
          value={form.dueDate}
          onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
        />
        <button onClick={addTodo}>
          <PlusCircle size={20} /> Ajouter
        </button>
      </div>

      <ul className="todo-list">
        {todos.map((todo, index) => (
          <li key={index} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            <button onClick={() => toggleComplete(index)}>
              {todo.completed ? <CheckCircle color="green" /> : <Circle />}
            </button>

            {todo.editing ? (
              <form className="todo-edit-form" onSubmit={(e) => saveEdit(e, index)}>
                <input
                  value={todo.title}
                  onChange={(e) => updateField(index, 'title', e.target.value)}
                />
                <input
                  value={todo.description}
                  onChange={(e) => updateField(index, 'description', e.target.value)}
                />
                <input
                  type="date"
                  value={todo.dueDate}
                  onChange={(e) => updateField(index, 'dueDate', e.target.value)}
                />
              </form>
            ) : (
              <div className="todo-details">
                <strong>{todo.title}</strong>
                <p>{todo.description}</p>
                {todo.dueDate && <small>À faire avant : {todo.dueDate}</small>}
              </div>
            )}

            <div className="todo-actions">
              <button
                onClick={(e) => {
                  if (todo.editing) saveEdit(e, index);
                  else toggleEdit(index);
                }}
              >
                {todo.editing ? <Save size={18} /> : <Edit3 size={18} />}
              </button>
              <button onClick={() => removeTodo(index)}>
                <Trash2 size={18} />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
