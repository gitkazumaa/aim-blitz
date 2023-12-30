import { Stack, Typography } from "@mui/material"

interface SettingsFieldProps {
	label: string
	children?: React.ReactNode
}

export const SettingsField = ({ label, children }: SettingsFieldProps) => {
	return (
		<Stack alignItems="center" flexDirection="row" gap={4}>
			<Stack alignItems="center" flexDirection="row" gap={1}>
				<Typography variant="subtitle1">{label}</Typography>
			</Stack>
			<Stack
				flexGrow={1}
				justifyContent={"end"}
				alignItems="center"
				flexDirection="row"
				gap={4}
			>
				{children}
			</Stack>
		</Stack>
	)
}
