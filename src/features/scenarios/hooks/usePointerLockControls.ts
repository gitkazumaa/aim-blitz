import { useContext } from "react"
import { PointerLockControlsContext } from "../components/PointerLockControlsProvider"

export const usePointerLockControls = () => {
	return useContext(PointerLockControlsContext)
}
