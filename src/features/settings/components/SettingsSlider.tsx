import { Slider } from "@mui/material"

interface SettingsSliderProps {
	min: number
	max: number
	step: number
	value: number
	onChange: (newValue: number) => void
}

export const SettingsSlider = ({
	min,
	max,
	step,
	value,
	onChange,
}: SettingsSliderProps) => {
	const handleSliderChange = (_: Event, newValue: number | number[]) => {
		onChange(newValue as number)
	}

	return (
		<Slider
			min={min}
			max={max}
			step={step}
			value={value}
			onChange={handleSliderChange}
		/>
	)
}
