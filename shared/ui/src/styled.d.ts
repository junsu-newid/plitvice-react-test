import 'styled-components';
import { ColorTypes, FontTypes } from '@/style/theme';

declare module 'styled-components' {
    export interface DefaultTheme {
        colors: ColorTypes;
        fonts: FontTypes;
    }
}
