import { $authHost, $host } from "./index";
import jwt_decode from "jwt-decode"

export const registration = async (login, password) => {
    const {data} = await $host.post('api/user/registration', {login, password, role: 'USER'})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const logIn = async (login, password) => {
    const {data} = await $host.post('api/user/login', {login, password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const check = async () => {
    const {data} = await $authHost.get('api/user/auth', {});
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const fetchUsers = async (search) => {
    const {data} = await $authHost.get('api/user/all', {params: {search}});
    return (data)
}

export const updateUser = async (user) => {
    const {data} = await $host.put('api/user/update', user)
    return data
}

export const updateUserImg = async (user) => {
    const {data} = await $host.put('api/user/updateimg', user)
    return data
}

export const DeleteOneUser = async (id) => {
    const {data} = await $host.delete('api/user/delete/' + id)
    return data
}