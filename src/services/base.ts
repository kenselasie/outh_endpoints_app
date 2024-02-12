

import axios from 'axios'

const serverUrl = process.env.NEXT_PUBLIC_SERVER_API;

const httpWithoutAuth = axios.create({
    baseURL: serverUrl,
})

// For requests without headers
httpWithoutAuth.interceptors.request.use(
    (config: any) => {
        config.headers['X-Requested-With'] = 'XMLHttpRequest'
        return config
    },
    (error: any) => {
        return Promise.reject(error)
    },
)

httpWithoutAuth.interceptors.response.use(undefined, (error) => {
    const errorResponse = error.response
    return Promise.reject(errorResponse)
})

// export default http;
export { httpWithoutAuth };