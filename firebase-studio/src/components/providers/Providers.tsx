"use client";
import { PropsWithChildren, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import { getFirebaseApp } from '@/lib/firebase-client';

const queryClient = new QueryClient();

export function Providers({ children }: PropsWithChildren) {
  useEffect(() => {
    getFirebaseApp();
  }, []);
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ThemeProvider>
  );
}

