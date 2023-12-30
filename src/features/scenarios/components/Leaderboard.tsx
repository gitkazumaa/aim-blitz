import { ScoreWithUser } from "@/features/account/types/ScoreWithAccount"
import {
	useTheme,
	Stack,
	Table,
	TableContainer,
	TableHead,
	Typography,
	TableCell,
	TableBody,
	TableRow,
	Avatar,
} from "@mui/material"
import { percentile } from "../utils/percentile"
import { median } from "../utils/median"

interface LeaderboardProps {
	highScore: number
	leaderboard: ScoreWithUser[]
	accountId?: string
}

export const Leaderboard = ({
	highScore,
	leaderboard,
	accountId,
}: LeaderboardProps) => {
	const theme = useTheme()
	const leaderboardScores = leaderboard.map(score => score.score)

	return (
		<>
			{leaderboard.length > 0 ? (
				<Stack flex={1}>
					<Typography textAlign="center" variant="h5">
						Tile Frenzy
					</Typography>
					<Stack flexDirection="row" justifyContent="space-between">
						<Typography>Entries: {leaderboard.length}</Typography>
						<Typography>Median: {median(leaderboardScores)}</Typography>
						<Typography>
							Percentile: {percentile(highScore, leaderboardScores)}
						</Typography>
					</Stack>
					<TableContainer>
						<Table stickyHeader>
							<TableHead>
								<TableRow>
									<TableCell>Rank</TableCell>
									<TableCell>Player</TableCell>
									<TableCell>Score</TableCell>
									<TableCell>Acc</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{leaderboard.map((scoreWithUser, index) => (
									<TableRow
										key={scoreWithUser.accountId.username}
										sx={{
											"&:nth-of-type(odd)": {
												backgroundColor:
													accountId && accountId === scoreWithUser.accountId._id
														? theme.palette.primary.main
														: theme.palette.action.hover,
											},
											"&:last-child td, &:last-child th": {
												border: 0,
											},
											backgroundColor:
												accountId && accountId === scoreWithUser.accountId._id
													? theme.palette.primary.main
													: theme.palette.background.default,
										}}
									>
										<TableCell>{index + 1}</TableCell>
										<TableCell>
											<Stack
												flexDirection={"row"}
												alignItems={"center"}
												gap={2}
											>
												<Avatar
													src={scoreWithUser.accountId.image}
													alt={scoreWithUser.accountId.image}
													sx={{
														width: 24,
														height: 24,
													}}
												/>
												<Typography variant="body2">
													{scoreWithUser.accountId.username}
												</Typography>
											</Stack>
										</TableCell>
										<TableCell>{scoreWithUser.score}</TableCell>
										<TableCell>{scoreWithUser.accuracy}</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				</Stack>
			) : (
				<Stack height="100%" justifyContent="center" alignItems="center">
					<Typography variant="h6">No Leaderboard</Typography>
				</Stack>
			)}
		</>
	)
}
