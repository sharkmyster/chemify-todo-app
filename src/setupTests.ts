import '@testing-library/jest-dom';
import * as matchers from '@testing-library/jest-dom/matchers';
import { server } from './mocks/api/server';
import { expect, vi } from 'vitest';

expect.extend(matchers);

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Establish API mocking before all tests.
beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
  // This is the solution to clear RTK Query cache after each test
  // store.dispatch(apiSlice.util.resetApiState());
});

// Clean up after the tests are finished.
afterAll(() => server.close());
