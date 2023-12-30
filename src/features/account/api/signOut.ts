import { Account } from "../types/Account"
import { axios } from "@/libs/axios"
import { ApiResponse } from "@/types/ApiResponse"
import { AxiosError } from "axios"

export const signOut = async (): Promise<ApiResponse<{ account: Account }>> => {
	try {
		const response = await axios.delete(
			"https://aim-blitz-server.onrender.com/api/accounts/sign-out"
		)

		return response.data
	} catch (error) {
		console.error("Error during signOut:", error)
		const axiosError = error as AxiosError<ApiResponse>

		const errorResponse: ApiResponse = {
			success: false,
			message: axiosError.response
				? axiosError.response.data.message
				: "Network Error or CORS issue",
			data: null,
			error: axiosError.response
				? axiosError.response.data.error
				: { code: "0", details: "Network Error or CORS issue" },
		}

		return errorResponse
	}
}
