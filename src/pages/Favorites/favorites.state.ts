import {atom, AtomEffect} from "recoil";
import { FavoriteCardType } from "../../types";

const localStorageEffect = (key: string): AtomEffect<FavoriteCardType[]> => ({setSelf, onSet}) => {
    const savedValue = JSON.parse(localStorage.getItem(key) as string)

    if (savedValue != null) {
        setSelf(savedValue);
    }

    onSet((newValue, _, isReset) => {
        const jsonValue = JSON.stringify(newValue)

        isReset
            ? localStorage.removeItem(key)
            : localStorage.setItem(key, jsonValue);
    });
}

const favoritesState = atom<FavoriteCardType[]>({
    key: 'favoritesState',
    default: [],
    effects: [localStorageEffect('favorites')]
});

export {
    favoritesState
}