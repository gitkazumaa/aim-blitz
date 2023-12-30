import { useTheme, Stack, Typography } from "@mui/material"
import {
	SettingsMenu,
	SettingsMenuProps,
} from "@/features/settings/components/SettingsMenu"

interface SettingsMenuPopupProps {
	settingsMenuProps: SettingsMenuProps
}

export const SettingsMenuPopup = ({
	settingsMenuProps,
}: SettingsMenuPopupProps) => {
	const theme = useTheme()

	return (
		<Stack
			position="absolute"
			top="50%"
			left="50%"
			width="80%"
			height="80%"
			paddingX={2}
			overflow="auto"
			borderRadius={1}
			sx={{
				transform: "translate(-50%, -50%)",
				backgroundColor: `${theme.palette.background.default}BF`,
				backgroundImage:
					theme.palette.mode === "dark"
						? "linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))"
						: "linear-gradient(rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05))",
			}}
		>
			<Typography textAlign="center" variant="h3" marginY={1} padding={1}>
				Settings
			</Typography>
			<SettingsMenu {...settingsMenuProps} />
		</Stack>
	)
}
