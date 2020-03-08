import axios from 'axios'

const cancels = {};
const requestQueue = [];
axios.defaults.timeout = 5000;
axios.defaults.withCredentials = false;
axios.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8';
if (process.env.NODE_ENV === 'development') {
    axios.defaults.baseURL = `http://localhost:8080/api/v1/face`;
} else {
    axios.defaults.baseURL = `http://stranges.org/api/v1/face`;

}

axios.interceptors.request.use(
    config => {
        // Do something before request is sent
        const request = JSON.stringify(config.url) + JSON.stringify(config.data);
        config.cancelToken = new axios.CancelToken((cancel) => {
            cancels[request] = cancel
        });
        if (requestQueue.includes(request)) {
            cancels[request]('cancel repeat http request')
        } else {
            requestQueue.push(request)
        }
        return config;
    }, err => {
        // Do something with request error

        return Promise.reject(err);
    });

axios.interceptors.response.use(
    res => {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        const request = JSON.stringify(res.config.url) + JSON.stringify(res.config.data);
        // remove current request which already was handled
        requestQueue.splice(requestQueue.findIndex(item => item === request), 1)
        return res;
    }, err => {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        if (err.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(err.response)
        } else if (err.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(err.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log(err.message);
        }

        // empty request queue when cancel or remove current request which already was handled
        if (axios.isCancel(err)) {
            requestQueue.length = 0
        } else {
            const request = JSON.stringify(err.config.url) + JSON.stringify(err.config.data);
            requestQueue.splice(requestQueue.findIndex(item => item === request), 1)
        }
        return Promise.reject(err);
    });

const ajax = {
    request(method, {url, data, params, headers = {}, config}) {
        return new Promise((resolve, reject) => {
            axios({
                method: method.toLowerCase(),
                url: url,
                headers: headers,
                params: params,
                data: data,
                ...config,
            }).then(res => {
                // pass the response object to the returned promise
                resolve(res)
            }, err => {
                if (!err.Cancel) {
                    reject(err)
                }
            }).catch(err => {
                reject(err)
            })
        })
    },
    get(options) {
        return ajax.request("get", options);
    },
    post(options) {
        return ajax.request("post", options);
    },
    put(options) {
        return ajax.request("put", options);
    },
    del(options) {
        return ajax.request("delete", options);
    }
};


export default ajax;
