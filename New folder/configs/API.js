import axios from "axios";

export const endpoints = {
    "car" : "/Car/",
    "trip" : "/Trip/",
    "carname":(tripId) => `/Trip/${tripId}/CarName/`,
    "carname-details" :(carnameId) => `/CarName/${carnameId}/`,
    "login" : "/o/token/",

}
export default axios.create({
    baseURL : "http://127.0.0.1:8000"
})