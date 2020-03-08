import {ajax} from "../config";

export function getSetting(username) {
    return ajax.get({
        url: `/${username}/setting`,
    });
}
