import {atom, AtomEffect} from "recoil";

export type ThemeStateType = 'light' | 'dark'

const localStorageEffect = (key: string): AtomEffect<ThemeStateType> => ({setSelf, onSet}) => {
    const savedValue = localStorage.getItem(key)

    if (savedValue != null) {
        setSelectedCssVariables(savedValue as ThemeStateType)

        setSelf(savedValue as ThemeStateType);
    }

    onSet((newValue, _, isReset) => {
        setSelectedCssVariables(newValue)

        isReset
            ? localStorage.removeItem(key)
            : localStorage.setItem(key, newValue);
    });
};


const themeState = atom<ThemeStateType>({
    key: 'themeState',
    // должно соответствовать значениям "--selected" переменных по умолчанию в файле "main.sass"
    default: 'light',
    effects: [localStorageEffect('theme')],
});

const setSelectedCssVariables = (themeName: ThemeStateType) => {
    const selectedCssProps = Array.from(document.styleSheets)
        .reduce(
            (acc: string[], sheet: CSSStyleSheet) =>
                (acc = [
                    ...acc,
                    ...Array.from(sheet.cssRules)
                        .reduce(
                            //FIXME-k1selevde вывести тип для rule
                            (def: string[], rule: any) => (
                                (def = rule.selectorText === ":root"
                                    ? [
                                        ...def,
                                        ...Array.from<string>(rule.style)
                                            .filter((name: string) => name.startsWith("--selected")
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