import { screen, fireEvent } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { renderWithProviders } from '../../../testUtils.tsx';
import { server } from '../../mocks/api/server.js';

import TodoList from './TodoList';

describe('TodoList', () => {
  test('renders the form', () => {
    renderWithProviders(<TodoList />);

    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });

  test('renders the form', () => {
    renderWithProviders(<TodoList />);

    expect(screen.getByPlaceholderText('Enter a todo')).toBeInTheDocument();
  });

  test('renders loading state', () => {
    renderWithProviders(<TodoList />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('renders error state', async () => {
    renderWithProviders(<TodoList />);

    server.use(
      http.get('http://localhost:8080/todos', () => {
        return new HttpResponse(null, { status: 500 });
      })
    );

    const element = await screen.findByRole('alert');

    expect(element.textContent).toBe('An error occured');
  });

  test('renders todos', async () => {
    renderWithProviders(<TodoList />);

    await screen.findByRole('list');

    expect(screen.getByText('Todo 1')).toBeInTheDocument();
    expect(screen.getByText('Todo 2')).toBeInTheDocument();

    expect(screen.getAllByRole('checkbox')).toHaveLength(2);
    expect(screen.getAllByRole('button')).toHaveLength(3);
  });

  test('adds a new todo', () => {
    renderWithProviders(<TodoList />);

    // Enter a new todo in the input field
    const input = screen.getByPlaceholderText('Enter a todo');
    fireEvent.change(input, { target: { value: 'New Todo' } });

    // Click the add button
    const addButton = screen.getByText('Add');
    fireEvent.click(addButton);

    // Check if the input field is cleared after adding a todo
    expect(input).toHaveValue('');
  });
});
