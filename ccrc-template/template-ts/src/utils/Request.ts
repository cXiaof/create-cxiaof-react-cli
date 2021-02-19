import { extend } from 'umi-request'

let request = extend({})

export const getCancelToken = () => request.CancelToken.source()

export default request
