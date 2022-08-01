import { $authHost, $host } from "./index";
// import jwt_decode from "jwt-decode"

export const createTag = async (tag) => {
    const {data} = await $authHost.post('api/tag/create', tag)
    return data
}

export const fetchTags = async (search) => {
    const {data} = await $host.get('api/tag', {params: {search}})
    return data
}

export const fetchChartTags = async (search) => {
    const {data} = await $host.get('api/tag/charttag')
    return data
}

export const DeleteOneTag = async (id) => {
    const {data} = await $host.delete('api/tag/delete/' + id)
    return data
}