import { axios } from "@/libs/axios"
import { ApiResponse } from "@/types/ApiResponse"
import { Settings } from "@/features/settings"
import { AxiosError } from "axios"

export interface UpdateSettingsParameters {
	settings: Settings
}

export const updateSettings = async ({
	settings,
}: UpdateSettingsParameters): Promise<ApiResponse<{ settings: Settings }>> => {
	try {
		const response = await axios.put(
			"https://aim-blitz-server.onrender.com/api/accounts/settings",
			{ settings }
		)

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
