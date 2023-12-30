import {
	CssBaseline,
	ThemeProvider as MuiThemeProvider,
	ThemeOptions,
	createTheme,
} from "@mui/material"
import { useLocalStorage } from "usehooks-ts"
import { Children } from "@/types/Children"

const darkThemeOptions: ThemeOptions = {
	palette: {
		mode: "dark",
		primary: {
			main: "#3a86ff",
			dark: "#383fb7",
			light: "#67b5ff",
		},
		secondary: {
			main: "#8338ec",
			dark: "#4800d9",
			light: "#d5bef7",
		},
		error: {
			main: "#ff006f",
			light: "#ffb7cd",
			dark: "#d70050",
		},
		warning: {
			main: "#ffbe0b",
			light: "#ffde82",
			dark: "#fe8c07",
		},
		info: {
			main: "#3a86ff",
			light: "#67b5ff",
			dark: "#383fb7",
		},
		success: {
			main: "#3a86ff",
			light: "#67b5ff",
			dark: "#383fb7",
		},
	},
}

const lightThemeOptions: ThemeOptions = {
	palette: {
		mode: "light",
		primary: {
			main: "#3a86ff",
			dark: "#383fb7",
			light: "#67b5ff",
		},
		secondary: {
			main: "#8338ec",
			dark: "#4800d9",
			light: "#d5bef7",
		},
		error: {
			main: "#ff006f",
			light: "#ffb7cd",
			dark: "#d70050",
		},
		warning: {
			main: "#ffbe0b",
			light: "#ffde82",
			dark: "#fe8c07",
		},
		info: {
			main: "#3a86ff",
			light: "#67b5ff",
			dark: "#383fb7",
		},
		success: {
			main: "#3a86ff",
			light: "#67b5ff",
			dark: "#383fb7",
		},
	},
}

const darkTheme = createTheme(darkThemeOptions)
const lightTheme = createTheme(lightThemeOptions)

export const ThemeProvider = ({ children }: Children) => {
	const [theme] = useLocalStorage("theme", "dark")

	return (
		<MuiThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
			{children}
			<CssBaseline />
		</MuiThemeProvider>
	)
}
