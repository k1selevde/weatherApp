import {atom} from "recoil";
import { AlertRestType } from "../../types";

export type NotificationType = AlertRestType

const notificationsState = atom<NotificationType[]>({
    key: 'notificationsState',
    default: []
});

export {
    notificationsState
}