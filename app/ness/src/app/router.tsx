import { QueryClient, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router';

import { paths } from '@/config/paths';

import { default as AppRoot, ErrorBoundary as AppRootErrorBoundary } from './routes/app/root';

export function HydrateFallback() {
    return <div>Loading...</div>;
}

const convert = (queryClient: QueryClient) => (m: unknown) => {
    const { clientLoader, clientAction, default: Component, ...rest } = m;
    return {
        ...rest,
        loader: clientLoader?.(queryClient),
        action: clientAction?.(queryClient),
        Component,
    };
};

export const createAppRouter = (queryClient: QueryClient) =>
    createBrowserRouter([
        {
            path: paths.app.root.path,
            element: <AppRoot />,
            hydrateFallbackElement: <HydrateFallback />,
            ErrorBoundary: AppRootErrorBoundary,
            children: [
                {
                    path: paths.app.dashboard.path,
                    lazy: () => import('./routes/app/dashboard').then(convert(queryClient)),
                },
                {
                    path: paths.app.simpleUpload.path,
                    lazy: () => import('./routes/app/simple-upload').then(convert(queryClient)),
                },
                {
                    path: paths.app.advancedUpload.path,
                    lazy: () => import('./routes/app/advanced-upload').then(convert(queryClient)),
                },
            ],
        },
        {
            path: '*',
            lazy: () => import('./routes/not-found').then(convert(queryClient)),
            hydrateFallbackElement: <HydrateFallback />,
        },
    ]);

export const AppRouter = () => {
    const queryClient = useQueryClient();

    const router = useMemo(() => createAppRouter(queryClient), [queryClient]);

    return <RouterProvider router={router} />;
};
