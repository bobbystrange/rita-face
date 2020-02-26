import {ajax} from "../config";

export function fetchSetting(username) {
    return ajax.get({
        url: `/${username}/setting`,
    });
}
