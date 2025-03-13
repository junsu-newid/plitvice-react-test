import * as React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ErrorBoundary } from 'react-error-boundary';
import { HelmetProvider } from 'react-helmet-async';
import styled, { ThemeProvider } from 'styled-components';

import { MainErrorFallback } from '@/components/errors/main';
import { Spinner } from '@/components/ui/spinner';
import { queryConfig } from '@/lib/react-query';
import GlobalStyle from '@/styles/GlobalStyle';
import { theme } from '@/styles/theme';

type AppProviderProps = {
    children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
    const [queryClient] = React.useState(
        () =>
            new QueryClient({
                defaultOptions: queryConfig,
            }),
    );

    return (
        <React.Suspense
            fallback={
                <SpinnerWrapper>
                    <Spinner />
                </SpinnerWrapper>
            }
        >
            <ErrorBoundary
                FallbackComponent={MainErrorFallback}
                onReset={() => {
                    // Reset the state of your app so the error doesn't happen again
                }}
            >
                <HelmetProvider>
                    <QueryClientProvider client={queryClient}>
                        <ThemeProvider theme={theme}>
                            <GlobalStyle />
                            {import.meta.env.DEV && <ReactQueryDevtools />}
                            {children}
                        </ThemeProvider>
                    </QueryClientProvider>
                </HelmetProvider>
            </ErrorBoundary>
        </React.Suspense>
    );
};

const SpinnerWrapper = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;
