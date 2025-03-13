import { ReactNode } from 'react';
import styled from 'styled-components';

import { theme } from '@/styles/theme';

export function CommonLayout({ children }: { children: ReactNode }) {
    return (
        <Container>
            <FakeNavbar />
            {children}
        </Container>
    );
}

const Container = styled.div`
    padding-top: 40px;

    @media (min-width: 992px) {
        padding-top: 61.5px;
    }
`;

const FakeNavbar = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 40px;
    background: ${theme.colors.primary};
    z-index: -1;

    @media (min-width: 992px) {
        height: 61.5px;
    }
`;
