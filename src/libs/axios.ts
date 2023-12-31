import Axios from "axios"

export const axios = Axios.create({
	baseURL: "https://aim-blitz-server.onrender.com",
	withCredentials: true,
})
