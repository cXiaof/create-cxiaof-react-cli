import request from 'umi-request'

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

class FetchRequest {
    constructor(url, options = {}) {
        this.url = url
        this.options = options
        this.fetching = false
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
        this.fetching = true
        return request(this.url, this.options)
    }

    cancel(msg) {
        if (this.canceler && this.fetching) {
            this.fetching = false
            this.canceler(msg)
        }
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
        this.fetching = false
        if (this.onSuccess) this.onSuccess(data)
    }

    _dealError(error) {
        this.fetching = false
        console.error(error, this.options)
        if (this.onError) this.onError(error, this.options)
    }
}

export default FetchRequest
