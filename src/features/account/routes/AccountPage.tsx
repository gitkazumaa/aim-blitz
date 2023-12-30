import {
	useTheme,
	Stack,
	Avatar,
	Card,
	CardContent,
	Grid,
	Typography,
	Divider,
} from "@mui/material"
import { useLoaderData } from "react-router-dom"
import { PublicAccount } from "../types/PublicAccount"
import { ScoreWithScenario } from "../types/ScoreWithScenario"

export const AccountPage = () => {
	const theme = useTheme()
	console.log(theme)

	const { account, recentScores } = useLoaderData() as {
		account: PublicAccount
		recentScores: ScoreWithScenario[]
	}

	return (
		<>
			<Stack paddingX={4} height="100%" width="100%">
				<Stack>
					{/* Header with account image and username */}
					<Grid
						container
						justifyContent="center"
						alignItems="center"
						spacing={4}
						sx={{ my: 1, py: 1 }}
					>
						<Grid item>
							<Avatar
								alt={account.username}
								src={account.image}
								sx={{ width: 96, height: 96 }}
							/>
						</Grid>
						<Grid item>
							<Typography variant="h1">{account.username}</Typography>
						</Grid>
					</Grid>

					{/* Cards with scores */}
					<Grid container spacing={2} sx={{ my: 1, py: 1 }}>
						<Grid item xs={12}>
							<Typography variant="h3" my={1} py={1}>
								Recent Scores
							</Typography>
							<Divider />
						</Grid>
						{recentScores.length > 0 ? (
							recentScores.map((score, index) => (
								<Grid item key={index} xs={12} md={6} lg={4}>
									<Card
										sx={{
											":hover": {
												boxShadow: `0 0 10px 5px ${theme.palette.primary.main}`,
											},
											transition: "box-shadow 0.3s ease-in-out",
											backgroundImage:
												theme.palette.mode === "dark"
													? "linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))"
													: "linear-gradient(rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05))",
										}}
									>
										<CardContent>
											<Typography variant="h5" gutterBottom>
												Score: {score.scenarioId.scenarioName}
											</Typography>
											<Typography variant="h6" gutterBottom>
												Score: {score.score}
											</Typography>
											<Typography variant="body2" color="text.secondary">
												Accuracy: {score.accuracy}
											</Typography>
											<Typography variant="body2" color="text.secondary">
												Date: {new Date(score.date).toLocaleDateString()}
											</Typography>
										</CardContent>
									</Card>
								</Grid>
							))
						) : (
							<Grid item xs={12}>
								<Typography variant="h5" my={1} py={1}>
									No Recent Scores
								</Typography>
							</Grid>
						)}
					</Grid>
				</Stack>
			</Stack>
		</>
	)
}
