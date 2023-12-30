import { Input } from "@mui/material"

interface SettingsInputProps {
	min: number
	max: number
	step: number
	value: number
	onChange: (newValue: number) => void
	onBlur: () => void
}

export const SettingsInput = ({
	min,
	max,
	step,
	value,
	onChange,
	onBlur,
}: SettingsInputProps) => {
	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		onChange(Number(event.target.value))
	}

	return (
		<Input
			inputProps={{
				min: min,
				max: max,
				step: step,
				type: "number",
			}}
			value={value}
			onChange={handleInputChange}
			onBlur={onBlur}
		/>
	)
}
