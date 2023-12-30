import { Stack, Button, Typography, Divider } from "@mui/material"
import { useState } from "react"
import { Settings } from "../types/Settings"
import { UseMutateAsyncFunction } from "@tanstack/react-query"
import { ApiResponse } from "@/types/ApiResponse"
import { UpdateSettingsParameters } from "@/features/account/api/updateSettings"
import { useLocalSettings } from "../hooks/useLocalSettings"
import { SettingsField } from "./SettingsField"
import { SettingsFieldDropdown } from "./SettingsFieldDropdown"
import { SettingsInput } from "./SettingsInput"
import { SettingsSelect } from "./SettingsSelect"
import { SettingsSlider } from "./SettingsSlider"
import { CrosshairCreatorMenu } from "./CrosshairCreatorMenu"
import { ColorInput } from "./ColorInput"
import { SettingsCheckbox } from "./SettingsCheckbox"

export interface SettingsMenuProps {
	settings: Settings
	setSettings:
		| React.Dispatch<
				React.SetStateAction<{
					settings: Settings
				}>
		  >
		| UseMutateAsyncFunction<
				ApiResponse<{
					settings: Settings
				}>,
				Error,
				UpdateSettingsParameters,
				unknown
		  >
	onSave?: () => void
	onCancel?: () => void
}

const TEXTURES = [
	{ value: "/textures/Bricks/Bricks.jpg", label: "Bricks" },
	{ value: "/textures/Checkerboard/Checkerboard.jpg", label: "Checkerboard" },
	{
		value: "/textures/Cobblestone/Cobblestone.jpg",
		label: "Cobblestone",
	},
	{ value: "/textures/Concrete/Concrete.jpg", label: "Concrete" },
	{ value: "/textures/Grid/Grid.jpg", label: "Grid" },
	{ value: "/textures/Ground/Ground.jpg", label: "Ground" },
	{ value: "/textures/Metal/Metal.jpg", label: "Metal" },
	{ value: "/textures/Pure-Color/PureColor.jpg", label: "Pure Color" },
	{ value: "/textures/Rock/Rock.jpg", label: "Rock" },
	{ value: "/textures/Wood/Wood.jpg", label: "Wood" },
]

export const SettingsMenu = ({
	settings,
	setSettings,
	onSave,
	onCancel,
}: SettingsMenuProps) => {
	const { localSettings, setLocalSettings, resetLocalSettings } =
		useLocalSettings()
	const [isDirty, setIsDirty] = useState(false)

	const handleSave = async () => {
		try {
			setIsDirty(false)
			setSettings({ settings: localSettings })

			if (onSave) {
				onSave()
			}
		} catch (error) {
			console.error("Error saving settings:", error)
		}
	}

	const handleCancel = async () => {
		try {
			setIsDirty(false)
			setLocalSettings(settings)

			if (onCancel) {
				onCancel()
			}
		} catch (error) {
			console.error("Error canceling settings:", error)
		}
	}

	const handleReset = () => {
		setIsDirty(true)
		resetLocalSettings()
	}

	return (
		<>
			<Stack justifyContent={"space-between"} height="100%" width={"100%"}>
				<Stack gap={1} paddingY={1} marginY={1}>
					<Typography variant="h6">Gameplay</Typography>
					<Divider />
					<SettingsField label="Sensitivity">
						<SettingsInput
							min={0.1}
							max={10000}
							step={0.1}
							value={localSettings.sensitivity.value}
							onChange={newSensitivity => {
								setIsDirty(true)
								setLocalSettings(prevLocalSettings => ({
									...prevLocalSettings,
									sensitivity: {
										...prevLocalSettings.sensitivity,
										value: newSensitivity,
									},
								}))
							}}
							onBlur={() => {
								setIsDirty(true)

								if (localSettings.sensitivity.value < 0.1) {
									setLocalSettings(prevLocalSettings => ({
										...prevLocalSettings,
										sensitivity: {
											...prevLocalSettings.sensitivity,
											value: 0.1,
										},
									}))
								} else if (localSettings.sensitivity.value > 10000) {
									setLocalSettings(prevLocalSettings => ({
										...prevLocalSettings,
										sensitivity: {
											...prevLocalSettings.sensitivity,
											value: 10000,
										},
									}))
								}
							}}
						/>
						<SettingsSelect
							value={localSettings.sensitivity.scale}
							options={[
								{ value: "cm/360", label: "cm/360" },
								{ value: "in/360", label: "in/360" },
							]}
							onChange={newSensitivityScale => {
								setIsDirty(true)
								setLocalSettings(prevLocalSettings => ({
									...prevLocalSettings,
									sensitivity: {
										...prevLocalSettings.sensitivity,
										scale: newSensitivityScale,
									},
								}))
							}}
						/>
						<Typography>DPI</Typography>
						<SettingsInput
							min={100}
							max={50000}
							step={1}
							value={localSettings.sensitivity.dpi}
							onChange={newDpi => {
								setIsDirty(true)
								setLocalSettings(prevLocalSettings => ({
									...prevLocalSettings,
									sensitivity: {
										...prevLocalSettings.sensitivity,
										dpi: newDpi,
									},
								}))
							}}
							onBlur={() => {
								setIsDirty(true)

								if (localSettings.sensitivity.dpi < 100) {
									setLocalSettings(prevLocalSettings => ({
										...prevLocalSettings,
										sensitivity: {
											...prevLocalSettings.sensitivity,
											dpi: 100,
										},
									}))
								} else if (localSettings.sensitivity.dpi > 50000) {
									setLocalSettings(prevLocalSettings => ({
										...prevLocalSettings,
										sensitivity: {
											...prevLocalSettings.sensitivity,
											dpi: 50000,
										},
									}))
								}
							}}
						/>
					</SettingsField>
					<SettingsField label="FOV">
						<SettingsSlider
							min={60}
							max={140}
							step={1}
							value={localSettings.fov.value}
							onChange={newFov => {
								setIsDirty(true)
								setLocalSettings(prevLocalSettings => ({
									...prevLocalSettings,
									fov: {
										...prevLocalSettings.fov,
										value: newFov,
									},
								}))
							}}
						/>
						<SettingsInput
							min={60}
							max={140}
							step={1}
							value={localSettings.fov.value}
							onChange={newFov => {
								setIsDirty(true)
								setLocalSettings(prevLocalSettings => ({
									...prevLocalSettings,
									fov: {
										...prevLocalSettings.fov,
										value: newFov,
									},
								}))
							}}
							onBlur={() => {
								setIsDirty(true)

								if (localSettings.fov.value < 60) {
									setLocalSettings(prevLocalSettings => ({
										...prevLocalSettings,
										fov: {
											...prevLocalSettings.fov,
											value: 60,
										},
									}))
								} else if (localSettings.fov.value > 140) {
									setLocalSettings(prevLocalSettings => ({
										...prevLocalSettings,
										fov: {
											...prevLocalSettings.fov,
											value: 140,
										},
									}))
								}
							}}
						/>
					</SettingsField>
					<SettingsField label="Crosshair">
						<CrosshairCreatorMenu
							value={localSettings.crosshair}
							onChange={(property, value) => {
								setIsDirty(true)
								setLocalSettings(prevLocalSettings => ({
									...prevLocalSettings,
									crosshair: {
										...prevLocalSettings.crosshair,
										[property]: value,
									},
								}))
							}}
						/>
					</SettingsField>
					<Typography variant="h6">Visual</Typography>
					<Divider />
					<SettingsFieldDropdown
						label="Walls"
						dropdownChildren={
							<>
								<SettingsField label="Scale">
									<SettingsSlider
										min={0.1}
										max={10}
										step={0.01}
										value={localSettings.walls.scale}
										onChange={newWallScale => {
											setIsDirty(true)
											setLocalSettings(prevLocalSettings => ({
												...prevLocalSettings,
												walls: {
													...prevLocalSettings.walls,
													scale: newWallScale,
												},
											}))
										}}
									/>
									<SettingsInput
										min={0.1}
										max={10}
										step={0.01}
										value={localSettings.walls.scale}
										onChange={newWallScale => {
											setIsDirty(true)
											setLocalSettings(prevLocalSettings => ({
												...prevLocalSettings,
												walls: {
													...prevLocalSettings.walls,
													scale: newWallScale,
												},
											}))
										}}
										onBlur={() => {
											setIsDirty(true)

											if (localSettings.walls.scale < 0.1) {
												setLocalSettings(prevLocalSettings => ({
													...prevLocalSettings,
													walls: {
														...prevLocalSettings.walls,
														scale: 0.1,
													},
												}))
											} else if (localSettings.walls.scale > 10) {
												setLocalSettings(prevLocalSettings => ({
													...prevLocalSettings,
													walls: {
														...prevLocalSettings.walls,
														scale: 10,
													},
												}))
											}
										}}
									/>
								</SettingsField>
								<SettingsField label="Roughness">
									<SettingsSlider
										min={0}
										max={1}
										step={0.01}
										value={localSettings.walls.roughness}
										onChange={newWallRoughness => {
											setIsDirty(true)
											setLocalSettings(prevLocalSettings => ({
												...prevLocalSettings,
												walls: {
													...prevLocalSettings.walls,
													roughness: newWallRoughness,
												},
											}))
										}}
									/>
									<SettingsInput
										min={0}
										max={1}
										step={0.01}
										value={localSettings.walls.roughness}
										onChange={newWallRoughness => {
											setIsDirty(true)
											setLocalSettings(prevLocalSettings => ({
												...prevLocalSettings,
												walls: {
													...prevLocalSettings.walls,
													roughness: newWallRoughness,
												},
											}))
										}}
										onBlur={() => {
											setIsDirty(true)

											if (localSettings.walls.roughness < 0) {
												setLocalSettings(prevLocalSettings => ({
													...prevLocalSettings,
													walls: {
														...prevLocalSettings.walls,
														roughness: 0,
													},
												}))
											} else if (localSettings.walls.scale > 1) {
												setLocalSettings(prevLocalSettings => ({
													...prevLocalSettings,
													walls: {
														...prevLocalSettings.walls,
														roughness: 1,
													},
												}))
											}
										}}
									/>
								</SettingsField>
								<SettingsField label="Metallic">
									<SettingsSlider
										min={0}
										max={1}
										step={0.01}
										value={localSettings.walls.metallic}
										onChange={newWallMetallic => {
											setIsDirty(true)
											setLocalSettings(prevLocalSettings => ({
												...prevLocalSettings,
												walls: {
													...prevLocalSettings.walls,
													metallic: newWallMetallic,
												},
											}))
										}}
									/>
									<SettingsInput
										min={0}
										max={1}
										step={0.01}
										value={localSettings.walls.metallic}
										onChange={newWallMetallic => {
											setIsDirty(true)
											setLocalSettings(prevLocalSettings => ({
												...prevLocalSettings,
												walls: {
													...prevLocalSettings.walls,
													metallic: newWallMetallic,
												},
											}))
										}}
										onBlur={() => {
											setIsDirty(true)

											if (localSettings.walls.metallic < 0) {
												setLocalSettings(prevLocalSettings => ({
													...prevLocalSettings,
													walls: {
														...prevLocalSettings.walls,
														metallic: 0,
													},
												}))
											} else if (localSettings.walls.metallic > 1) {
												setLocalSettings(prevLocalSettings => ({
													...prevLocalSettings,
													walls: {
														...prevLocalSettings.walls,
														metallic: 1,
													},
												}))
											}
										}}
									/>
								</SettingsField>
							</>
						}
					>
						<SettingsSelect
							value={localSettings.walls.texture}
							options={TEXTURES}
							onChange={newWallTexture => {
								setIsDirty(true)
								setLocalSettings(prevLocalSettings => ({
									...prevLocalSettings,
									walls: {
										...prevLocalSettings.walls,
										texture: newWallTexture,
									},
								}))
							}}
						/>
						<ColorInput
							value={localSettings.walls.color}
							onChange={newWallColor => {
								setIsDirty(true)
								setLocalSettings(prevLocalSettings => ({
									...prevLocalSettings,
									walls: {
										...prevLocalSettings.walls,
										color: newWallColor,
									},
								}))
							}}
						/>
					</SettingsFieldDropdown>
					<SettingsFieldDropdown
						label="Floors"
						dropdownChildren={
							<>
								<SettingsField label="Scale">
									<SettingsSlider
										min={0.1}
										max={10}
										step={0.01}
										value={localSettings.floors.scale}
										onChange={newFloorScale => {
											setIsDirty(true)
											setLocalSettings(prevLocalSettings => ({
												...prevLocalSettings,
												floors: {
													...prevLocalSettings.floors,
													scale: newFloorScale,
												},
											}))
										}}
									/>
									<SettingsInput
										min={0.1}
										max={10}
										step={0.01}
										value={localSettings.floors.scale}
										onChange={newFloorScale => {
											setIsDirty(true)
											setLocalSettings(prevLocalSettings => ({
												...prevLocalSettings,
												floors: {
													...prevLocalSettings.floors,
													scale: newFloorScale,
												},
											}))
										}}
										onBlur={() => {
											setIsDirty(true)

											if (localSettings.floors.scale < 0.1) {
												setLocalSettings(prevLocalSettings => ({
													...prevLocalSettings,
													floors: {
														...prevLocalSettings.floors,
														scale: 0.1,
													},
												}))
											} else if (localSettings.floors.scale > 10) {
												setLocalSettings(prevLocalSettings => ({
													...prevLocalSettings,
													floors: {
														...prevLocalSettings.floors,
														scale: 10,
													},
												}))
											}
										}}
									/>
								</SettingsField>

								<SettingsField label="Roughness">
									<SettingsSlider
										min={0}
										max={1}
										step={0.01}
										value={localSettings.floors.roughness}
										onChange={newFloorRoughness => {
											setIsDirty(true)
											setLocalSettings(prevLocalSettings => ({
												...prevLocalSettings,
												floors: {
													...prevLocalSettings.floors,
													roughness: newFloorRoughness,
												},
											}))
										}}
									/>
									<SettingsInput
										min={0}
										max={1}
										step={0.01}
										value={localSettings.floors.roughness}
										onChange={newFloorRoughness => {
											setIsDirty(true)
											setLocalSettings(prevLocalSettings => ({
												...prevLocalSettings,
												floors: {
													...prevLocalSettings.floors,
													roughness: newFloorRoughness,
												},
											}))
										}}
										onBlur={() => {
											setIsDirty(true)

											if (localSettings.floors.roughness < 0) {
												setLocalSettings(prevLocalSettings => ({
													...prevLocalSettings,
													floors: {
														...prevLocalSettings.floors,
														roughness: 0,
													},
												}))
											} else if (localSettings.floors.scale > 1) {
												setLocalSettings(prevLocalSettings => ({
													...prevLocalSettings,
													floors: {
														...prevLocalSettings.floors,
														roughness: 1,
													},
												}))
											}
										}}
									/>
								</SettingsField>
								<SettingsField label="Metallic">
									<SettingsSlider
										min={0}
										max={1}
										step={0.01}
										value={localSettings.floors.metallic}
										onChange={newFloorMetallic => {
											setIsDirty(true)
											setLocalSettings(prevLocalSettings => ({
												...prevLocalSettings,
												floors: {
													...prevLocalSettings.floors,
													metallic: newFloorMetallic,
												},
											}))
										}}
									/>
									<SettingsInput
										min={0}
										max={1}
										step={0.01}
										value={localSettings.floors.metallic}
										onChange={newFloorMetallic => {
											setIsDirty(true)
											setLocalSettings(prevLocalSettings => ({
												...prevLocalSettings,
												floors: {
													...prevLocalSettings.floors,
													metallic: newFloorMetallic,
												},
											}))
										}}
										onBlur={() => {
											setIsDirty(true)

											if (localSettings.floors.metallic < 0) {
												setLocalSettings(prevLocalSettings => ({
													...prevLocalSettings,
													floors: {
														...prevLocalSettings.floors,
														metallic: 0,
													},
												}))
											} else if (localSettings.floors.metallic > 1) {
												setLocalSettings(prevLocalSettings => ({
													...prevLocalSettings,
													floors: {
														...prevLocalSettings.floors,
														metallic: 1,
													},
												}))
											}
										}}
									/>
								</SettingsField>
							</>
						}
					>
						<SettingsSelect
							value={localSettings.floors.texture}
							options={TEXTURES}
							onChange={newFloorTexture => {
								setIsDirty(true)
								setLocalSettings(prevLocalSettings => ({
									...prevLocalSettings,
									floors: {
										...prevLocalSettings.floors,
										texture: newFloorTexture,
									},
								}))
							}}
						/>
						<ColorInput
							value={localSettings.floors.color}
							onChange={newFloorColor => {
								setIsDirty(true)
								setLocalSettings(prevLocalSettings => ({
									...prevLocalSettings,
									floors: {
										...prevLocalSettings.floors,
										color: newFloorColor,
									},
								}))
							}}
						/>
					</SettingsFieldDropdown>
					<SettingsFieldDropdown
						label="Ceilings"
						dropdownChildren={
							<>
								<SettingsField label="Scale">
									<SettingsSlider
										min={0.1}
										max={10}
										step={0.01}
										value={localSettings.ceilings.scale}
										onChange={newCeilingScale => {
											setIsDirty(true)
											setLocalSettings(prevLocalSettings => ({
												...prevLocalSettings,
												ceilings: {
													...prevLocalSettings.ceilings,
													scale: newCeilingScale,
												},
											}))
										}}
									/>
									<SettingsInput
										min={0.1}
										max={10}
										step={0.01}
										value={localSettings.ceilings.scale}
										onChange={newCeilingScale => {
											setIsDirty(true)
											setLocalSettings(prevLocalSettings => ({
												...prevLocalSettings,
												ceilings: {
													...prevLocalSettings.ceilings,
													scale: newCeilingScale,
												},
											}))
										}}
										onBlur={() => {
											setIsDirty(true)

											if (localSettings.ceilings.scale < 0.1) {
												setLocalSettings(prevLocalSettings => ({
													...prevLocalSettings,
													ceilings: {
														...prevLocalSettings.ceilings,
														scale: 0.1,
													},
												}))
											} else if (localSettings.ceilings.scale > 10) {
												setLocalSettings(prevLocalSettings => ({
													...prevLocalSettings,
													ceilings: {
														...prevLocalSettings.ceilings,
														scale: 10,
													},
												}))
											}
										}}
									/>
								</SettingsField>
								<SettingsField label="Roughness">
									<SettingsSlider
										min={0}
										max={1}
										step={0.01}
										value={localSettings.ceilings.roughness}
										onChange={newCeilingRoughness => {
											setIsDirty(true)
											setLocalSettings(prevLocalSettings => ({
												...prevLocalSettings,
												ceilings: {
													...prevLocalSettings.ceilings,
													roughness: newCeilingRoughness,
												},
											}))
										}}
									/>
									<SettingsInput
										min={0}
										max={1}
										step={0.01}
										value={localSettings.ceilings.roughness}
										onChange={newCeilingRoughness => {
											setIsDirty(true)
											setLocalSettings(prevLocalSettings => ({
												...prevLocalSettings,
												ceilings: {
													...prevLocalSettings.ceilings,
													roughness: newCeilingRoughness,
												},
											}))
										}}
										onBlur={() => {
											setIsDirty(true)

											if (localSettings.ceilings.roughness < 0) {
												setLocalSettings(prevLocalSettings => ({
													...prevLocalSettings,
													ceilings: {
														...prevLocalSettings.ceilings,
														roughness: 0,
													},
												}))
											} else if (localSettings.ceilings.scale > 1) {
												setLocalSettings(prevLocalSettings => ({
													...prevLocalSettings,
													ceilings: {
														...prevLocalSettings.ceilings,
														roughness: 1,
													},
												}))
											}
										}}
									/>
								</SettingsField>
								<SettingsField label="Metallic">
									<SettingsSlider
										min={0}
										max={1}
										step={0.01}
										value={localSettings.ceilings.metallic}
										onChange={newCeilingMetallic => {
											setIsDirty(true)
											setLocalSettings(prevLocalSettings => ({
												...prevLocalSettings,
												ceilings: {
													...prevLocalSettings.ceilings,
													metallic: newCeilingMetallic,
												},
											}))
										}}
									/>
									<SettingsInput
										min={0}
										max={1}
										step={0.01}
										value={localSettings.ceilings.metallic}
										onChange={newCeilingMetallic => {
											setIsDirty(true)
											setLocalSettings(prevLocalSettings => ({
												...prevLocalSettings,
												ceilings: {
													...prevLocalSettings.ceilings,
													metallic: newCeilingMetallic,
												},
											}))
										}}
										onBlur={() => {
											setIsDirty(true)

											if (localSettings.ceilings.metallic < 0) {
												setLocalSettings(prevLocalSettings => ({
													...prevLocalSettings,
													ceilings: {
														...prevLocalSettings.ceilings,
														metallic: 0,
													},
												}))
											} else if (localSettings.ceilings.metallic > 1) {
												setLocalSettings(prevLocalSettings => ({
													...prevLocalSettings,
													ceilings: {
														...prevLocalSettings.ceilings,
														metallic: 1,
													},
												}))
											}
										}}
									/>
								</SettingsField>
							</>
						}
					>
						<SettingsSelect
							value={localSettings.ceilings.texture}
							options={TEXTURES}
							onChange={newCeilingTexture => {
								setIsDirty(true)
								setLocalSettings(prevLocalSettings => ({
									...prevLocalSettings,
									ceilings: {
										...prevLocalSettings.ceilings,
										texture: newCeilingTexture,
									},
								}))
							}}
						/>
						<ColorInput
							value={localSettings.ceilings.color}
							onChange={newCeilingsColor => {
								setIsDirty(true)
								setLocalSettings(prevLocalSettings => ({
									...prevLocalSettings,
									ceilings: {
										...prevLocalSettings.ceilings,
										color: newCeilingsColor,
									},
								}))
							}}
						/>
					</SettingsFieldDropdown>
					<SettingsFieldDropdown
						label="Enemies"
						dropdownChildren={
							<>
								<SettingsField label="Roughness">
									<SettingsSlider
										min={0}
										max={1}
										step={0.01}
										value={localSettings.enemies.roughness}
										onChange={newEnemyRoughness => {
											setIsDirty(true)
											setLocalSettings(prevLocalSettings => ({
												...prevLocalSettings,
												enemies: {
													...prevLocalSettings.enemies,
													roughness: newEnemyRoughness,
												},
											}))
										}}
									/>
									<SettingsInput
										min={0}
										max={1}
										step={0.01}
										value={localSettings.enemies.roughness}
										onChange={newEnemyRoughness => {
											setIsDirty(true)
											setLocalSettings(prevLocalSettings => ({
												...prevLocalSettings,
												enemies: {
													...prevLocalSettings.enemies,
													roughness: newEnemyRoughness,
												},
											}))
										}}
										onBlur={() => {
											setIsDirty(true)

											if (localSettings.enemies.roughness < 0) {
												setLocalSettings(prevLocalSettings => ({
													...prevLocalSettings,
													enemies: {
														...prevLocalSettings.enemies,
														roughness: 0,
													},
												}))
											} else if (localSettings.enemies.roughness > 1) {
												setLocalSettings(prevLocalSettings => ({
													...prevLocalSettings,
													enemies: {
														...prevLocalSettings.enemies,
														roughness: 1,
													},
												}))
											}
										}}
									/>
								</SettingsField>
								<SettingsField label="Metallic">
									<SettingsSlider
										min={0}
										max={1}
										step={0.01}
										value={localSettings.enemies.metallic}
										onChange={newEnemyMetallic => {
											setIsDirty(true)
											setLocalSettings(prevLocalSettings => ({
												...prevLocalSettings,
												enemies: {
													...prevLocalSettings.enemies,
													metallic: newEnemyMetallic,
												},
											}))
										}}
									/>
									<SettingsInput
										min={0}
										max={1}
										step={0.01}
										value={localSettings.enemies.metallic}
										onChange={newEnemyMetallic => {
											setIsDirty(true)
											setLocalSettings(prevLocalSettings => ({
												...prevLocalSettings,
												enemies: {
													...prevLocalSettings.enemies,
													metallic: newEnemyMetallic,
												},
											}))
										}}
										onBlur={() => {
											setIsDirty(true)

											if (localSettings.enemies.metallic < 0) {
												setLocalSettings(prevLocalSettings => ({
													...prevLocalSettings,
													enemies: {
														...prevLocalSettings.enemies,
														metallic: 0,
													},
												}))
											} else if (localSettings.enemies.metallic > 1) {
												setLocalSettings(prevLocalSettings => ({
													...prevLocalSettings,
													enemies: {
														...prevLocalSettings.enemies,
														metallic: 1,
													},
												}))
											}
										}}
									/>
								</SettingsField>
								<SettingsField label="Glow (experimental)">
									<SettingsCheckbox
										value={localSettings.enemies.glow}
										onChange={newGlow => {
											setIsDirty(true)
											setLocalSettings(prevLocalSettings => ({
												...prevLocalSettings,
												enemies: {
													...prevLocalSettings.enemies,
													glow: newGlow,
												},
											}))
										}}
									/>
								</SettingsField>
							</>
						}
					>
						<ColorInput
							value={localSettings.enemies.color}
							onChange={newEnemiesColor => {
								setIsDirty(true)
								setLocalSettings(prevLocalSettings => ({
									...prevLocalSettings,
									enemies: {
										...prevLocalSettings.enemies,
										color: newEnemiesColor,
									},
								}))
							}}
						/>
					</SettingsFieldDropdown>
				</Stack>
				<Stack
					flexDirection="row"
					justifyContent="space-between"
					paddingY={1}
					marginY={1}
				>
					<Stack flexDirection={"row"} gap={4}>
						<Button onClick={handleCancel} size="large" variant="contained">
							Cancel
						</Button>
						<Button
							onClick={handleReset}
							size="large"
							color="error"
							variant="contained"
						>
							Reset
						</Button>
					</Stack>
					<Stack>
						<Button
							onClick={handleSave}
							disabled={!isDirty}
							size="large"
							variant="contained"
						>
							Save
						</Button>
					</Stack>
				</Stack>
			</Stack>
		</>
	)
}
