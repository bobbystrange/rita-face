import {ajax} from "../config";

// [{id, mtime}]
export function fetchPagePostIms(username, page, size) {
    return ajax.get({
        url: `/${username}/post/ims/page`,
        params: {
            page: page,
            size: size,
        }
    });
}

// [{id, mtime}]
export function fetchPagePostImsByTag(username, tag, page, size) {
    return ajax.get({
        url: `/${username}/post/ims/page/tag/${tag}`,
        params: {
            page: page,
            size: size,
        }
    });
}

// {}
export function fetchPostById(username, id) {
    return ajax.get({
        url: `/${username}/post/id/${id}/`,
    });
}

export function fetchPostByName(username, name) {
    return ajax.get({
        url: `/${username}/post/name/${name}`,
    });
}

export function fetchTags(username) {
    return ajax.get({
        url: `/${username}/tag`,
    });
}

