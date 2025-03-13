import { Outlet } from 'react-router';

import { CommonLayout } from '@/components/layouts';
import { CommonButton } from '@plitvice/ui';

export const ErrorBoundary = () => {
    return <div>Something went wrong!</div>;
};

const AppRoot = () => {
    return (
        <CommonLayout>
            <Outlet />
            <CommonButton size="lg" variant="stroke">
                {'test'}
            </CommonButton>
        </CommonLayout>
    );
};

export default AppRoot;
