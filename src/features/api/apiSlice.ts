import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// sorting function that sorts todos by createdAt date
const sortTodos = (a: Todo, b: Todo) => {
  return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
};

export interface Todo {
  id: string;
  title: string;
  done: boolean;
  createdAt: string;
  updatedAt: string;
}

interface TodosResponse {
  data: Todo[];
}

const apiEndpoint = import.meta.env.VITE_API_ENDPOINT;

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: apiEndpoint }),
  tagTypes: ['Todos'],
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: () => 'todos',
      transformResponse: (response: TodosResponse) => {
        response.data = response.data.sort(sortTodos);
        return response;
      },
      providesTags: ['Todos'],
    }),
    getTodo: builder.query({
      query: (id) => `todos/${id}`,
    }),
    addTodo: builder.mutation({
      query: (body) => ({
        url: 'todos',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Todos'],
    }),
    updateTodo: builder.mutation({
      query: ({ id, ...put }) => ({
        url: `todos/${id}`,
        method: 'PUT',
        body: put,
      }),
      invalidatesTags: ['Todos'],
    }),
    deleteTodo: builder.mutation({
      query: ({ id }) => ({
        url: `todos/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Todos'],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useGetTodoQuery,
  useDeleteTodoMutation,
  useUpdateTodoMutation,
} = apiSlice;
