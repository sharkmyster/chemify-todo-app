import React from 'react';
import { render } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import { ApiProvider } from '@reduxjs/toolkit/query/react';
import { apiSlice } from './src/features/api/apiSlice';

export function renderWithProviders(ui: React.ReactElement) {
  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    return (
      <ApiProvider api={apiSlice}>
        <MantineProvider>{children}</MantineProvider>
      </ApiProvider>
    );
  };

  // Return an object with the store and all of RTL's query functions
  return { ...render(ui, { wrapper: Wrapper }) };
}
