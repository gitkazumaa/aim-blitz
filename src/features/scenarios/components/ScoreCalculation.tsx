import {
	useTheme,
	Stack,
	TableCell,
	TableContainer,
	Table,
	TableHead,
	TableRow,
	Typography,
	TableBody,
	Divider,
	Box,
} from "@mui/material"

interface ScoreCalculationProps {
	shotsFired: number
	shotsHit: number
	damage: number
	accuracy: number
	score: number
	highScore: number | "Sign in to save"
}

export const ScoreCalculation = ({
	shotsFired,
	shotsHit,
	damage,
	accuracy,
	score,
	highScore,
}: ScoreCalculationProps) => {
	const theme = useTheme()

	return (
		<Stack flex={1} gap={2}>
			<Typography textAlign="center" variant="h5">
				Score Calculation
			</Typography>
			<TableContainer>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell></TableCell>
							<TableCell color={theme.palette.primary.main}>Given</TableCell>
							<TableCell color={theme.palette.primary.main}>x</TableCell>
							<TableCell color={theme.palette.primary.main}>=</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						<TableRow>
							<TableCell>Damage</TableCell>
							<TableCell>{damage}</TableCell>
							<TableCell>0</TableCell>
							<TableCell>0.0</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>HITS</TableCell>
							<TableCell>{shotsHit}</TableCell>
							<TableCell>0</TableCell>
							<TableCell>0</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>KILLS</TableCell>
							<TableCell>{shotsHit}</TableCell>
							<TableCell>1</TableCell>
							<TableCell>{shotsHit}</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>TOTAL</TableCell>
							<TableCell>{shotsHit}</TableCell>
							<TableCell></TableCell>
							<TableCell></TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</TableContainer>
			<Stack flexDirection="row" justifyContent="space-between">
				<Stack
					flex={1}
					gap={2}
					sx={{
						borderWidth: 1,
						borderStyle: "solid",
						borderColor: theme.palette.primary.light,
					}}
				>
					<Typography textAlign="center" color={theme.palette.primary.main}>
						x Acc
					</Typography>
					<Typography textAlign="center">{`${shotsHit} / ${shotsFired}`}</Typography>
					<Typography textAlign="center">{`${accuracy}%`}</Typography>
				</Stack>
				<Divider orientation="vertical" />
				<Stack flex={1} gap={2}>
					<Typography textAlign="center" color={theme.palette.primary.main}>
						Dmg Eff
					</Typography>
					<Typography textAlign="center">{`${damage} / ${
						shotsFired * 25
					}`}</Typography>
					<Typography textAlign="center">{`${accuracy}%`}</Typography>
				</Stack>
				<Divider orientation="vertical" />
				<Stack flex={1} gap={2}>
					<Typography textAlign="center" color={theme.palette.primary.main}>
						Kdr
					</Typography>
					<Typography textAlign="center">{`${shotsHit} / 0`}</Typography>
					<Typography textAlign="center">100%</Typography>
				</Stack>
			</Stack>
			<Stack>
				<Typography
					variant="h6"
					color={theme.palette.primary.main}
					textAlign="center"
				>
					Final Score:{" "}
					<Box component="span" color={theme.palette.text.primary}>
						{score}
					</Box>
				</Typography>
				{typeof highScore === "string" ? (
					<Typography
						variant="h6"
						color={theme.palette.primary.main}
						textAlign="center"
					>
						Sign in to save score
					</Typography>
				) : (
					<Typography
						variant="h6"
						color={theme.palette.primary.main}
						textAlign="center"
					>
						Current High Score:{" "}
						<Box component="span" color={theme.palette.text.primary}>
							{highScore}
						</Box>
					</Typography>
				)}
			</Stack>
		</Stack>
	)
}
