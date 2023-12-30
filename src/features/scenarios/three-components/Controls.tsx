import { useRef, useEffect } from "react"
import { PointerLockControls as PointerLockControlsImpl } from "three-stdlib"
import { PerspectiveCamera, PointerLockControls } from "@react-three/drei"
import { useLocalSettings } from "@/features/settings"
import { usePointerLockControls } from "../hooks/usePointerLockControls"
import { useChallenge } from "../hooks/useChallenge"
import { useTimer } from "../hooks/useTimer"

export const Controls = ({
	position,
}: {
	position: [number, number, number]
}) => {
	const { localSettings } = useLocalSettings()
	const { setPointerLockControls, setIsLocked } = usePointerLockControls()
	const { isChallenge, showScoreboard } = useChallenge()
	const { toggleTimer } = useTimer()
	const pointerLockControls = useRef<PointerLockControlsImpl>(null!)

	const handleOnLock = () => {
		setIsLocked(true)

		if (isChallenge) {
			toggleTimer()
		}
	}

	const handleOnUnlock = () => {
		setIsLocked(false)

		if (isChallenge) {
			toggleTimer()
		}
	}

	useEffect(() => {
		if (pointerLockControls.current !== null) {
			pointerLockControls.current.camera.rotation.set(0, 0, 0)
		}
	}, [isChallenge, showScoreboard])

	useEffect(() => {
		setPointerLockControls(pointerLockControls)
	}, [setPointerLockControls])

	// TODO: FIX POINTERSPEED
	return (
		<>
			<PerspectiveCamera
				makeDefault
				position={position}
				rotation={[0, 0, 0]}
				fov={localSettings.fov.value}
			/>

			<PointerLockControls
				ref={pointerLockControls}
				selector="#play-button"
				pointerSpeed={localSettings.sensitivity.value}
				onLock={handleOnLock}
				onUnlock={handleOnUnlock}
			/>
		</>
	)
}
