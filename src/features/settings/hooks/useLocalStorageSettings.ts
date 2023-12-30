import { useLocalStorage } from "usehooks-ts"
import { Settings } from "../types/Settings"

export const DEFAULT_SETTINGS: Settings = {
	sensitivity: {
		value: 1,
		scale: "cm/360",
		dpi: 800,
	},
	fov: {
		value: 103,
		scale: "Overwatch",
	},
	crosshair: {
		crosshairColor: "#ffffff",
		crosshairOutlineColor: "#000000",
		crosshairOpacity: 1,
		crosshairOutlineOpacity: 1,
		dotOpacity: 0,
		dotOutlineOpacity: 1,
		crosshairGap: 6,
		crosshairLength: 6,
		crosshairThickness: 2,
		crosshairOutlineThickness: 2,
		dotShape: "Square",
		dotSize: 2,
		dotOutlineThickness: 2,
		hideTopLine: false,
		crosshairRenderSize: 1,
	},
	walls: {
		texture: "/aim-blitz/textures/Grid/Grid.jpg",
		color: "#ffffff",
		scale: 1,
		roughness: 0,
		metallic: 0,
	},
	floors: {
		texture: "/aim-blitz/textures/Grid/Grid.jpg",
		color: "#ffffff",
		scale: 1,
		roughness: 0,
		metallic: 0,
	},
	ceilings: {
		texture: "/aim-blitz/textures/Grid/Grid.jpg",
		color: "#ffffff",
		scale: 1,
		roughness: 0,
		metallic: 0,
	},
	enemies: {
		color: "#3a86ff",
		roughness: 0,
		metallic: 0,
		glow: false,
	},
}

export const useLocalStorageSettings = () => {
	const [localStorageSettings, setLocalStorageSettings] = useLocalStorage(
		"localSettings",
		{
			settings: DEFAULT_SETTINGS,
		}
	)

	return { localStorageSettings, setLocalStorageSettings }
}
