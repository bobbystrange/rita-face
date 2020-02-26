import {openDB} from 'idb';
import {fetchPostById, fetchPostByName} from "./post";
import {getUsername, storage} from "../config";
import _ from "lodash";

const DATABASE_NAME = "rita-face";
const POST_STORE_NAME = "post";

export function handlePostsRes(refer, res) {
    const data = res.data.data;
    const size = refer.state.size;
    const total = data.total;
    const current_ims = data.ims;
    loadOrFetchPosts(current_ims).then(current_posts => {
        const totalPage = computeTotalPage(total, size);
        refer.setState({
            total: total,
            totalPage: totalPage,
            posts: current_posts,
        })
    });
}

export function handleMessage(refer, message) {
    refer.setState({
        error: message,
    })
}

export function handleErr(refer, err) {
    let message = _.get(err, "response.data.message", "");
    if (!message) message = `Fail to fetch resource from remote server, http status is ${err.message}`;
    refer.setState({
        error: message,
    })
}

export async function loadOrFetchPosts(current_ims) {
    const username = getUsername();
    const current_posts = [];
    const len = current_ims.length;

    let db = await getDB();
    for (let i = 0; i < len; i++) {
        const {id, mtime} = current_ims[i];

        const tx1 = db.transaction(POST_STORE_NAME, "readonly");
        const store1 = tx1.objectStore(POST_STORE_NAME);
        const cache_post = await store1.get(id);
        await tx1.done;

        let post;
        // no cache, then fetch it from internet
        if (!cache_post || mtime > cache_post.mtime) {
            post = _.get(await fetchPostById(username, id), "data.data", "");
            if (post){
                const tx2 = db.transaction(POST_STORE_NAME, "readwrite");
                const store2 = tx2.objectStore(POST_STORE_NAME);
                store2.put(post);
            }
        } else post = cache_post;

        const sortedIds = storage.getSortedIds();
        sortedInsertPost(current_posts, post);
        sortedInsertId(sortedIds, post.id);
        storage.setSortedIds(sortedIds);
    }
    return current_posts;
}

export async function loadOrFetchPostByName(name) {
    const username = getUsername();

    let db = await getDB();
    const tx1 = db.transaction(POST_STORE_NAME, "readonly");
    const index = tx1.store.index('name');
    let post = await index.get(name);
    await tx1.done;

    if (!post) {
        post = _.get(await fetchPostByName(username, name), "data.data", "");
        if (post) {
            const tx2 = db.transaction(POST_STORE_NAME, "readwrite");
            const store2 = tx2.objectStore(POST_STORE_NAME);
            store2.put(post);
        }
    }
    return post;
}

export async function searchPosts(keyword, tag) {
    const current_posts = [];

    let db = await getDB();
    const tx1 = db.transaction(POST_STORE_NAME, "readonly");
    const store1 = tx1.objectStore(POST_STORE_NAME);
    let ids = await store1.getAllKeys();
    await tx1.done;
    const len = ids.length;
    for (let i = 0; i < len; i++) {
        const id = ids[i];
        const tx2 = db.transaction(POST_STORE_NAME, "readonly");
        const store2 = tx2.objectStore(POST_STORE_NAME);
        const post = await store2.get(id);
        await tx2.done;

        if (tag && post.tags.indexOf(tag) === -1) continue;
        if (post.content.indexOf(keyword) !== -1) {
            sortedInsertPost(current_posts, post);
        }
    }
    return current_posts
}

export async function loadPostsForArchives(page, size) {
    const current_posts = [];
    const sortedIds = storage.getSortedIds();
    const total = sortedIds.length;
    const totalPage = computeTotalPage(total, size);
    if (totalPage === 0 || page > totalPage || page < 1) {
        return {current_posts, total, totalPage};
    }

    // such as size=10; page=2;
    // then [10, 19]
    let start = (page - 1) * size;
    let end = (page) * size;
    if (end > total) end = total;
    const current_ids = sortedIds.slice(start, end);
    const len = current_ids.length;

    let db = await getDB();
    for (let i = 0; i < len; i++) {
        const id = current_ids[i];
        const tx = db.transaction(POST_STORE_NAME, "readonly");
        const store = tx.objectStore(POST_STORE_NAME);
        const post = await store.get(id);
        await tx.done;
        sortedInsertPost(current_posts, post);
    }
    return {current_posts, total, totalPage}
}

async function getDB() {
    return await openDB(DATABASE_NAME, 1, {
        upgrade(db, oldVersion, newVersion, transaction) {
            if (oldVersion === 0) {
                const store = db.createObjectStore(POST_STORE_NAME,
                        {keyPath: 'id', autoIncrement: false});
                store.createIndex("name", "name", {unique: true});
            }
        },
    });
}

function computeTotalPage(total, size) {
    const offset = total % size === 0 ? 0 : 1;
    return Math.floor(total / size) + offset;
}

function sortedInsertPost(posts, newPost) {
    if (posts.length === 0) {
        posts.push(newPost);
        return;
    }

    const len = posts.length;
    for (let i = 0; i < len; i++) {
        const item = posts[i];
        // such as posts = [11,9,7,5,3,1]; item = 7; newPost = 8
        // or posts = [1,3,5,7,9,11]; item = 7; newPost = 8
        // posts.splice(posts.indexOf(item), 1, item, newPost)
        if (item.id < newPost.id) {
            posts.splice(posts.indexOf(item), 1, newPost, item);
            return;
        }
    }
    posts.push(newPost);
}

function sortedInsertId(ids, id) {
    if (ids.length === 0) {
        ids.push(id);
        return;
    }

    const len = ids.length;
    for (let i = 0; i < len; i++) {
        const item = ids[i];
        // no deal with the repeat id
        if (item === id) return;

        // such as posts = [11,9,7,5,3,1]; item = 7; newPost = 8
        // or posts = [1,3,5,7,9,11]; item = 7; newPost = 8
        // posts.splice(posts.indexOf(item), 1, item, newPost)
        if (item < id) {
            ids.splice(ids.indexOf(item), 1, id, item);
            return;
        }
    }
    ids.push(id);
}
