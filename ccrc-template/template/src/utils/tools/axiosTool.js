import axios from 'axios'
import URLSearchParams from 'url-search-params'

const { CancelToken } = axios

axios.defaults.withCredentials = true

window.configEncoded = {
    baseURL: './',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    transformRequest: [
        (data) =>
            new URLSearchParams(
                Object.entries(data).map(([key, value]) => [
                    key,
                    typeof value === 'object' ? JSON.stringify(value) : value
                ])
            ).toString()
    ]
}
window.configJSON = {
    baseURL: './',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
    },
    transformRequest: [JSON.stringify]
}

class AxiosTool {
    constructor(options) {
        this.options = options
    }

    _dealSuccess(res) {
        const { status, statusText, data } = res
        if (status && status === 200) {
            window.response = data
            if (this.onSuccess) this.onSuccess(data)
        } else this._dealError(statusText)
        return this
    }

    _dealError(txt) {
        if (txt) console.error(txt)
        if (this.onError) this.onError(txt)
        return this
    }

    _getOptionsWithCancelToken(method) {
        return {
            ...this.options,
            method,
            cancelToken: new CancelToken((c) => (this.cancelToken = c))
        }
    }

    success(onSuccess = () => false) {
        this.onSuccess = onSuccess
        return this
    }

    error(onError = () => false) {
        this.onError = onError
        return this
    }

    getPromise(method) {
        return axios(this._getOptionsWithCancelToken(method))
    }

    fetch(method) {
        this.getPromise(method)
            .then(this._dealSuccess.bind(this))
            .catch(this._dealError.bind(this))
        return this
    }

    cancel(msg) {
        if (this.cancelToken) this.cancelToken(msg)
        return this
    }
}

export default (attr) => new AxiosTool(attr)
