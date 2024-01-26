import { http, HttpResponse } from 'msw';
import baseURL from '../../helpers/baseUrl';

const todos = {
  data: [
    {
      id: '03103223-f868-4892-ba22-4edfe8aa7af0',
      createdAt: '2024-01-26T08:01:49.270Z',
      updatedAt: '2024-01-26T08:01:49.270Z',
      title: 'Todo 1',
      done: false,
    },
    {
      id: '353909c7-1d2a-4d7b-8d2d-b3d6739e25de',
      createdAt: '2024-01-26T08:01:50.607Z',
      updatedAt: '2024-01-26T08:01:50.607Z',
      title: 'Todo 2',
      done: false,
    },
  ],
};

export const handlers = [
  http.get(baseURL('/todos'), () => {
    return HttpResponse.json(todos);
  }),
  http.post(baseURL('/todos'), () => {
    return HttpResponse.json({
      data: {
        id: '53543109-1de3-451c-9106-01dfc1a95902',
        createdAt: '2024-01-24T13:16:31.582Z',
        updatedAt: '2024-01-24T13:16:31.582Z',
        title: 'New Todo',
        done: false,
      },
    });
  }),
];
