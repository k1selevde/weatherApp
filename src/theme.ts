import {atom} from "recoil";


export type ThemeStateType = 'light' | 'dark'

const themeState = atom<ThemeStateType>({
    key: 'themeState',
    // должно соответствовать значениям "--selected" переменных по умолчанию в файле "main.sass"
    default: 'light',
    effects: [
    ({onSet}) => {
        onSet((newValue) => {
            setSelectedCssVariables(newValue)
        });
    },
],
});


const setSelectedCssVariables = (themeName: 'light' | 'dark') => {
    const selectedCssProps = Array.from(document.styleSheets)
        .reduce(
            (acc: any[], sheet: CSSStyleSheet) =>
                (acc = [
                    ...acc,
                    ...Array.from(sheet.cssRules)
                        .reduce(
                            // FIXME-k1selevde тип CSSRule не содержит style почему-то :(
                            (def: any[], rule: any) => (
                                (def = rule.selectorText === ":root"
                                    ? [
                                        ...def,
                                        ...Array.from(rule.style).filter((name: any) =>
                                            name.startsWith("--selected")
                                        )
                                    ]
                                    : def
                                )
                            ),
                            []
                        )
                ]),
            []
        );

    selectedCssProps.forEach(prop => {
        document.documentElement.style.setProperty(prop, `var(--${themeName}${prop.substring(10)})`);
    });
}

export {
    themeState,
    setSelectedCssVariables
}