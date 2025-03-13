import { theme } from '@/styles/theme';
import styled from 'styled-components';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ children, ...props }: ButtonProps) => {
    return <Container {...props}>{children}</Container>;
};

export default Button;

const Container = styled.button`
    padding: 5px 10px;
    border: none;
    background: ${theme.colors.primary};
    color: ${theme.colors.white};
    transition: background 0.2s ease-in-out;
    width: fit-content;
    &:hover {
        background: ${theme.colors.secondary};
    }
`;
