import { axios } from "@/libs/axios"
import { ApiResponse } from "@/types/ApiResponse"
import { ScoreWithScenario } from "../types/ScoreWithScenario"
import { AxiosError } from "axios"

interface GetScoresByIdParameters {
	accountId: string
}

export const getRecentScoresById = async ({
	accountId,
}: GetScoresByIdParameters): Promise<
	ApiResponse<{ scores: ScoreWithScenario }>
> => {
	try {
		const response = await axios.get(`/api/accounts/${accountId}/recent-scores`)

		return response.data
	} catch (error) {
		console.error("Error during getRecentScoresById:", error)
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
