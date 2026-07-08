function TodoList({ todos, editingId, editingTitle, setEditingTitle, onStartEdit, onSaveEdit, onCancelEdit, onDeleteTodo, onToggleComplete }) {
  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
          <div className="todo-main">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => onToggleComplete(todo)}
            />

            {editingId === todo.id ? (
              <input
                className="edit-input"
                value={editingTitle}
                onChange={(event) => setEditingTitle(event.target.value)}
              />
            ) : (
              <span>{todo.title}</span>
            )}
          </div>

          <div className="actions">
            {editingId === todo.id ? (
              <>
                <button className="secondary" onClick={() => onSaveEdit(todo)}>Save</button>
                <button className="secondary" onClick={onCancelEdit}>Cancel</button>
              </>
            ) : (
              <>
                <button className="secondary" onClick={() => onStartEdit(todo)}>Edit</button>
                <button className="danger" onClick={() => onDeleteTodo(todo.id)}>Delete</button>
              </>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
