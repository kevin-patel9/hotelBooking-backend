import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://booking-hotelss.herokuapp.com/"
})