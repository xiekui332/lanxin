import service from './http.js'
import QS from 'qs'

export const handleLogin = (params) => {
    return new Promise((resolve, reject) => {
        service.post('/userInfo/login', QS.stringify(params))
        .then((res) => {
            resolve(res)
        })
        .catch((err) => {
            reject(err)
        })
    })
}