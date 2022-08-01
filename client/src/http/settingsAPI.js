import { $authHost, $host } from "./index";

export const fetchInfo = async (id) => {
    const {data} = await $authHost.post('api/settings', {id: id})
    return data
}
export const updateInfo = async (user) => {
    const {data} = await $authHost.put('api/settings/updateinfo', user)
    return data
}
export const settingsUpdateImg = async (user) => {
    const {data} = await $authHost.put('api/settings/updateimg', user)
    return data
}
export const updatePassword = async (pass) => {
    const {data} = await $authHost.put('api/settings/updateuser', pass)
    return data
}
