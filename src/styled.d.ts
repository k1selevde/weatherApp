// styled.d.ts
import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        active: string,
        default: string,
        faded: string,
    }
}