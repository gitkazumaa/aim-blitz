import { axios } from "@/libs/axios"
import { ApiResponse } from "@/types/ApiResponse"
import { ScoreWithUser } from "@/features/account/types/ScoreWithAccount"
import { AxiosError } from "axios"

interface GetLeaderboardParameters {
	scenarioName: string
}

export const getLeaderboard = async ({
	scenarioName,
}: GetLeaderboardParameters): Promise<
	ApiResponse<{ scores: ScoreWithUser[] }>
> => {
	try {
		const response = await axios.get(
			`https://aim-blitz-server.onrender.com/api/scenarios/${scenarioName}/leaderboard`
		)

		return response.data
	} catch (error) {
		console.error("Error during getLeaderboard:", error)
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
