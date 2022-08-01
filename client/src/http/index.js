import axios from 'axios';


const $host = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

const $authHost = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

// функция для автоматического подставления токена к каждому запросу
const authInterceptor = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return config
}

// для инстанса $authHost добавляем интерцептор для запроса
// он будет отрабатывать перед каждым запросом и подставлять токен в хеадер авторизейшен
$authHost.interceptors.request.use(authInterceptor)
console.log(process.env.REACT_APP_API_URL)
export {
    $host,
    $authHost
}