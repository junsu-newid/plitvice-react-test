import { theme } from '@/style/theme';
import styled from 'styled-components';

export interface ButtonProps {
    primary?: boolean;
    size?: 'sm' | 'md' | 'lg';
    onClick?: () => void;
    children?: React.ReactNode;
}

const StyledButton = styled.button<ButtonProps>`
    background-color: ${(props) => (props.primary ? theme.colors.primary : theme.colors.grey30)};
    &:hover {
        background-color: ${(props) => (props.primary ? theme.colors.secondary : theme.colors.grey50)};
    }
    color: ${(props) => (props.primary ? 'white' : '#333')};
    font-size: ${(props) => {
        switch (props.size) {
            case 'sm':
                return '12px';
            case 'md':
                return '14px';
            case 'lg':
                return '18px';
            default:
                return '14px';
        }
    }};
    padding: ${(props) => {
        switch (props.size) {
            case 'sm':
                return '8px 16px';
            case 'md':
                return '12px 20px';
            case 'lg':
                return '16px 24px';
            default:
                return '12px 20px';
        }
    }};
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease;
`;

export const Button = ({ primary = true, size = 'md', children, ...props }: ButtonProps) => {
    return (
        <StyledButton primary={primary} size={size} role="button" {...props}>
            {children ? children : ''}
        </StyledButton>
    );
};
