import styled from 'styled-components';
import { theme } from '@/style/theme.ts';
import { ButtonProps, ButtonStyleProps } from '@/component/button/type.ts';

const StyledButton = styled.button<ButtonStyleProps>`
    background-color: ${(props) => props.$enabledBG};
    color: ${(props) => props.$enabledColor};
    border-color: ${(props) => props.$enabledBorder};
    &:hover {
        background-color: ${(props) => props.$hoverBG};
        color: ${(props) => props.$hoverColor};
        border-color: ${(props) => props.$hoverBorder};
    }
    // &:focus {
    //     background-color: ${(props) => props.$focusedBG};
    //     color: ${(props) => props.$focusedColor};
    //     border-color: ${(props) => props.$focusedBorder};
    // }
    &:active {
        background-color: ${(props) => props.$pressedBG};
        color: ${(props) => props.$pressedColor};
        border-color: ${(props) => props.$pressedBorder};
    }
    font-size: ${(props) => props.$fontSize}px;
    font-weight: 500;
    height: ${(props) => props.$height}px;
    padding: 0 ${(props) => props.$padding}px;
    border: ${(props) => props.$border};
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.1s ease;
`;

export const CommonButton = ({ size = 'md', variant = 'fill', children, ref, ...props }: ButtonProps) => {
    console.log('파도처럼');
    const styleProps: ButtonStyleProps = {
        $enabledBG: theme.colors.white,
        $enabledColor: theme.colors.grey60,
        $enabledBorder: theme.colors.grey60,
        $hoverBG: theme.colors.grey60,
        $hoverColor: theme.colors.grey60,
        $hoverBorder: theme.colors.blue600,
        $focusedBG: theme.colors.white,
        $focusedColor: theme.colors.blue600,
        $focusedBorder: theme.colors.blue600,
        $pressedBG: theme.colors.blue200,
        $pressedColor: theme.colors.blue700,
        $pressedBorder: theme.colors.blue700,
        $fontSize: 14,
        $height: 32,
        $padding: 14,
        $border: '1px solid',
    };
    if (props.disabled) {
        styleProps.$enabledBG = theme.colors.grey20;
        styleProps.$enabledColor = theme.colors.grey40;
        styleProps.$enabledBorder = theme.colors.grey40;
        styleProps.$hoverBG = theme.colors.grey20;
        styleProps.$hoverColor = theme.colors.grey40;
        styleProps.$hoverBorder = theme.colors.grey40;
        styleProps.$focusedBG = theme.colors.grey20;
        styleProps.$focusedColor = theme.colors.grey40;
        styleProps.$focusedBorder = theme.colors.grey40;
        styleProps.$pressedBG = theme.colors.grey20;
        styleProps.$pressedColor = theme.colors.grey40;
        styleProps.$pressedBorder = theme.colors.grey40;
        if (variant === 'fill') {
            styleProps.$border = 'none';
        }
    } else if (variant === 'fill') {
        styleProps.$enabledBG = theme.colors.blue600;
        styleProps.$enabledColor = theme.colors.white;
        styleProps.$hoverBG = theme.colors.blue500;
        styleProps.$hoverColor = theme.colors.white;
        styleProps.$focusedBG = theme.colors.blue700;
        styleProps.$focusedColor = theme.colors.white;
        styleProps.$pressedBG = theme.colors.blue700;
        styleProps.$pressedColor = theme.colors.white;
        styleProps.$border = 'none';
    }
    switch (size) {
        case 'sm':
            styleProps.$fontSize = 12;
            styleProps.$height = 26;
            styleProps.$padding = 10;
            break;
        case 'md':
            styleProps.$fontSize = 12;
            styleProps.$height = 32;
            styleProps.$padding = 14;
            break;
        case 'lg':
            styleProps.$fontSize = 16;
            styleProps.$height = 54;
            styleProps.$padding = 20;
            break;
    }

    return (
        <StyledButton role="button" ref={ref} {...props} {...styleProps}>
            {children || ''}
        </StyledButton>
    );
};
