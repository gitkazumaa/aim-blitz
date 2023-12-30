import {
	useTheme,
	Button,
	Card,
	CardMedia,
	CardContent,
	CardActions,
	Grid,
	Stack,
	Typography,
} from "@mui/material"
import { Link } from "react-router-dom"
import { useState } from "react"

export const ScenariosPage = () => {
	const theme = useTheme()
	const [isHovered, setIsHovered] = useState(Array(2).fill(false))

	const handleMouseOver = (index: number) => {
		const newHoverState = [...isHovered]
		newHoverState[index] = true
		setIsHovered(newHoverState)
	}

	const handleMouseOut = (index: number) => {
		const newHoverState = [...isHovered]
		newHoverState[index] = false
		setIsHovered(newHoverState)
	}

	return (
		<Stack paddingX={4} height="100%" width="100%">
			<Typography textAlign="center" variant="h3" marginY={1} padding={1}>
				Scenarios
			</Typography>
			<Grid container spacing={4} justifyContent="center">
				<Grid item xs={12} sm={6} md={4} lg={3} marginY={1} paddingY={1}>
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
						onMouseOver={() => handleMouseOver(0)}
						onMouseOut={() => handleMouseOut(0)}
					>
						<CardMedia component="div">
							<img
								src={
									isHovered[0]
										? `/aim-blitz/images/tilefrenzy-${theme.palette.mode}.gif`
										: `/aim-blitz/images/tilefrenzy-${theme.palette.mode}.PNG`
								}
								alt="Tile Frenzy"
								style={{ width: "100%", height: "100%", objectFit: "cover" }}
							/>
						</CardMedia>
						<CardContent sx={{ flexGrow: 1 }}>
							<Typography gutterBottom variant="h5" component="h2">
								Tile Frenzy
							</Typography>
							<Typography>
								3 targets that respawn instantly when they die. Kill as many as
								you can in 30 seconds!
							</Typography>
						</CardContent>
						<CardActions>
							<Button
								size="small"
								component={Link}
								to="/aim-blitz/scenarios/tile-frenzy"
							>
								Play
							</Button>
						</CardActions>
					</Card>
				</Grid>
				<Grid item xs={12} sm={6} md={4} lg={3} marginY={1} paddingY={1}>
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
						onMouseOver={() => handleMouseOver(1)}
						onMouseOut={() => handleMouseOut(1)}
					>
						<CardMedia component="div">
							<img
								src={
									isHovered[1]
										? `/aim-blitz/images/1wall5targets-${theme.palette.mode}.gif`
										: `/aim-blitz/images/1wall5targets-${theme.palette.mode}.PNG`
								}
								alt="1 wall 5 targets"
								style={{ width: "100%", height: "100%", objectFit: "cover" }}
							/>
						</CardMedia>
						<CardContent sx={{ flexGrow: 1 }}>
							<Typography gutterBottom variant="h5" component="h2">
								1 wall 5 targets
							</Typography>
							<Typography>
								5 targets that respawn instantly when they die. Kill as many as
								you can in 60 seconds!
							</Typography>
						</CardContent>
						<CardActions>
							<Button
								size="small"
								component={Link}
								to="/aim-blitz/scenarios/1-wall-5-targets"
							>
								Play
							</Button>
						</CardActions>
					</Card>
				</Grid>
			</Grid>
		</Stack>
	)
}
