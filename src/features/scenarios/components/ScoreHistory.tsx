import { Stack, Typography } from "@mui/material"
import { Score } from "@/features/account/types/Score"
import { ScoreWithUser } from "@/features/account/types/ScoreWithAccount"
import { ScoreHistoryLineGraph } from "./ScoreHistoryLineGraph"

interface ScoreHistoryProps {
	score: number
	scores: Score[]
	leaderboard: ScoreWithUser[]
	highScore: number | "Sign in to save"
}

export const ScoreHistory = ({
	score,
	scores,
	leaderboard,
	highScore,
}: ScoreHistoryProps) => {
	return (
		<Stack flex={1} gap={2}>
			<Typography textAlign="center" variant="h5">
				Score History
			</Typography>
			<Typography textAlign="center" variant="h4">
				Final Score: {score}
			</Typography>
			<Typography textAlign="center" variant="h6">
				{typeof highScore === "string"
					? "Sign in to save score"
					: `Current High Score: ${highScore}`}
			</Typography>
			{typeof highScore === "number" && (
				<Stack flexGrow={1}>
					<ScoreHistoryLineGraph
						highScore={highScore}
						scores={scores}
						leaderboard={leaderboard}
					/>
				</Stack>
			)}
		</Stack>
	)
}
