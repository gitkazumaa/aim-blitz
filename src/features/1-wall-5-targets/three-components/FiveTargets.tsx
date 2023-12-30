import { useEffect, useRef, useMemo, useCallback } from "react"
import { Color, Mesh, Object3D, Object3DEventMap, PointLight } from "three"
import { EffectComposer, SelectiveBloom } from "@react-three/postprocessing"
import { WALL_WIDTH, WALL_HEIGHT, FLOOR_DEPTH } from "./Map"
import { useLocalSettings } from "@/features/settings/hooks/useLocalSettings"
import { useScore } from "@/features/scenarios/hooks/useScore"
import { useChallenge } from "@/features/scenarios/hooks/useChallenge"
import { usePointerLockControls } from "@/features/scenarios/hooks/usePointerLockControls"

const TARGET_RADIUS = 0.125

const MAX_TARGETS_ALONG_X = WALL_WIDTH / (TARGET_RADIUS * 2)
const MAX_TARGETS_ALONG_Y = WALL_HEIGHT / (TARGET_RADIUS * 2)

export const FiveTargets = () => {
	const target1 = useRef<Mesh>(null!)
	const target2 = useRef<Mesh>(null!)
	const target3 = useRef<Mesh>(null!)
	const target4 = useRef<Mesh>(null!)
	const target5 = useRef<Mesh>(null!)
	const targets = useMemo(
		() => [target1, target2, target3, target4, target5],
		[]
	)
	const pointerLightRef = useRef<PointLight>(null!)
	const { localSettings } = useLocalSettings()
	const { setShotsHit } = useScore()
	const { isChallenge, showScoreboard, isResetting, setIsResetting } =
		useChallenge()
	const { isLocked } = usePointerLockControls()

	const move = useCallback(
		(object: Object3D<Object3DEventMap>) => {
			let xPos =
				TARGET_RADIUS +
				TARGET_RADIUS * 2 * Math.floor(Math.random() * MAX_TARGETS_ALONG_X)
			let yPos =
				TARGET_RADIUS +
				TARGET_RADIUS * 2 * Math.floor(Math.random() * MAX_TARGETS_ALONG_Y)

			for (let i = 0; i < targets.length; i++) {
				const currentObject = targets[i]
				if (currentObject.current.uuid === object.uuid) {
					continue
				} else {
					while (xPos === currentObject.current.position.x) {
						xPos =
							TARGET_RADIUS +
							TARGET_RADIUS *
								2 *
								Math.floor(Math.random() * MAX_TARGETS_ALONG_X)
					}
					while (yPos === currentObject.current.position.y) {
						yPos =
							TARGET_RADIUS +
							TARGET_RADIUS *
								2 *
								Math.floor(Math.random() * MAX_TARGETS_ALONG_X)
					}
				}
			}

			object.position.set(xPos, yPos, TARGET_RADIUS)
		},
		[targets]
	)

	useEffect(() => {
		targets.forEach(targetRef => {
			move(targetRef.current)
		})
	}, [targets, move, isChallenge, showScoreboard])

	useEffect(() => {
		if (isResetting) {
			targets.forEach(targetRef => {
				move(targetRef.current)
			})
			setIsResetting(false)
		}
	}, [targets, move, isResetting, setIsResetting])

	return (
		<>
			<pointLight
				ref={pointerLightRef}
				position={[WALL_WIDTH / 2, WALL_HEIGHT / 2, FLOOR_DEPTH / 2]}
			/>
			<group>
				<mesh
					ref={target1}
					onPointerDown={e => {
						move(e.object)

						if (isChallenge && isLocked) {
							setShotsHit(prev => prev + 1)
						}
					}}
				>
					<sphereGeometry args={[TARGET_RADIUS]} />
					<meshStandardMaterial
						color={new Color(localSettings.enemies.color)}
					/>
				</mesh>
				<mesh
					ref={target2}
					onPointerDown={e => {
						move(e.object)

						if (isChallenge && isLocked) {
							setShotsHit(prev => prev + 1)
						}
					}}
				>
					<sphereGeometry args={[TARGET_RADIUS]} />
					<meshStandardMaterial
						color={new Color(localSettings.enemies.color)}
					/>
				</mesh>
				<mesh
					ref={target3}
					onPointerDown={e => {
						move(e.object)

						if (isChallenge && isLocked) {
							setShotsHit(prev => prev + 1)
						}
					}}
				>
					<sphereGeometry args={[TARGET_RADIUS]} />
					<meshStandardMaterial
						color={new Color(localSettings.enemies.color)}
					/>
				</mesh>
				<mesh
					ref={target4}
					onPointerDown={e => {
						move(e.object)

						if (isChallenge && isLocked) {
							setShotsHit(prev => prev + 1)
						}
					}}
				>
					<sphereGeometry args={[TARGET_RADIUS]} />
					<meshStandardMaterial
						color={new Color(localSettings.enemies.color)}
					/>
				</mesh>
				<mesh
					ref={target5}
					onPointerDown={e => {
						move(e.object)

						if (isChallenge && isLocked) {
							setShotsHit(prev => prev + 1)
						}
					}}
				>
					<sphereGeometry args={[TARGET_RADIUS]} />
					<meshStandardMaterial
						color={new Color(localSettings.enemies.color)}
					/>
				</mesh>
			</group>
			{localSettings.enemies.glow &&
				target1 &&
				target1 &&
				target2 &&
				target3 &&
				target4 &&
				target5 && (
					<EffectComposer>
						<SelectiveBloom
							lights={[pointerLightRef]}
							selection={[target1, target2, target3, target4, target5]}
							luminanceThreshold={0}
						/>
					</EffectComposer>
				)}
		</>
	)
}
