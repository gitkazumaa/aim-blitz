import { useNavigate } from "react-router-dom"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import {
	Avatar,
	Button,
	TextField,
	Link,
	Grid,
	Box,
	Typography,
	Container,
} from "@mui/material"
import { signIn } from "../api/signIn"
import { queryClient } from "@/libs/reactQuery"
import { enqueueSnackbar } from "notistack"

export const SignInForm = () => {
	const navigate = useNavigate()

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		const data = new FormData(event.currentTarget)
		const username = data.get("username") as string
		const password = data.get("password") as string

		if (username !== "" && password !== "") {
			const response = await signIn(password, username)

			if (response.success) {
				enqueueSnackbar(response.message, { variant: "success" })
				queryClient.invalidateQueries({ queryKey: ["api", "accounts"] })
				navigate(-1)
			} else {
				enqueueSnackbar(response.message, { variant: "error" })
			}
		} else {
			enqueueSnackbar("Invalid username or password", {
				variant: "error",
			})
		}
	}

	return (
		<Container component="main" maxWidth="xs">
			<Box
				component="div"
				sx={{
					marginTop: 8,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				<Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign in
				</Typography>
				<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
					<TextField
						margin="normal"
						required
						fullWidth
						id="username"
						label="Username"
						name="username"
						autoComplete="username"
						autoFocus
					/>
					<TextField
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						type="password"
						id="password"
						autoComplete="current-password"
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2 }}
					>
						Sign In
					</Button>
					<Grid container justifyContent={"end"}>
						<Grid item>
							<Link href="/create-account" variant="body2">
								Create Account
							</Link>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</Container>
	)
}
