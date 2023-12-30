import {
	useTheme,
	Stack,
	Typography,
	Box,
	Button,
	Divider,
	CircularProgress,
} from "@mui/material"
import { useChallenge } from "../hooks/useChallenge"
import { ScoreHistory } from "./ScoreHistory"
import { ScoreCalculation } from "./ScoreCalculation"
import { Leaderboard } from "./Leaderboard"
import { useGetScores } from "@/features/account/hooks/useGetScores"
import { useGetLeaderboard } from "../hooks/useGetLeaderboard"
import { useGetAccount } from "@/features/account"
import { useScore } from "../hooks/useScore"
import { Score } from "@/features/account/types/Score"

export const Scoreboard = ({ scenarioName }: { scenarioName: string }) => {
	const theme = useTheme()
	const { showScoreboard, setShowScoreboard } = useChallenge()
	const { shotsFired, shotsHit, damage, accuracy, score } = useScore()
	const { data: getAccountResponse, isLoading: getAccountIsLoading } =
		useGetAccount()

	const { data: getScoresResponse, isLoading: getScoresIsLoading } =
		useGetScores({
			scenarioName,
		})
	const { data: getLeaderboardResponse, isLoading: getLeaderboardIsLoading } =
		useGetLeaderboard({
			scenarioName,
		})

	const highScore = getScoresResponse?.success
		? Math.max(
				...getScoresResponse.data.scores.map((score: Score) => score.score)
		  )
		: "Sign in to save"

	return (
		<>
			{showScoreboard && (
				<Stack
					width="80%"
					height="80%"
					position="absolute"
					top="50%"
					left="50%"
					paddingX={2}
					borderRadius={1}
					sx={{
						transform: "translate(-50%,-50%)",
						background: theme.palette.background.default,
						backgroundImage:
							theme.palette.mode === "dark"
								? "linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))"
								: "linear-gradient(rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05))",
					}}
				>
					<Stack flexDirection="row" paddingY={1} marginY={1}>
						<Typography variant="h4">
							Challenge Results: <Box component="span">Tile Frenzy</Box>
						</Typography>
					</Stack>
					<Divider flexItem />
					<Stack
						flexDirection="row"
						flexWrap="wrap"
						gap={2}
						overflow="auto"
						flex={1}
						paddingY={1}
						marginY={1}
					>
						<Stack flex={1}>
							{!getScoresIsLoading && !getLeaderboardIsLoading ? (
								<ScoreHistory
									score={score}
									scores={getScoresResponse?.data?.scores}
									leaderboard={getLeaderboardResponse?.data?.leaderboard}
									highScore={highScore}
								/>
							) : (
								<Stack
									width="100%"
									height="100%"
									justifyContent="center"
									alignItems="center"
								>
									<CircularProgress />
								</Stack>
							)}
						</Stack>
						<Stack flex={1}>
							{!getAccountIsLoading ? (
								<ScoreCalculation
									shotsFired={shotsFired}
									shotsHit={shotsHit}
									damage={damage}
									accuracy={accuracy}
									score={score}
									highScore={highScore}
								/>
							) : (
								<Stack
									width="100%"
									height="100%"
									justifyContent="center"
									alignItems="center"
								>
									<CircularProgress />
								</Stack>
							)}
						</Stack>
						<Stack flex={1}>
							{!getAccountIsLoading && !getLeaderboardIsLoading ? (
								<Leaderboard
									highScore={typeof highScore === "number" ? highScore : score}
									leaderboard={getLeaderboardResponse?.data?.leaderboard}
									accountId={getAccountResponse?.data?.account._id}
								/>
							) : (
								<Stack
									width="100%"
									height="100%"
									justifyContent="center"
									alignItems="center"
								>
									<CircularProgress />
								</Stack>
							)}
						</Stack>
					</Stack>
					<Divider flexItem />
					<Stack
						flexDirection="row"
						justifyContent="space-between"
						paddingY={1}
						marginY={1}
					>
						<Button
							variant="contained"
							onClick={() => setShowScoreboard(false)}
						>
							Done
						</Button>
						<Button
							variant="contained"
							onClick={() => setShowScoreboard(false)}
						>
							Replay
						</Button>
					</Stack>
				</Stack>
			)}
		</>
	)
}
