import { useQuery } from "@tanstack/react-query"
import { getLeaderboard } from "../api/getLeaderboard"

interface UseLeaderboardParameters {
	scenarioName: string
}

export const useGetLeaderboard = ({
	scenarioName,
}: UseLeaderboardParameters) => {
	return useQuery({
		queryKey: ["api", "scenarios", scenarioName, "leaderboard"],
		queryFn: () => getLeaderboard({ scenarioName }),
	})
}
