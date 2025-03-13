import styled from 'styled-components';
import { Portal } from '@radix-ui/react-portal';

import { theme } from '@/styles/theme';

export const Modal = ({
    isOpen,
    onClose,
    children,
    backgroundClose = true,
}: {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    backgroundClose?: boolean;
}) => {
    if (!isOpen) return null;

    return (
        <Portal>
            <Container onClick={backgroundClose ? onClose : undefined}>
                <Content onClick={(e) => e.stopPropagation()}>
                    <CloseButton onClick={onClose}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-x"
                        >
                            <path d="M18 6 6 18" />
                            <path d="m6 6 12 12" />
                        </svg>
                    </CloseButton>
                    {children}
                </Content>
            </Container>
        </Portal>
    );
};

const Container = styled.div`
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.5);
`;

const Content = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    min-height: 200px;
    max-width: 400px;
    background: ${theme.colors.white};
    padding: 20px;
    border-radius: 10px;
    z-index: 999;
`;

const CloseButton = styled.button`
    position: absolute;
    top: 5px;
    right: 5px;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.2s ease-in-out;
    border-radius: 50%;

    &:hover {
        background: ${theme.colors.tertiary};
    }
`;
