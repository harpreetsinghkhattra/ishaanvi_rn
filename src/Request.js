import Config from "./Config"

const request = function (url, opts) {

    const options = Object.assign({
        "method": "POST",
        headers: new Headers({ "content-type": "application/json" })
    }, opts)

    console.log(options);

    return wrappedFetch(url, options);
}

const wrappedFetch = function (url, options) {
    return fetch(url, options)
        .then(response => (response.ok) ? response.json() : response)
        .then(res => Promise.resolve(res));
}

export {
    request
}
