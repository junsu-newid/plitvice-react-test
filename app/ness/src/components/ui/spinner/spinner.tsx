import { theme } from '@/styles/theme';
import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const sizes = {
    sm: '16',
    md: '24',
    lg: '32',
    xl: '48',
};

const variants = {
    light: theme.colors.white,
    primary: theme.colors.primary,
};

export type SpinnerProps = {
    size?: keyof typeof sizes;
    variant?: keyof typeof variants;
};

export const Spinner = ({ size = 'xl', variant = 'primary' }: SpinnerProps) => {
    return (
        <SpinnerContainer>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={sizes[size]}
                height={sizes[size]}
                viewBox="0 0 24 24"
                fill="none"
                stroke={variants[variant]}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-loader-circle"
            >
                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
            </svg>
        </SpinnerContainer>
    );
};

const SpinnerContainer = styled.div`
    animation: ${rotate} 1.5s linear infinite;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;
