

import axios from 'axios'
const accessToken = localStorage.getItem('accessToken')
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

const http = axios.create({
    baseURL: serverUrl,
})

// Add the authorization header on requests
http.interceptors.request.use(
    (config: any) => {
        config.headers['X-Requested-With'] = 'XMLHttpRequest'
        config.headers['accept'] = 'application/json, text/plain, */*'
        if (!accessToken) return config;
        config.headers.Authorization = `Bearer ${accessToken}`
        return config
    },
    (error: any) => {
        return Promise.reject(error)
    },
)

// Redirect request if 401 is returned
http.interceptors.response.use(undefined, async (error: { response: any; }) => {
    const errorResponse = error.response
    if (!errorResponse) return

    if (errorResponse && errorResponse.status === 401) {
        localStorage.clear()
        return Promise.resolve()
    }

    return Promise.reject(errorResponse)
})

export default http;
export { httpWithoutAuth };