import { axios } from "@/libs/axios"
import { ApiResponse } from "@/types/ApiResponse"
import { Account } from "../types/Account"
import { AxiosError } from "axios"

export interface UpdateAccountParameters {
	username?: string
	image?: File
}

export const updateAccount = async ({
	username,
	image,
}: UpdateAccountParameters): Promise<ApiResponse<{ account: Account }>> => {
	try {
		const formData = new FormData()

		if (username) {
			formData.append("username", username)
		}

		if (image) {
			formData.append("image", image)
		}

		const response = await axios.put("/api/accounts/edit", formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		})

		return response.data
	} catch (error) {
		console.error("Error during updateAccount:", error)
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
