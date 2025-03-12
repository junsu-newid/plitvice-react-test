import { ReactNode } from 'react';

export interface ButtonProps {
    size?: 'sm' | 'md' | 'lg';
    type?: 'fill' | 'stroke';
    disabled?: boolean;
    onClick?: () => void;
    children?: ReactNode;
}

export interface ButtonStyleProps {
    $enabledBG: string;
    $enabledColor: string;
    $enabledBorder: string;
    $hoverBG: string;
    $hoverColor: string;
    $hoverBorder: string;
    $focusedBG: string;
    $focusedColor: string;
    $focusedBorder: string;
    $pressedBG: string;
    $pressedColor: string;
    $pressedBorder: string;
    $fontSize: number;
    $height: number;
    $padding: number;
    $border: string;
}
