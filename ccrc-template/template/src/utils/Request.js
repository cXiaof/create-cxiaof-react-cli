import umiRequest, { extend } from 'umi-request'

let request = extend({})

// request.interceptors.request.use((url, options) => {
//     if (options.data && options.requestType === 'form')
//         options.data = new URLSearchParams(
//             Object.entries(options.data).map(([key, value]) => [
//                 key,
//                 typeof value === 'object' ? JSON.stringify(value) : value,
//             ])
//         )
//     return { url, options }
// })

// request.interceptors.request.use((url, options) => {
//     if (!options.noToken) {
//         const Tingtoken = localStorage.getItem('Tingtoken')
//         if (Tingtoken) options.headers = { Tingtoken }
//     }
//     return { url, options }
// })

export const getCancelToken = () => {
    const CancelToken = umiRequest.CancelToken
    const { token, cancel } = CancelToken.source()
    return [token, cancel]
}

export default request
