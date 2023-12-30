import {
	useTheme,
	Stack,
	Typography,
	Button,
	Grid,
	Card,
	CardContent,
	CardActions,
	CardMedia,
} from "@mui/material"
import { Link } from "react-router-dom"
import { useState, useEffect } from "react"

export const HomePage = () => {
	const theme = useTheme()
	const scenarioImages = [
		`/aim-blitz/images/tilefrenzy-${theme.palette.mode}.gif`,
		`/aim-blitz/images/1wall5targets-${theme.palette.mode}.gif`,
	]

	const customizationImages = [
		"/aim-blitz/images/customizable1.PNG",
		"/aim-blitz/images/customizable2.PNG",
		"/aim-blitz/images/customizable3.PNG",
		"/aim-blitz/images/customizable4.PNG",
	]

	const [currentScenarioImageIndex, setCurrentScenarioImageIndex] = useState(0)

	const [currentCustomizationImageIndex, setCurrentCustomizationImageIndex] =
		useState(0)

	useEffect(() => {
		const intervalId = setInterval(() => {
			setCurrentCustomizationImageIndex(
				prevIndex => (prevIndex + 1) % customizationImages.length
			)
		}, 3000)

		return () => clearInterval(intervalId)
	}, [customizationImages.length])

	useEffect(() => {
		const intervalId = setInterval(() => {
			setCurrentScenarioImageIndex(
				prevIndex => (prevIndex + 1) % scenarioImages.length
			)
		}, 5000)

		return () => clearInterval(intervalId)
	}, [scenarioImages.length])

	return (
		<Stack
			sx={{
				backgroundImage: `url('/aim-blitz/images/tilefrenzy.PNG')`,
				backgroundSize: "cover",
				backgroundRepeat: "no-repeat",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				position: "relative",
			}}
			height="100%"
			width="100%"
			zIndex={9994}
		>
			<Stack
				sx={{
					position: "absolute",
					top: 0,
					left: 0,
					backgroundColor: `${theme.palette.background.default}BF`,
					backgroundImage:
						theme.palette.mode === "dark"
							? `radial-gradient(circle, rgba(12, 12, 12, 0.05) 0%, rgba(12, 12, 12) 100%)`
							: `radial-gradient(circle, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 255) 100%)`,
				}}
				height="100%"
				width="100%"
				zIndex={9996}
			/>

			<Stack
				zIndex={9998}
				paddingX={4}
				height="100%"
				width="100%"
				justifyContent={"space-between"}
			>
				{/* Hero Section */}
				<Stack marginY={1} paddingY={1}>
					<Typography variant="h2" component="h1" marginY={1} paddingY={1}>
						Welcome to Aim Blitz
					</Typography>
					<Typography variant="h4" marginY={1} paddingY={1}>
						Improve your aiming skills with this advanced 3D aim trainer.
					</Typography>
				</Stack>
				<Stack marginY={1} paddingY={1}>
					<Button
						variant="contained"
						color="primary"
						size="large"
						sx={{ marginY: 1, paddingY: 1 }}
						component={Link}
						to="/aim-blitz/scenarios"
					>
						Start Training
					</Button>
				</Stack>

				{/* Main Features Section */}
				<Stack marginY={1} paddingY={1}>
					<Grid container spacing={4}>
						<Grid item xs={12} sm={4}>
							<Card
								sx={{
									minHeight: 512,
									":hover": {
										boxShadow: `0 0 10px 5px ${theme.palette.primary.main}`,
										transition: "box-shadow 0.3s ease-in-out",
									},
									backgroundImage:
										theme.palette.mode === "dark"
											? "linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))"
											: "linear-gradient(rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05))",
								}}
							>
								<CardMedia
									component="div"
									sx={{
										position: "relative",
										width: "100%",
										height: 0,
										paddingTop: "56.25%",
										overflow: "hidden",
									}}
								>
									{scenarioImages.map((image, index) => (
										<img
											key={index}
											src={image}
											alt={`customizable-${index + 1}`}
											style={{
												position: "absolute",
												top: 0,
												left: 0,
												width: "100%",
												height: "100%",
												opacity: index === currentScenarioImageIndex ? 1 : 0,
											}}
										/>
									))}
								</CardMedia>
								<CardContent>
									<Typography variant="h4" marginY={1} paddingY={1}>
										Advanced Training Scenarios
									</Typography>
									<Typography variant="body1" marginY={1} paddingY={1}>
										Choose from a variety of training modes designed to enhance
										your aiming precision.
									</Typography>
								</CardContent>
								<CardActions>
									<Button component={Link} to="/scenarios">
										Learn More
									</Button>
								</CardActions>
							</Card>
						</Grid>
						<Grid item xs={12} sm={4}>
							<Card
								sx={{
									minHeight: 512,
									":hover": {
										boxShadow: `0 0 10px 5px ${theme.palette.primary.main}`,
										transition: "box-shadow 0.3s ease-in-out",
									},
									backgroundImage:
										theme.palette.mode === "dark"
											? "linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))"
											: "linear-gradient(rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05))",
								}}
							>
								<CardMedia
									component="div"
									sx={{
										// 16:9
										pt: "56.25%",
									}}
									image={`/aim-blitz/images/analytics-${theme.palette.mode}.gif`}
								/>
								<CardContent>
									<Typography variant="h4" marginY={1} paddingY={1}>
										Real-Time Analytics
									</Typography>
									<Typography variant="body1" marginY={1} paddingY={1}>
										Track your performance in real-time and analyze your
										strengths and weaknesses.
									</Typography>
								</CardContent>
								<CardActions>
									<Button component={Link} to="/scenarios">
										Learn More
									</Button>
								</CardActions>
							</Card>
						</Grid>
						<Grid item xs={12} sm={4}>
							<Card
								sx={{
									minHeight: 512,
									":hover": {
										boxShadow: `0 0 10px 5px ${theme.palette.primary.main}`,
										transition: "box-shadow 0.3s ease-in-out",
									},
									backgroundImage:
										theme.palette.mode === "dark"
											? "linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))"
											: "linear-gradient(rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05))",
								}}
							>
								<CardMedia
									component="div"
									sx={{
										position: "relative",
										width: "100%",
										height: 0,
										paddingTop: "56.25%",
										overflow: "hidden",
									}}
								>
									{customizationImages.map((image, index) => (
										<img
											key={index}
											src={image}
											alt={`customizable-${index + 1}`}
											style={{
												position: "absolute",
												top: 0,
												left: 0,
												width: "100%",
												height: "100%",
												opacity:
													index === currentCustomizationImageIndex ? 1 : 0,
												transition: "opacity 1s ease-in-out",
											}}
										/>
									))}
								</CardMedia>
								<CardContent>
									<Typography variant="h4" marginY={1} paddingY={1}>
										Dynamic Customization
									</Typography>
									<Typography variant="body1" marginY={1} paddingY={1}>
										Personalize your training experience with real-time
										customizable settings that adapt instantly as you make
										changes.
									</Typography>
								</CardContent>
								<CardActions>
									<Button component={Link} to="/settings">
										Learn More
									</Button>
								</CardActions>
							</Card>
						</Grid>
					</Grid>
				</Stack>

				{/* Additional Sections... */}
			</Stack>
		</Stack>
	)
}
