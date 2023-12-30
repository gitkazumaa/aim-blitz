import { Children } from "@/types/Children"
import {
	SnackbarProvider as NotistackSnackbarProvider,
	closeSnackbar,
} from "notistack"
import { useTheme, Button } from "@mui/material"

export const SnackbarProvider = ({ children }: Children) => {
	const theme = useTheme()

	return (
		<NotistackSnackbarProvider
			maxSnack={3}
			anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
			preventDuplicate
			action={snackbarId => (
				<Button
					sx={{
						color: theme.palette.text.primary,
					}}
					onClick={() => closeSnackbar(snackbarId)}
				>
					Dismiss
				</Button>
			)}
		>
			{children}
		</NotistackSnackbarProvider>
	)
}

//TODO: Add snackbar alerts
