import { useQuery } from "@tanstack/react-query"
import { getScores } from "../api/getScores"

interface UseGetScoresParamters {
	scenarioName: string
}

export const useGetScores = ({ scenarioName }: UseGetScoresParamters) => {
	return useQuery({
		queryKey: ["api", "accounts", scenarioName, "scores"],
		queryFn: () => getScores({ scenarioName }),
	})
}
