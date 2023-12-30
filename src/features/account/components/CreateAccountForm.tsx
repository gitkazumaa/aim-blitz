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
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import { useNavigate } from "react-router-dom"
import { createAccount } from "../api/createAccount"
import { signIn } from "../api/signIn"
import { queryClient } from "@/libs/reactQuery"
import { enqueueSnackbar } from "notistack"

export const CreateAccountForm = () => {
	const navigate = useNavigate()

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		const data = new FormData(event.currentTarget)
		const username = data.get("username") as string
		const password = data.get("password") as string

		if (username !== "" && password !== "") {
			const createAccountResponse = await createAccount(password, username)

			if (createAccountResponse.success) {
				enqueueSnackbar(createAccountResponse.message, { variant: "success" })
				const signInResponse = await signIn(password, username)

				if (signInResponse.success) {
					enqueueSnackbar(signInResponse.message, { variant: "success" })
					queryClient.invalidateQueries({
						queryKey: ["api", "accounts"],
					})
					navigate(-1)
				} else {
					enqueueSnackbar(signInResponse.message, { variant: "error" })
				}
			} else {
				enqueueSnackbar(createAccountResponse.message, { variant: "error" })
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
					Create Account
				</Typography>
				<Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
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
						Sign Up
					</Button>
					<Grid container justifyContent="flex-end">
						<Grid item>
							<Link href="/sign-in" variant="body2">
								Already have an account? Sign in
							</Link>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</Container>
	)
}
