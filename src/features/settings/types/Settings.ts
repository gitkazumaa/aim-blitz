export interface Settings {
	sensitivity: {
		value: number
		scale: string
		dpi: number
	}
	fov: {
		value: number
		scale: string
	}
	crosshair: {
		crosshairColor: string
		crosshairOutlineColor: string
		crosshairOpacity: number
		crosshairOutlineOpacity: number
		dotOpacity: number
		dotOutlineOpacity: number
		crosshairGap: number
		crosshairLength: number
		crosshairThickness: number
		crosshairOutlineThickness: number
		dotShape: "Circle" | "Square"
		dotSize: number
		dotOutlineThickness: number
		hideTopLine: boolean
		crosshairRenderSize: number
	}
	walls: {
		texture: string
		color: string
		scale: number
		roughness: number
		metallic: number
	}
	floors: {
		texture: string
		color: string
		scale: number
		roughness: number
		metallic: number
	}
	ceilings: {
		texture: string
		color: string
		scale: number
		roughness: number
		metallic: number
	}
	enemies: {
		color: string
		roughness: number
		metallic: number
		glow: boolean
	}
}
