import { Account } from "../types/Account"
import { axios } from "@/libs/axios"
import { ApiResponse } from "@/types/ApiResponse"
import { AxiosError } from "axios"

export const signIn = async (
	password: string,
	username: string
): Promise<ApiResponse<{ account: Account }>> => {
	try {
		const response = await axios.post("/aim-blitz-server/accounts/sign-in", {
			password: password,
			username: username,
		})

		return response.data
	} catch (error) {
		console.error("Error during signIn:", error)
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
