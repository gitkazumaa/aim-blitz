import { Stack, Typography } from "@mui/material"
import ArrowRightIcon from "@mui/icons-material/ArrowRight"
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"
import { useState } from "react"

interface SettingsFieldDropdownProps {
	label: string
	children?: React.ReactNode
	dropdownChildren?: React.ReactNode
}

export const SettingsFieldDropdown = ({
	label,
	children,
	dropdownChildren,
}: SettingsFieldDropdownProps) => {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false)

	return (
		<>
			<Stack alignItems="center" flexDirection="row" gap={4}>
				<Stack
					alignItems="center"
					flexDirection="row"
					gap={1}
					onClick={() =>
						setIsDropdownOpen(prevIsDropdownOpen => !prevIsDropdownOpen)
					}
				>
					{isDropdownOpen ? <ArrowDropDownIcon /> : <ArrowRightIcon />}
					<Typography variant="subtitle1">{label}</Typography>
				</Stack>
				<Stack
					flexGrow={1}
					justifyContent="end"
					alignItems="center"
					flexDirection="row"
					gap={4}
				>
					{children}
				</Stack>
			</Stack>
			{/* Here is where dropdown will be*/}
			{isDropdownOpen && <Stack>{dropdownChildren}</Stack>}
		</>
	)
}
