import { createContext, useState, Dispatch, SetStateAction } from "react"
import { PointerLockControls as PointerLockControlsImpl } from "three-stdlib"

import { Children } from "@/types/Children"

interface PointerLockControlsContext {
	pointerLockControls: React.MutableRefObject<PointerLockControlsImpl>
	setPointerLockControls: React.Dispatch<
		React.SetStateAction<React.MutableRefObject<PointerLockControlsImpl>>
	>
	isLocked: boolean
	setIsLocked: Dispatch<SetStateAction<boolean>>
}

export const PointerLockControlsContext =
	createContext<PointerLockControlsContext>({
		pointerLockControls: {} as React.MutableRefObject<PointerLockControlsImpl>,
		setPointerLockControls: () => {},
		isLocked: false,
		setIsLocked: () => {},
	})

export const PointerLockProvider = ({ children }: Children) => {
	const [pointerLockControls, setPointerLockControls] = useState<
		React.MutableRefObject<PointerLockControlsImpl>
	>({} as React.MutableRefObject<PointerLockControlsImpl>)
	const [isLocked, setIsLocked] = useState(false)

	return (
		<PointerLockControlsContext.Provider
			value={{
				pointerLockControls,
				setPointerLockControls,
				isLocked,
				setIsLocked,
			}}
		>
			{children}
		</PointerLockControlsContext.Provider>
	)
}
