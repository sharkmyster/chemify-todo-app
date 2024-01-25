import React from 'react';
import {
  useGetTodosQuery,
  useAddTodoMutation,
  useDeleteTodoMutation,
  useUpdateTodoMutation,
} from '../api/apiSlice';

export interface Todo {
  id: string;
  title: string;
  done: boolean;
}

const TodoList = () => {
  const {
    data: todos,
    isLoading,
    isSuccess,
    isError,
  } = useGetTodosQuery({ data: { data: [] } });
  const [addTodo, { isLoading: isAdding }] = useAddTodoMutation();
  const [deleteTodo, { isLoading: isDeleting }] = useDeleteTodoMutation();
  const [updateTodo, { isLoading: isUpdating }] = useUpdateTodoMutation();

  const [newTodo, setNewTodo] = React.useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addTodo({
      title: newTodo,
    });
    setNewTodo('');
  };

  let content;

  if (isLoading) {
    content = <div>Loading...</div>;
  } else if (isError) {
    content = <div>An error occured</div>;
  } else if (isSuccess) {
    content = (
      <ul>
        {todos.data?.map((todo: Todo) => (
          <li key={todo.id}>
            <input
              id={todo.id}
              type="checkbox"
              checked={todo.done}
              onChange={() => updateTodo({ ...todo, done: !todo.done })}
            />
            <span>{todo.title}</span>
            <button onClick={() => deleteTodo({ id: todo.id })}>Delete</button>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <>
      <h1>Chemify Todo App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="new-todo"
          placeholder="Enter a todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
      {content}
    </>
  );
};

export default TodoList;
