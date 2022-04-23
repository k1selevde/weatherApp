import {atom, AtomEffect} from "recoil";
import ru from './translations/ru.json'
import en from './translations/en.json'

export type LocaleStateType = 'ru' | 'en';

const localeMessages = {
    en,
    ru
}

const localStorageEffect = (key: string): AtomEffect<LocaleStateType> => ({setSelf, onSet}) => {
    const savedValue = localStorage.getItem(key)

    if (savedValue != null) {
        setSelf(savedValue as LocaleStateType);
    }


    onSet((newValue, _, isReset) => {
        isReset
            ? localStorage.removeItem(key)
            : localStorage.setItem(key, newValue);
    });
}

const localeState = atom<LocaleStateType>({
    key: 'localeState',
    default: 'en',
    effects: [localStorageEffect('locale')]
})

export {
    localeMessages,
    localeState
}