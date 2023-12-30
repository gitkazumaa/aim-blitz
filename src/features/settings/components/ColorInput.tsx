import { InputBase } from "@mui/material"

interface ColorInputProps {
	value: string
	onChange: (newValue: string) => void
}

export const ColorInput = ({ value, onChange }: ColorInputProps) => {
	const handleChange = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		onChange(event.target.value)
	}

	return (
		<InputBase
			type="color"
			value={value}
			className="color-input"
			sx={{
				backgroundColor: value,
			}}
			inputProps={{
				className: "color-input",
			}}
			onChange={event => handleChange(event)}
		/>
	)
}
