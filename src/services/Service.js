import axios from "axios";

const jsonplaceholderApiClient = axios.create({
    baseURL: 'https://my-json-server.typicode.com/eddiehe49/profile-pictures',
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})
const kratesApiClient = axios.create({
    baseURL: 'https://krat.es/' + process.env.VUE_APP_Krates_ID,
    withCredentials: false,
    headers: {
        'x-api-key': process.env.VUE_APP_Krates_x_api_key,
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

export default {
    getJsonplaceholderProfilePicturesJson() {
        return jsonplaceholderApiClient.get('/profilePictures')
    },
    patchJsonplaceholderProfilePicturesJson(id, profilePictures) {
        return jsonplaceholderApiClient.patch('/profilePictures/' + id, profilePictures)
    },
    getKratesProfilePicturesJson() {
        return kratesApiClient.get('/record/' + process.env.VUE_APP_Krates_record)
    },
    putKratesProfilePicturesJson(profilePictures) {
        return kratesApiClient.put('/' + process.env.VUE_APP_Krates_record, profilePictures)
    },
}