import styled from 'styled-components';
import { theme } from '@/style/theme.ts';
import { SelectBoxProps, SelectBoxStyleProps } from '@/component/selectBox/type.ts';
import { useState } from 'react';

const StyledSelectBox = styled.div<SelectBoxStyleProps>`
    position: relative;
    display: inline-block;
    width: ${(props) => props.$width}px;

    select {
        width: 100%;
        height: ${(props) => props.$height}px;
        font-size: ${(props) => props.$fontSize}px;
        padding: 0 ${(props) => props.$padding}px;
        border: ${(props) => props.$border};
        border-radius: 4px;
        background-color: ${(props) => props.$enabledBG};
        color: ${(props) => props.$enabledColor};
        cursor: pointer;
        transition: border-color 0.1s ease;

        &:hover {
            background-color: ${(props) => props.$hoverBG};
            color: ${(props) => props.$hoverColor};
            border-color: ${(props) => props.$hoverBorder};
        }

        &:focus {
            background-color: ${(props) => props.$focusedBG};
            color: ${(props) => props.$focusedColor};
            border-color: ${(props) => props.$focusedBorder};
            outline: none;
        }

        &:disabled {
            background-color: ${(props) => props.$disabledBG};
            color: ${(props) => props.$disabledColor};
            border-color: ${(props) => props.$disabledBorder};
            cursor: not-allowed;
        }
    }
`;

export const CommonSelectBox = ({ size = 'md', options, ...props }: SelectBoxProps) => {
    const [selectedValue, setSelectedValue] = useState('');
    console.log('이번이 두번째 console.log 테스트, merge가 잘 기록될까요?');
    console.log('이번이 두번째 console.log 테스트의 완성형, merge가 잘 기록될까요? 10점 만점에 10점');
    console.log('하트비트');
    console.log('아 캔 브릿');
    console.log('자꾸만 내 숨이');
    console.log('막혀가 내 숨이 예');
    console.log('니가 클럽에서 놀때');
    console.log('');
    console.log('');

    const styleProps: SelectBoxStyleProps = {
        $enabledBG: theme.colors.white,
        $enabledColor: theme.colors.grey60,
        $enabledBorder: theme.colors.grey60,
        $hoverBG: theme.colors.blue100,
        $hoverColor: theme.colors.blue600,
        $hoverBorder: theme.colors.blue600,
        $focusedBG: theme.colors.white,
        $focusedColor: theme.colors.blue600,
        $focusedBorder: theme.colors.blue600,
        $disabledBG: theme.colors.grey20,
        $disabledColor: theme.colors.grey40,
        $disabledBorder: theme.colors.grey40,
        $fontSize: 14,
        $height: 32,
        $padding: 14,
        $border: '1px solid',
        $width: 150,
    };

    switch (size) {
        case 'sm':
            styleProps.$fontSize = 12;
            styleProps.$height = 26;
            styleProps.$padding = 10;
            styleProps.$width = 120;
            break;
        case 'md':
            styleProps.$fontSize = 12;
            styleProps.$height = 32;
            styleProps.$padding = 14;
            styleProps.$width = 150;
            break;
        case 'lg':
            styleProps.$fontSize = 16;
            styleProps.$height = 54;
            styleProps.$padding = 20;
            styleProps.$width = 200;
            break;
    }

    return (
        <StyledSelectBox {...styleProps}>
            <select value={selectedValue} onChange={(e) => setSelectedValue(e.target.value)} {...props}>
                {options.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </StyledSelectBox>
    );
};
