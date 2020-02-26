function set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function get(key) {
    return JSON.parse(localStorage.getItem(key));
}

function remove(key) {
    localStorage.removeItem(key);
}

// dynamic load highlight css
const HIGHLIGHT_STYLE = "HIGHLIGHT_STYLE";
const USER_SETTING = "USER_SETTING";
const SORTED_IDS = "SORTED_IDS";

export const storage = {
    setStyle(value) {
        localStorage.setItem(HIGHLIGHT_STYLE, value);
    },
    getStyle() {
        return localStorage.getItem(HIGHLIGHT_STYLE);
    },
    removeStyle() {
        localStorage.removeItem(HIGHLIGHT_STYLE);
    },

    setUserSetting(setting) {
        set(USER_SETTING, setting);
    },
    getUserSetting() {
        return get(USER_SETTING);
    },
    removeUserSetting() {
        remove(USER_SETTING);
    },

    setSortedIds(ids) {
        set(SORTED_IDS, ids);
    },
    getSortedIds() {
        const sortedIds = get(SORTED_IDS);
        return sortedIds ? sortedIds : [];
    },
    removeSortedIds() {
        remove(SORTED_IDS);
    },
};
