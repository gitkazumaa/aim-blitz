import { Checkbox } from "@mui/material"

interface SettingsCheckboxProps {
	value: boolean
	onChange: (newValue: boolean) => void
}

export const SettingsCheckbox = ({
	value,
	onChange,
}: SettingsCheckboxProps) => {
	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		onChange(event.target.checked)
	}

	return (
		<Checkbox checked={value} onChange={event => handleInputChange(event)} />
	)
}
