
enum RequestCache {
    noCache = 'no-cache',
    default = 'default',
    reload = 'reload',
    forceCache = 'force-cache',
    onlyIfCached = 'only-if-cached',
    cache = 'cache',
};

enum RequestMode {
    noCors = 'no-cors',
    sameOrigin = 'same-origin',
    cors = 'cors',
};


/* tslint:disable */
async function mock_post (mock_res: any, url: string,
    token?: string,
    data?: any,
    mode?: RequestMode,
    cache?: RequestCache): Promise<any> {
    return mock_res;
};

let get = function getRequest(url: string,
    token?: string,
    data: any = {},
    mode?: RequestMode,
    cache?: RequestCache): Promise<any> {

    if (!mode) {
        mode = RequestMode.sameOrigin;
    }
    if (!cache) {
        cache = RequestCache.default;
    }
    // config request
    let config: any = {
        cache: cache, // 'no-cache', 
        // *default, cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *omit
        headers: {
            'user-agent': 'Mozilla/4.0 MDN Example',
            'content-type': 'application/json',
            'X-Authorization': 'Bearer'+token,
        },
        method: 'GET', // *GET, PUT, DELETE, etc.
        mode: mode, // no-cors, *same-origin, cors
        redirect: 'follow', // *manual, error
        referrer: 'no-referrer', // *client
    }

    let esc = encodeURIComponent
    let query = Object.keys(data)
        .map(k => esc(k) + '=' + esc(data[k]))
        .join('&')
    url += '?' + query

    // fetch api
    return fetch(url, config)
        // decode as json
        .then((response: Response) => {
            return response.json()
        })
        .then(json => {
            if (json.error) {
                if (json.error.statusCode == 401) {
                    // User.logout();
                }
                return Promise.reject(new Error(json.error));
            }
            return Promise.resolve(json);
        })
};

let patch = function patchRequest(url: string,
    token?: string,
    data?: any,
    mode?: RequestMode,
    cache?: RequestCache): Promise<any> {

    if (!mode) {
        mode = RequestMode.sameOrigin;
    }
    if (!cache) {
        cache = RequestCache.default;
    }

    // config request
    let config: any = {
        body: JSON.stringify(data),
        cache: cache, // 'no-cache', 
        // *default, cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *omit
        headers: {
            'user-agent': 'Mozilla/4.0 MDN Example',
            'content-type': 'application/json',
            'X-Authorization': 'Bearer'+token,
        },
        method: 'PATCH', // *GET, PUT, DELETE, etc.
        mode: mode, // no-cors, *same-origin, cors
        redirect: 'follow', // *manual, error
        referrer: 'no-referrer', // *client
    }

    // fetch api

    return fetch(url, config)
        // decode as json
        .then((response: Response) => {
            if (response.status != 200)
                return Promise.reject(response.json())
            else
                return response.json()
        })
}

export {
    get,
    RequestCache,
    RequestMode,
    patch,
    mock_post,
};
