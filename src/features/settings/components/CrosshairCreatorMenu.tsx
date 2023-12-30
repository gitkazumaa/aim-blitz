import React, { useState } from "react"
import {
	Typography,
	ButtonBase,
	Menu,
	MenuItem,
	FormControl,
	InputLabel,
	Select,
	TextField,
	Slider,
	FormControlLabel,
	Checkbox,
	Grid,
	Divider,
} from "@mui/material"
import { Crosshair } from "./Crosshair"
import { Settings } from ".."
import { ColorInput } from "./ColorInput"

interface CrosshairCreatorMenu {
	value: Settings["crosshair"]
	onChange: <K extends keyof Settings["crosshair"]>(
		property: K,
		value: Settings["crosshair"][K]
	) => void
}

export const CrosshairCreatorMenu = ({
	value,
	onChange,
}: CrosshairCreatorMenu) => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = () => {
		setAnchorEl(null)
	}

	const handleChange = <K extends keyof Settings["crosshair"]>(
		property: K,
		value: Settings["crosshair"][K]
	) => {
		onChange(property, value)
	}

	return (
		<div>
			<ButtonBase
				aria-controls="crosshair-menu"
				aria-haspopup="true"
				onClick={handleClick}
				sx={{
					width: 48,
					height: 48,
				}}
			>
				<Crosshair crosshairProps={value} fitWidth />
			</ButtonBase>
			<Menu
				id="crosshair-menu"
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
				sx={{
					zIndex: 10002,
				}}
				slotProps={{
					paper: {
						sx: {
							px: 2,
							borderRadius: 1,
						},
					},
				}}
			>
				<Grid container columnSpacing={2}>
					<Grid item container xs={12} justifyContent={"center"}>
						<Typography
							variant={"h4"}
							textAlign={"center"}
							marginY={1}
							paddingY={1}
						>
							Crosshair Editor
						</Typography>
					</Grid>
					<Grid item xs={12} marginY={1} paddingY={1}>
						<Divider />
					</Grid>
					<Grid item container xs={5}>
						<Grid item container xs={12} columnSpacing={4} alignItems="center">
							<Grid item xs={4}>
								<Typography>Crosshair Tint</Typography>
							</Grid>
							<Grid item xs={6} />
							<Grid
								item
								xs={2}
								display={"flex"}
								justifyContent={"center"}
								alignItems={"center"}
							>
								<ColorInput
									value={value.crosshairColor}
									onChange={newCrosshairColor =>
										handleChange("crosshairColor", newCrosshairColor)
									}
								/>
							</Grid>
						</Grid>
						<Grid item container xs={12} columnSpacing={4} alignItems="center">
							<Grid item xs={4}>
								<Typography>Crosshair Outline Tint</Typography>
							</Grid>
							<Grid item xs={6}>
								{/* Add the appropriate slider or leave this Grid item empty based on your property */}
							</Grid>
							<Grid
								item
								xs={2}
								display={"flex"}
								justifyContent={"center"}
								alignItems={"center"}
							>
								<ColorInput
									value={value.crosshairOutlineColor}
									onChange={newCrosshairOutlineColor =>
										handleChange(
											"crosshairOutlineColor",
											newCrosshairOutlineColor
										)
									}
								/>
							</Grid>
						</Grid>
						<Grid item container xs={12} columnSpacing={4} alignItems="center">
							<Grid item xs={4}>
								<Typography>Crosshair Opacity</Typography>
							</Grid>
							<Grid item xs={6}>
								<Slider
									value={value.crosshairOpacity}
									step={0.01}
									min={0}
									max={1}
									onChange={(_, value) =>
										handleChange("crosshairOpacity", value as number)
									}
									aria-labelledby="crosshair-opacity-slider"
									sx={{ display: "flex" }}
								/>
							</Grid>
							<Grid item xs={2}>
								<TextField
									type="number"
									value={value.crosshairOpacity}
									onChange={e =>
										handleChange("crosshairOpacity", Number(e.target.value))
									}
									inputProps={{ step: 0.01, min: 0, max: 1 }}
								/>
							</Grid>
						</Grid>
						<Grid item container xs={12} columnSpacing={4} alignItems="center">
							<Grid item xs={4}>
								<Typography>Crosshair Outline Opacity</Typography>
							</Grid>
							<Grid item xs={6}>
								<Slider
									value={value.crosshairOutlineOpacity}
									step={0.01}
									min={0}
									max={1}
									onChange={(_, value) =>
										handleChange("crosshairOutlineOpacity", value as number)
									}
									aria-labelledby="crosshair-outline-opacity-slider"
									sx={{ display: "flex" }}
								/>
							</Grid>
							<Grid item xs={2}>
								<TextField
									type="number"
									value={value.crosshairOpacity}
									onChange={e =>
										handleChange("crosshairOpacity", Number(e.target.value))
									}
									inputProps={{ step: 0.01, min: 0, max: 1 }}
								/>
							</Grid>
						</Grid>
						<Grid item container xs={12} columnSpacing={4} alignItems="center">
							<Grid item xs={4}>
								<Typography>Dot Opacity</Typography>
							</Grid>
							<Grid item xs={6}>
								<Slider
									value={value.dotOpacity}
									step={0.01}
									min={0}
									max={1}
									onChange={(_, value) =>
										handleChange("dotOpacity", value as number)
									}
									aria-labelledby="dot-opacity-slider"
									sx={{ display: "flex" }}
								/>
							</Grid>
							<Grid item xs={2}>
								<TextField
									type="number"
									value={value.dotOpacity}
									onChange={e =>
										handleChange("dotOpacity", Number(e.target.value))
									}
									inputProps={{ step: 0.01, min: 0, max: 1 }}
								/>
							</Grid>
						</Grid>
						<Grid item container xs={12} columnSpacing={4} alignItems="center">
							<Grid item xs={4}>
								<Typography>Dot Outline Opacity</Typography>
							</Grid>
							<Grid item xs={6}>
								<Slider
									value={value.dotOutlineOpacity}
									step={0.01}
									min={0}
									max={1}
									onChange={(_, value) =>
										handleChange("dotOutlineOpacity", value as number)
									}
									aria-labelledby="dot-outline-opacity-slider"
									sx={{ display: "flex" }}
								/>
							</Grid>
							<Grid item xs={2}>
								<TextField
									type="number"
									value={value.dotOutlineOpacity}
									onChange={e =>
										handleChange("dotOutlineOpacity", Number(e.target.value))
									}
									inputProps={{ step: 0.01, min: 0, max: 1 }}
								/>
							</Grid>
						</Grid>
						<Grid item xs={12} />
						<Grid item xs={12} />
						<Grid item xs={12} />
					</Grid>
					<Grid item container xs={2} rowSpacing={2}>
						<Grid
							item
							xs={12}
							columnSpacing={4}
							display={"flex"}
							alignItems={"center"}
							justifyContent={"center"}
						>
							<Crosshair crosshairProps={value} />
						</Grid>
					</Grid>
					<Grid item container xs={5} rowSpacing={2}>
						<Grid item container xs={12} columnSpacing={4} alignItems="center">
							<Grid item xs={4}>
								<Typography>Crosshair Gap</Typography>
							</Grid>
							<Grid item xs={6}>
								<Slider
									value={value.crosshairGap}
									step={1}
									min={0}
									max={50}
									onChange={(_, value) =>
										handleChange("crosshairGap", value as number)
									}
									aria-labelledby="crosshair-gap-slider"
									sx={{ display: "flex" }}
								/>
							</Grid>
							<Grid item xs={2}>
								<TextField
									type="number"
									value={value.crosshairGap}
									onChange={e =>
										handleChange("crosshairGap", Number(e.target.value))
									}
									inputProps={{ step: 1, min: 0, max: 50 }}
								/>
							</Grid>
						</Grid>
						<Grid item container xs={12} columnSpacing={4} alignItems="center">
							<Grid item xs={4}>
								<Typography>Crosshair Length</Typography>
							</Grid>
							<Grid item xs={6}>
								<Slider
									value={value.crosshairLength}
									step={1}
									min={0}
									max={50}
									onChange={(_, value) =>
										handleChange("crosshairLength", value as number)
									}
									aria-labelledby="crosshair-length-slider"
									sx={{ display: "flex" }}
								/>
							</Grid>
							<Grid item xs={2}>
								<TextField
									type="number"
									value={value.crosshairLength}
									onChange={e =>
										handleChange("crosshairLength", Number(e.target.value))
									}
									inputProps={{ step: 1, min: 0, max: 50 }}
								/>
							</Grid>
						</Grid>
						<Grid item container xs={12} columnSpacing={4} alignItems="center">
							<Grid item xs={4}>
								<Typography>Crosshair Thickness</Typography>
							</Grid>
							<Grid item xs={6}>
								<Slider
									value={value.crosshairThickness}
									step={1}
									min={0}
									max={50}
									onChange={(_, value) =>
										handleChange("crosshairThickness", value as number)
									}
									aria-labelledby="crosshair-thickness-slider"
									sx={{ display: "flex" }}
								/>
							</Grid>
							<Grid item xs={2}>
								<TextField
									type="number"
									value={value.crosshairThickness}
									onChange={e =>
										handleChange("crosshairThickness", Number(e.target.value))
									}
									inputProps={{ step: 1, min: 0, max: 50 }}
								/>
							</Grid>
						</Grid>
						<Grid item container xs={12} columnSpacing={4} alignItems="center">
							<Grid item xs={4}>
								<Typography>Crosshair Outline Thickness</Typography>
							</Grid>
							<Grid item xs={6}>
								<Slider
									value={value.crosshairOutlineThickness}
									step={1}
									min={0}
									max={50}
									onChange={(_, value) =>
										handleChange("crosshairOutlineThickness", value as number)
									}
									aria-labelledby="crosshair-outline-thickness-slider"
									sx={{ display: "flex" }}
								/>
							</Grid>
							<Grid item xs={2}>
								<TextField
									type="number"
									value={value.crosshairOutlineThickness}
									onChange={e =>
										handleChange(
											"crosshairOutlineThickness",
											Number(e.target.value)
										)
									}
									inputProps={{ step: 1, min: 0, max: 50 }}
								/>
							</Grid>
						</Grid>
						<Grid item container xs={12} columnSpacing={4} alignItems="center">
							<Grid item xs={4}>
								<Typography>Dot Shape</Typography>
							</Grid>
							<Grid item xs={6} />
							<Grid item xs={2}>
								<FormControl>
									<InputLabel id="dot-shape-label">Dot Shape</InputLabel>
									<Select
										labelId="dot-shape-label"
										id="dot-shape"
										value={value.dotShape}
										onChange={e =>
											handleChange(
												"dotShape",
												e.target.value as "Square" | "Circle"
											)
										}
										MenuProps={{
											sx: {
												zIndex: 10004,
											},
										}}
									>
										<MenuItem value="Circle">Circle</MenuItem>
										<MenuItem value="Square">Square</MenuItem>
									</Select>
								</FormControl>
							</Grid>
						</Grid>
						<Grid item container xs={12} columnSpacing={4} alignItems="center">
							<Grid item xs={4}>
								<Typography>Dot Size</Typography>
							</Grid>
							<Grid item xs={6}>
								<Slider
									value={value.dotSize}
									step={1}
									min={0}
									max={50}
									onChange={(_, value) =>
										handleChange("dotSize", value as number)
									}
									aria-labelledby="dot-size-slider"
									sx={{ display: "flex" }}
								/>
							</Grid>
							<Grid item xs={2}>
								<TextField
									type="number"
									value={value.dotSize}
									onChange={e =>
										handleChange("dotSize", Number(e.target.value))
									}
									inputProps={{ step: 1, min: 0, max: 50 }}
								/>
							</Grid>
						</Grid>
						<Grid item container xs={12} columnSpacing={4} alignItems="center">
							<Grid item xs={4}>
								<Typography>Dot Outline Thickness</Typography>
							</Grid>
							<Grid item xs={6}>
								<Slider
									value={value.dotOutlineThickness}
									step={1}
									min={0}
									max={50}
									onChange={(_, value) =>
										handleChange("dotOutlineThickness", value as number)
									}
									aria-labelledby="dot-outline-thickness-slider"
									sx={{ display: "flex" }}
								/>
							</Grid>
							<Grid item xs={2}>
								<TextField
									type="number"
									value={value.dotOutlineThickness}
									onChange={e =>
										handleChange("dotOutlineThickness", Number(e.target.value))
									}
									inputProps={{ step: 1, min: 0, max: 50 }}
								/>
							</Grid>
						</Grid>
						<Grid item container xs={12} columnSpacing={4} alignItems="center">
							<Grid item xs={3}>
								<Typography>Hide Top Line</Typography>
							</Grid>
							<Grid item xs={5}>
								{/* No slider for Hide Top Line */}
							</Grid>
							<Grid item xs={4} display={"flex"} justifyContent={"end"}>
								<FormControlLabel
									control={
										<Checkbox
											checked={value.hideTopLine}
											onChange={e =>
												handleChange("hideTopLine", e.target.checked)
											}
										/>
									}
									label="Hide Top Line"
									sx={{ marginRight: 0 }}
								/>
							</Grid>
						</Grid>
						<Grid item container xs={12} columnSpacing={4} alignItems="center">
							<Grid item xs={4}>
								<Typography>Crosshair Render Size</Typography>
							</Grid>
							<Grid item xs={6}>
								<Slider
									value={value.crosshairRenderSize}
									step={0.01}
									min={0.01}
									max={5}
									onChange={(_, value) =>
										handleChange("crosshairRenderSize", value as number)
									}
									aria-labelledby="crosshair-render-size-slider"
									sx={{ display: "flex" }}
								/>
							</Grid>
							<Grid item xs={2}>
								<TextField
									type="number"
									value={value.crosshairRenderSize}
									onChange={e =>
										handleChange("crosshairRenderSize", Number(e.target.value))
									}
									inputProps={{ step: 0.01, min: 0.01, max: 5 }}
								/>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Menu>
		</div>
	)
}
