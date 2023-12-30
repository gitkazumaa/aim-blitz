import { axios } from "@/libs/axios"
import { ApiResponse } from "@/types/ApiResponse"
import { Score } from "../types/Score"
import { AxiosError } from "axios"

interface GetScoresParameters {
	scenarioName: string
}

export const getScores = async ({
	scenarioName,
}: GetScoresParameters): Promise<ApiResponse<{ scores: Score[] }>> => {
	try {
		const response = await axios.get(
			`https://aim-blitz-server.onrender.com/api/accounts/scenarios/${scenarioName}/scores`
		)

		return response.data
	} catch (error) {
		console.error("Error during getScores:", error)
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
