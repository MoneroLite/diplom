import { $authHost, $host } from "./index";


export const fetchFavorit = async (id) => {
    const {data} = await $authHost.get('api/favorit/' + id)
    return data
}

export const changeFavorit = async (postId, userId) => {
    const {data} = await $authHost.post('api/favorit/change', {postId, userId} )
    return data
}

export const checkFavorit = async (postId, userId) => {
    const {data} = await $authHost.post('api/favorit/check', {postId, userId} )
    return data
}