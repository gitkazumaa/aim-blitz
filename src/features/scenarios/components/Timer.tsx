import { useTheme, Stack, Typography } from "@mui/material"
import { useChallenge } from "../hooks/useChallenge"
import { useTimer } from "../hooks/useTimer"

export const Timer = () => {
	const theme = useTheme()
	const { isChallenge } = useChallenge()
	const { minutes, seconds } = useTimer()

	return (
		<>
			{isChallenge && (
				<Stack
					sx={{
						position: "absolute",
						top: 0,
						left: "50%",
						px: 2,
						py: 1,
						transform: "translate(-50%, 0)",
						backgroundColor: `${theme.palette.background.default}BF`,
						backgroundImage:
							theme.palette.mode === "dark"
								? "linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))"
								: "linear-gradient(rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05))",
						borderRadius: 1,
						marginY: 1,
					}}
				>
					<Typography>
						{minutes > 9 ? minutes : "0" + minutes}:
						{seconds > 9 ? seconds : "0" + seconds}
					</Typography>
				</Stack>
			)}
		</>
	)
}
