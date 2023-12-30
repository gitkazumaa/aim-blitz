import { PublicAccount } from "../types/PublicAccount"
import { axios } from "@/libs/axios"
import { ApiResponse } from "@/types/ApiResponse"
import { AxiosError } from "axios"

interface GetAccountByIdParameters {
	accountId: string
}

export const getAccountById = async ({
	accountId,
}: GetAccountByIdParameters): Promise<
	ApiResponse<{ account: PublicAccount }>
> => {
	try {
		const response = await axios.get(`/api/accounts/${accountId}`)

		return response.data
	} catch (error) {
		console.error("Error during getAccountById:", error)
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
