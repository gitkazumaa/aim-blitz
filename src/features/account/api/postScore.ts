import { axios } from "@/libs/axios"
import { ApiResponse } from "@/types/ApiResponse"
import { Score } from "../types/Score"
import { AxiosError } from "axios"

interface PostScoreParameters {
	scenarioName: string
	score: number
	accuracy: number
}

export const postScore = async ({
	scenarioName,
	score,
	accuracy,
}: PostScoreParameters): Promise<ApiResponse<{ score: Score }>> => {
	try {
		const response = await axios.post(
			`/api/accounts/scenarios/${scenarioName}/scores`,
			{
				score,
				accuracy,
			}
		)
		return response.data
	} catch (error) {
		console.error("Error during postScore:", error)
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
