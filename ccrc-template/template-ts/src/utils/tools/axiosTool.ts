import axios, {
    AxiosRequestConfig,
    Canceler,
    AxiosResponse,
    AxiosError,
    Method,
} from 'axios'

axios.defaults.baseURL = './'
axios.defaults.headers.post = {
    Accept: 'application/json',
    'Content-Type': 'application/json;charset=UTF-8',
}
axios.defaults.transformRequest = [JSON.stringify]
axios.defaults.withCredentials = true

let global: any = window

class AxiosTool {
    options: AxiosRequestConfig
    onSuccess?: any
    onError?: any
    canceler?: Canceler

    constructor(options: AxiosRequestConfig) {
        this.options = options
    }

    _dealSuccess(response: AxiosResponse) {
        const { status, statusText, data } = response
        if (status && status === 200) {
            global.response = data
            if (this.onSuccess) this.onSuccess(data)
        } else this._dealError(statusText)
        return this
    }

    _dealError(error: AxiosError | string) {
        if (error) console.error(error)
        if (this.onError) this.onError(error)
        return this
    }

    _getOptionsWithCancelToken(method?: Method) {
        return {
            ...this.options,
            method,
            cancelToken: new axios.CancelToken((c) => (this.canceler = c)),
        }
    }

    success(onSuccess: any = () => false) {
        this.onSuccess = onSuccess
        return this
    }

    error(onError: any = () => false) {
        this.onError = onError
        return this
    }

    getPromise(method?: Method) {
        return axios(this._getOptionsWithCancelToken(method))
    }

    fetch(method?: Method) {
        this.getPromise(method)
            .then(this._dealSuccess.bind(this))
            .catch(this._dealError.bind(this))
        return this
    }

    cancel(msg?: string) {
        if (this.canceler) this.canceler(msg)
        return this
    }
}

export default (attr: AxiosRequestConfig) => new AxiosTool(attr)
