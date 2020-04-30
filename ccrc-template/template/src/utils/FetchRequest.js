import request from 'umi-request'
import URLSearchParams from 'url-search-params'

const { CancelToken } = request

request.interceptors.request.use((url, options) => {
    if (options.data && options.requestType === 'form')
        options.data = new URLSearchParams(
            Object.entries(options.data).map(([key, value]) => [
                key,
                typeof value === 'object' ? JSON.stringify(value) : value,
            ])
        )
    return { url, options }
})

export default class {
    constructor(url, options = {}) {
        this.url = url
        this.options = options
        this.needToken = true
    }

    noToken() {
        this.needToken = false
        return this
    }

    fetch(method, requestType) {
        this.getPromise(method, requestType)
            .then(this._dealSuccess.bind(this))
            .catch(this._dealError.bind(this))
        return this
    }

    getPromise(method, requestType) {
        const { token, cancel } = CancelToken.source()
        this.options.method = method
        this.options.requestType = requestType
        this.options.cancelToken = token
        this.canceler = cancel
        if (this.needToken) {
            const Tingtoken = sessionStorage.getItem('Tingtoken')
            if (Tingtoken) this.options.headers = { Tingtoken }
        }
        return request(this.url, this.options)
    }

    cancel(msg) {
        if (this.canceler) this.canceler(msg)
        return this
    }

    success(onSuccess = () => false) {
        this.onSuccess = onSuccess
        return this
    }

    error(onError = () => false) {
        this.onError = onError
        return this
    }

    _dealSuccess(data) {
        if (this.onSuccess) this.onSuccess(data)
    }

    _dealError(error) {
        console.error(error, this.options)
        if (this.onError) this.onError(error, this.options)
    }
}
