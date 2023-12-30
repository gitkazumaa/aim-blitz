import { useTheme, Stack, Typography } from "@mui/material"
import { useChallenge } from "../hooks/useChallenge"
import { useScore } from "../hooks/useScore"

export const Statistics = () => {
	const theme = useTheme()
	const { isChallenge } = useChallenge()
	const { shotsHit, shotsFired, accuracy, damage } = useScore()

	return (
		<>
			{isChallenge && (
				<Stack
					sx={{
						position: "absolute",
						top: 0,
						left: 0,
						px: 2,
						py: 1,
						backgroundColor: `${theme.palette.background.default}BF`,
						backgroundImage:
							theme.palette.mode === "dark"
								? "linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))"
								: "linear-gradient(rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05))",
						borderRadius: 1,
						margin: 1,
					}}
				>
					<Typography>Kill Count: {shotsHit}</Typography>
					<Typography>
						Accuracy: {shotsHit}/{shotsFired} ({accuracy}%)
					</Typography>
					<Typography>
						Damage: {damage}/{shotsFired * 25} ({accuracy}%)
					</Typography>
				</Stack>
			)}
		</>
	)
}
