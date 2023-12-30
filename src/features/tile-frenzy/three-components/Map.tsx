import { Vector3, Euler, Texture, Color, RepeatWrapping } from "three"
import { useTexture } from "@react-three/drei"
import { useLocalSettings } from "../../settings"

export const WALL_WIDTH = 8
export const WALL_HEIGHT = 8
export const WALL_DEPTH = 0.08

export const FLOOR_WIDTH = 8
export const FLOOR_HEIGHT = 0.16
export const FLOOR_DEPTH = 8

export const CEILING_WIDTH = 8
export const CEILING_HEIGHT = 0.16
export const CEILING_DEPTH = 8

export const Map = () => {
	const { localSettings } = useLocalSettings()

	const [wallMap, floorMap, ceilingMap] = useTexture([
		localSettings.walls.texture,
		localSettings.floors.texture,
		localSettings.ceilings.texture,
	])
	wallMap.wrapS = RepeatWrapping
	wallMap.wrapT = RepeatWrapping
	wallMap.repeat.set(localSettings.walls.scale, localSettings.walls.scale)
	floorMap.wrapS = RepeatWrapping
	floorMap.wrapT = RepeatWrapping
	floorMap.repeat.set(localSettings.floors.scale, localSettings.floors.scale)
	ceilingMap.wrapS = RepeatWrapping
	ceilingMap.wrapT = RepeatWrapping
	ceilingMap.repeat.set(
		localSettings.ceilings.scale,
		localSettings.ceilings.scale
	)

	const Wall = ({
		color,
		position,
		rotation,
		map,
		roughness,
		metalness,
	}: {
		color?: Color | undefined
		position?: Vector3 | undefined
		rotation?: Euler | undefined
		map?: Texture | null | undefined
		roughness?: number | undefined
		metalness?: number | undefined
	}) => {
		return (
			<mesh position={position} rotation={rotation}>
				<boxGeometry args={[WALL_WIDTH, WALL_HEIGHT, WALL_DEPTH]} />
				<meshStandardMaterial
					color={color}
					map={map}
					roughness={roughness}
					metalness={metalness}
				/>
			</mesh>
		)
	}

	const Floor = ({
		color,
		position,
		rotation,
		map,
		roughness,
		metalness,
	}: {
		color?: Color | undefined
		position?: Vector3 | undefined
		rotation?: Euler | undefined
		map?: Texture | null | undefined
		roughness?: number | undefined
		metalness?: number | undefined
	}) => {
		return (
			<mesh position={position} rotation={rotation}>
				<boxGeometry args={[FLOOR_WIDTH, FLOOR_HEIGHT, FLOOR_DEPTH]} />
				<meshStandardMaterial
					color={color}
					map={map}
					roughness={roughness}
					metalness={metalness}
				/>
			</mesh>
		)
	}

	const Ceiling = ({
		color,
		position,
		rotation,
		map,
		roughness,
		metalness,
	}: {
		color?: Color | undefined
		position?: Vector3 | undefined
		rotation?: Euler | undefined
		map?: Texture | null | undefined
		roughness?: number | undefined
		metalness?: number | undefined
	}) => {
		return (
			<mesh position={position} rotation={rotation}>
				<boxGeometry args={[CEILING_WIDTH, CEILING_HEIGHT, CEILING_DEPTH]} />
				<meshStandardMaterial
					color={color}
					map={map}
					roughness={roughness}
					metalness={metalness}
				/>
			</mesh>
		)
	}

	return (
		<group>
			<Wall
				position={new Vector3(WALL_WIDTH / 2, WALL_HEIGHT / 2, -WALL_DEPTH / 2)}
				color={new Color(localSettings.walls.color)}
				map={wallMap}
				roughness={localSettings.walls ? localSettings.walls.roughness : 0}
				metalness={localSettings.walls ? localSettings.walls.metallic : 0}
			/>
			<Wall
				position={
					new Vector3(
						WALL_WIDTH / 2,
						WALL_HEIGHT / 2,
						WALL_DEPTH / 2 + FLOOR_WIDTH
					)
				}
				color={new Color(localSettings.walls.color)}
				map={wallMap}
				roughness={localSettings.walls ? localSettings.walls.roughness : 0}
				metalness={localSettings.walls ? localSettings.walls.metallic : 0}
			/>
			<Wall
				position={new Vector3(-WALL_DEPTH / 2, WALL_HEIGHT / 2, WALL_WIDTH / 2)}
				rotation={new Euler(0, Math.PI / 2, 0)}
				color={new Color(localSettings.walls.color)}
				map={wallMap}
				roughness={localSettings.walls ? localSettings.walls.roughness : 0}
				metalness={localSettings.walls ? localSettings.walls.metallic : 0}
			/>
			<Wall
				position={
					new Vector3(
						FLOOR_WIDTH + WALL_DEPTH / 2,
						WALL_HEIGHT / 2,
						WALL_WIDTH / 2
					)
				}
				rotation={new Euler(0, Math.PI / 2, 0)}
				color={new Color(localSettings.walls.color)}
				map={wallMap}
				roughness={localSettings.walls ? localSettings.walls.roughness : 0}
				metalness={localSettings.walls ? localSettings.walls.metallic : 0}
			/>
			<Floor
				position={
					new Vector3(FLOOR_WIDTH / 2, -FLOOR_HEIGHT / 2, FLOOR_DEPTH / 2)
				}
				color={new Color(localSettings.floors.color)}
				map={floorMap}
				roughness={localSettings.floors ? localSettings.floors.roughness : 0}
				metalness={localSettings.floors ? localSettings.floors.metallic : 0}
			/>
			<Ceiling
				position={
					new Vector3(
						CEILING_WIDTH / 2,
						CEILING_HEIGHT / 2 + WALL_HEIGHT,
						CEILING_DEPTH / 2
					)
				}
				color={new Color(localSettings.ceilings.color)}
				map={ceilingMap}
				roughness={
					localSettings.ceilings ? localSettings.ceilings.roughness : 0
				}
				metalness={localSettings.ceilings ? localSettings.ceilings.metallic : 0}
			/>
		</group>
	)
}
