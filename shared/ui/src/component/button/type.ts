import React, { ButtonHTMLAttributes, ReactNode } from 'react';

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'> {
    size?: 'sm' | 'md' | 'lg';
    variant?: 'fill' | 'stroke';
    children?: ReactNode;
    ref?: React.Ref<HTMLButtonElement>;
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
