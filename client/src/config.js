import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://hotel-booking12.herokuapp.com/"
})