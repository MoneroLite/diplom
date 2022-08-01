import { $authHost, $host } from "./index";
// import jwt_decode from "jwt-decode"

export const createPost = async (post) => {
    const {data} = await $authHost.post('api/post', post)
    return data
}

export const createComm = async (comm) => {
    const {data} = await $authHost.post('api/post/comm', comm)
    return data
}

export const deleteComm = async (id) => {
    const {data} = await $authHost.delete('api/post/deletecomm/' + id)
    return data
}

export const fetchPost = async (search) => {
    const {data} = await $host.get('api/post', {params: {search}})
    return data
}

export const fetchCategoryPosts = async () => {
    const {data} = await $host.get('api/post')
    return data
}

export const fetchOnePost = async (id) => {
    const {data} = await $host.get('api/post/' + id)
    return data
}

export const DeleteOnePost = async (id) => {
    const {data} = await $host.delete('api/post/delete/' + id)
    return data
}

