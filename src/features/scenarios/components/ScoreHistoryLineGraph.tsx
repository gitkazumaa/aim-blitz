import { useTheme, Stack, Typography } from "@mui/material"
import { Score } from "@/features/account/types/Score"
import { ScoreWithUser } from "@/features/account/types/ScoreWithAccount"
import { Chart, TimeSeriesScale, ChartOptions } from "chart.js/auto"
import { Line } from "react-chartjs-2"
import annotationPlugin from "chartjs-plugin-annotation"
import percentile from "percentile"
import "chartjs-adapter-date-fns"

Chart.register(annotationPlugin)
Chart.register(TimeSeriesScale)

interface ScoreHistoryLineGraphProps {
	highScore: number
	scores: Score[]
	leaderboard: ScoreWithUser[]
}

export const ScoreHistoryLineGraph = ({
	highScore,
	scores,
	leaderboard,
}: ScoreHistoryLineGraphProps) => {
	const theme = useTheme()
	const scoresDates = scores.map(score => score.date)
	const scoreScores = scores.map(score => score.score)
	const leaderboardScores = leaderboard.map(score => score.score)
	const ninetiethPercentile = percentile(90, leaderboardScores)
	const seventyfifthPercentile = percentile(75, leaderboardScores)
	const fiftiethPercentile = percentile(50, leaderboardScores)
	const twentyfifthPercentile = percentile(25, leaderboardScores)

	return (
		<>
			{scores.length > 0 && leaderboard.length > 0 ? (
				<Line
					data={{
						labels: scoresDates,
						datasets: [
							{
								label: "Score History",
								data: scoreScores,
								fill: true,
								borderColor: theme.palette.primary.main,
								backgroundColor: `${theme.palette.primary.main}99`,
								tension: 0.05,
							},
						],
					}}
					options={{
						maintainAspectRatio: false,
						plugins: {
							legend: {
								display: false,
							},
							annotation: {
								annotations: {
									personalBest: {
										type: "line",
										yMin: highScore,
										yMax: highScore,
										borderColor: theme.palette.primary.dark,
										borderWidth: 2,
										label: {
											display: true,
											position: "0%",
											content: `Personal Best: ${highScore}`,
											color: theme.palette.text.primary,
											backgroundColor: theme.palette.background.default,
										},
									},
									ninetiethPercentile: {
										type: "line",
										yMin: ninetiethPercentile,
										yMax: ninetiethPercentile,
										borderColor: theme.palette.text.disabled,
										borderWidth: 2,
										label: {
											display: true,
											position: "100%",
											content: "90th Percentile",
											color: theme.palette.text.secondary,
											backgroundColor: theme.palette.background.default,
										},
									},
									seventyfifthPercentile: {
										type: "line",
										yMin: seventyfifthPercentile,
										yMax: seventyfifthPercentile,
										borderColor: theme.palette.text.disabled,
										borderWidth: 2,
										label: {
											display: true,
											position: "100%",
											content: "75th Percentile",
											color: theme.palette.text.secondary,
											backgroundColor: theme.palette.background.default,
										},
									},
									fiftiethPercentile: {
										type: "line",
										yMin: fiftiethPercentile,
										yMax: fiftiethPercentile,
										borderColor: theme.palette.text.disabled,
										borderWidth: 2,
										label: {
											display: true,
											position: "100%",
											content: "50th Percentile",
											color: theme.palette.text.secondary,
											backgroundColor: theme.palette.background.default,
										},
									},
									twentyfifthPercentile: {
										type: "line",
										yMin: twentyfifthPercentile,
										yMax: twentyfifthPercentile,
										borderColor: theme.palette.text.disabled,
										borderWidth: 2,
										label: {
											display: true,
											position: "100%",
											content: "25th Percentile",
											color: theme.palette.text.secondary,
											backgroundColor: theme.palette.background.default,
										},
									},
								} as ChartOptions<any>,
							},
						},
						scales: {
							x: {
								type: "timeseries",
								time: {
									unit: "day",
								},
								display: false,
							},
						},
					}}
				/>
			) : (
				<Stack height="100%" justifyContent="center" alignItems="center">
					<Typography variant="h6">No Scores</Typography>
				</Stack>
			)}
		</>
	)
}
