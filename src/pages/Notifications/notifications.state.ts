import {atom} from "recoil";

const notificationsState = atom({
    key: 'notificationsState', // уникальный ID (по сравнению с другими атомами/селекторами)
    default: {} // дефолтное (начальное) значение
});

export {
    notificationsState
}