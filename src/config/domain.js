import {choose} from "../util/random";
import {dateFormat} from "../util/time";

export function getUsername() {
    const hostname = window.location.hostname;
    let ind = hostname.indexOf(".");
    if (ind === -1) return "tuke";
    return hostname.slice(0, ind);
}

export function getPostLink(ctime, name) {
    ctime = dateFormat(ctime, "yyyy-MM-dd");
    const year = ctime.slice(0, 4);
    const month = ctime.slice(5, 7);
    const day = ctime.slice(8, 10);
    return `/${year}/${month}/${day}/${name}`;
}

const _BLACK_C = '3456789a';
const _LIGHT_C = 'abcdef';
// const _c = '0123456789abcdef';
const _random_d = () => choose(2, _BLACK_C);
const _random_l = () => choose(2, _LIGHT_C);
export const randomDark = () => `#${_random_d()}${_random_d()}${_random_d()}`;
export const randomLight = () => `#${_random_l()}${_random_l()}${_random_l()}`;
export const getPadding = (word) => {
    // t r b l
    switch (word.length) {
        case 1:
            return "6px 11px 6px 11px";
        case 2:
            return "6px";
        default:
            return "6px 1px 6px 1px";
    }
};
