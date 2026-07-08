function TodoForm({ title, setTitle, onSubmit }) {
  return (
    <form className="todo-form" onSubmit={onSubmit}>
      <input
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="What needs to be done?"
      />
      <button type="submit">Add Todo</button>
    </form>
  );
}

export default TodoForm;
