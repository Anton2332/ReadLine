import React from 'react';
import type { AppProps } from 'next/app';
import { QueryCache, QueryClient, QueryClientProvider } from 'react-query';
import toast, { Toaster } from 'react-hot-toast';

import '@/styles/globals.css';
import ErrorBoundary from '@/common/components/error-boundary/error-boundary.component';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      keepPreviousData: true,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      cacheTime: Infinity
    }
  },
  queryCache: new QueryCache({
    onError: (error: any, query) => {
      // :tada: only show error toasts if we already have data in the cache
      // which indicates a failed background update
      if (query.state.data !== undefined) {
        toast.error(`Something went wrong: ${error.message}`);
      }
    }
  })
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
        <Toaster position="bottom-right" reverseOrder={false} />
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
