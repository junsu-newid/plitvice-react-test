import { createGlobalStyle } from 'styled-components';

import { reset } from '@/styles/reset';

const GlobalStyle = createGlobalStyle`
    ${reset}

    body {
        ${({ theme }) => `
            font-family: ${theme.fonts.family.pretendard};
            font-weight: ${theme.fonts.weight.normal};
            font-size: ${theme.fonts.size.md};
            line-height: ${theme.fonts.size + 2}px;
        `}
    }

    @font-face {
        font-family: 'pretendard';
        font-style: normal;
        font-weight: normal;
        src: url('https://paro-cdn.its-newid.net/font/pretendard_regular_subset.woff2') format('woff2');
    }
    @font-face {
        font-family: 'pretendard';
        font-style: normal;
        font-weight: bold;
        src: url('https://paro-cdn.its-newid.net/font/pretendard_bold_subset.woff2') format('woff2');
    }
`;

export default GlobalStyle;
