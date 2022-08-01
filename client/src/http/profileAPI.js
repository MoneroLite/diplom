import { $authHost, $host } from "./index";

export const fetchOneProfile = async (id) => {
    const {data} = await $host.get('api/profile/' + id)
    return data
}