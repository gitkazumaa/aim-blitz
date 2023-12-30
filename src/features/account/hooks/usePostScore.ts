import { useMutation } from "@tanstack/react-query"
import { queryClient } from "@/libs/reactQuery"
import { postScore } from "../api/postScore"

interface UsePostScoreParamters {
	scenarioName: string
}

export const usePostScore = ({ scenarioName }: UsePostScoreParamters) => {
	return useMutation({
		mutationFn: postScore,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["api", "accounts", scenarioName, "scores"],
			})
			queryClient.invalidateQueries({
				queryKey: ["api", "scenarios", scenarioName, "leaderboard"],
			})
		},
	})
}
