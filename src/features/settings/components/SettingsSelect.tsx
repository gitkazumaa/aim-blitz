import { Select, SelectChangeEvent, MenuItem } from "@mui/material"

interface Options {
	value: string
	label: string
}

interface SettingsSelectProps {
	value: string
	options: Options[]
	onChange: (newValue: string) => void
}

export const SettingsSelect = ({
	value,
	options,
	onChange,
}: SettingsSelectProps) => {
	const handleSelectChange = (event: SelectChangeEvent) => {
		onChange(event.target.value)
	}
	return (
		<Select value={value} onChange={handleSelectChange} size="small">
			{options.map((option, index) => (
				<MenuItem
					key={`${option} ${index + 1}`}
					value={option.value}
					children={option.label}
				/>
			))}
		</Select>
	)
}
