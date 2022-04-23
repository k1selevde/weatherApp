import {atom} from "recoil";

const notificationsState = atom({
    key: 'notificationsState',
    default: {}
});

export {
    notificationsState
}