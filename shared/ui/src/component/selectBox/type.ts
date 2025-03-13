import React, { ReactNode, SelectHTMLAttributes } from 'react';

export interface SelectBoxProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'className' | 'size'> {
    size?: 'sm' | 'md' | 'lg';
    options: { value: string; label: string }[];
    children?: ReactNode;
    ref?: React.Ref<HTMLSelectElement>;
}

export interface SelectBoxStyleProps {
    $enabledBG: string;
    $enabledColor: string;
    $enabledBorder: string;
    $hoverBG: string;
    $hoverColor: string;
    $hoverBorder: string;
    $focusedBG: string;
    $focusedColor: string;
    $focusedBorder: string;
    $disabledBG: string;
    $disabledColor: string;
    $disabledBorder: string;
    $fontSize: number;
    $height: number;
    $padding: number;
    $border: string;
    $width: number;
}
