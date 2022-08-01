import { $authHost, $host } from "./index";


export const fetchCatPostCount = async () => {
    const {data} = await $authHost.get('api/statistics/catpostcount')
    return data
}

