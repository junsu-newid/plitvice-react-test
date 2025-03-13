import { DefaultTheme } from 'styled-components';

const colors = {
    primary: '#0571F7',
    secondary: '#2F89F8',
    tertiary: '#0566DE',
    white: '#FFFFFF',
};

const fonts = {
    family: {
        pretendard: 'pretendard',
    },

    weight: {
        thin: 100,
        extraLight: 200,
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        extraBold: 800,
        black: 900,
    },

    size: {
        xs: '12px',
        sm: '14px',
        md: '16px',
        lg: '18px',
        xl: '20px',
        '2xl': '24px',
        '3xl': '30px',
        '4xl': '36px',
        '5xl': '48px',
    },
};

export const theme: DefaultTheme = {
    colors,
    fonts,
};

export type ColorTypes = typeof colors;
export type FontTypes = typeof fonts;
