import { Canvas } from "@react-three/fiber"
import { useScore } from "../hooks/useScore"
import { usePointerLockControls } from "../hooks/usePointerLockControls"
import { useChallenge } from "../hooks/useChallenge"
import { ReactNode } from "react"

export const R3fCanvas = ({ children }: { children?: ReactNode }) => {
	const { setShotsFired } = useScore()
	const { isChallenge } = useChallenge()
	const { isLocked } = usePointerLockControls()

	return (
		<Canvas
			onPointerDown={() => {
				if (isChallenge && isLocked) {
					setShotsFired(prev => prev + 1)
				}
			}}
		>
			<ambientLight intensity={2} />
			{children}
		</Canvas>
	)
}
