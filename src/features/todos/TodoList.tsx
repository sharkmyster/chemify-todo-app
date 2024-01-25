import React from 'react';
import {
  useGetTodosQuery,
  useAddTodoMutation,
  useDeleteTodoMutation,
  useUpdateTodoMutation,
} from '../api/apiSlice';
import {
  Group,
  Container,
  Title,
  Button,
  Checkbox,
  TextInput,
  ActionIcon,
  List,
} from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import classes from './TodoList.module.css';
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
  const [addTodo] = useAddTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();

  const [newTodo, setNewTodo] = React.useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newTodo.trim() === '') return;
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
      <List listStyleType="none">
        {todos.data?.map((todo: Todo) => (
          <List.Item>
            <Group justify="space-between">
              <Checkbox
                size="xl"
                label={todo.title}
                checked={todo.done}
                onChange={() => updateTodo({ ...todo, done: !todo.done })}
              />

              <ActionIcon
                color="red"
                size="compact-md"
                onClick={() => deleteTodo({ id: todo.id })}
              >
                <IconTrash />
              </ActionIcon>
            </Group>
          </List.Item>
        ))}
      </List>
    );
  }

  return (
    <Container className={classes.todoApp}>
      <Title className={classes.title} order={1}>
        Chemify Todo App
      </Title>

      <form onSubmit={handleSubmit}>
        <Group justify="center" p={'2rem'}>
          <TextInput
            placeholder="Enter a todo"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            size="xl"
            flex={1}
          />
          <Button type="submit" size="xl">
            Add
          </Button>
        </Group>
      </form>

      <Container maw={800}>{content}</Container>
    </Container>
  );
};

export default TodoList;
