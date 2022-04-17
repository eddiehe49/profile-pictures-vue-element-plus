import axios from "axios";

const jsonplaceholderApiClient = axios.create({
    baseURL: 'https://my-json-server.typicode.com/eddiehe49/avatars',
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})
const jsonbinApiClient = axios.create({
    baseURL: "https://api.jsonbin.io/v3/b/" + process.env.VUE_APP_BIN_ID,
    withCredentials: false,
    headers: {
        "X-Master-Key": "$2b$10$Dr3C03m96HY3V014" + process.env.VUE_APP_X_Master_Key,
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})
const kratesApiClient = axios.create({
    baseURL: "https://krat.es/" + process.env.VUE_APP_Krate_ID,
    withCredentials: false,
    headers: {
        "x-api-key": process.env.VUE_APP_x_api_key,
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

export default {
    getJsonplaceholderAvatarsJson() {
        return jsonplaceholderApiClient.get('/avatars')
    },
    patchJsonplaceholderAvatarsJson(id, avatars) {
        return jsonplaceholderApiClient.patch('/avatars/' + id, avatars)
    },
    getJsonbinAvatarsJson() {
        return jsonbinApiClient.get('/latest')
    },
    putJsonbinAvatarsJson(avatars) {
        return jsonbinApiClient.put('', avatars)
    },
    getKratesAvatarsJson() {
        return kratesApiClient.get("/record/624c33c65a015dc4d2223b6e")
    },
    putKratesAvatarsJson(favicons) {
        return kratesApiClient.put('/624c33c65a015dc4d2223b6e', favicons)
    },
}