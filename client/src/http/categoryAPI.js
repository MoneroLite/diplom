import { $authHost, $host } from "./index";


export const createCategory = async (category) => {
    const {data} = await $authHost.post('api/category', category)
    return data
}

export const fetchCategory = async (search) => {
    const {data} = await $host.get('api/category', {params: {search}})
    return data
}

export const fetchOneCategory = async (id, search) => {
    const {data} = await $host.get('api/category/' + id, {params: {search}})
    return data
}

export const updateCategory = async (category) => {
    const {data} = await $host.put('api/category/update', category)
    return data
}

export const updateCategoryImg = async (category) => {
    const {data} = await $host.put('api/category/updateimg', category)
    return data
}

export const DeleteOneCategory = async (id) => {
    const {data} = await $host.delete('api/category/delete/' + id)
    return data
}