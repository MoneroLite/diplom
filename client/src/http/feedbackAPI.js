import { $authHost, $host } from "./index";
// import jwt_decode from "jwt-decode"

export const createFeedback = async (feedback) => {
    const {data} = await $authHost.post('api/feedback/create', feedback)
    return data
}

export const fetchFeedback = async () => {
    const {data} = await $host.get('api/feedback')
    return data
}

export const DeleteOneFeedback = async (id) => {
    const {data} = await $host.delete('api/feedback/delete/' + id)
    return data
}

