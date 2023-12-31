import { queryClient } from "@/libs/reactQuery"
import { QueryClientProvider } from "@tanstack/react-query"
import { ThemeProvider } from "@/features/theme"
import { Children } from "@/types/Children"
import { SnackbarProvider } from "@/features/snackbar"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

export const AppProvider = ({ children }: Children) => {
	return (
		<>
			<QueryClientProvider client={queryClient}>
				<ThemeProvider>
					<SnackbarProvider>{children}</SnackbarProvider>
				</ThemeProvider>
				<ReactQueryDevtools />
			</QueryClientProvider>
		</>
	)
}
