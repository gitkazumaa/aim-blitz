import {
	createContext,
	ReactNode,
	useState,
	Dispatch,
	SetStateAction,
} from "react"

interface ChallengeContext {
	isChallenge: boolean
	setIsChallenge: Dispatch<SetStateAction<boolean>>
	showScoreboard: boolean
	setShowScoreboard: Dispatch<SetStateAction<boolean>>
	isResetting: boolean
	setIsResetting: Dispatch<SetStateAction<boolean>>
}

export const ChallengeContext = createContext<ChallengeContext>({
	isChallenge: false,
	setIsChallenge: () => {},
	showScoreboard: false,
	setShowScoreboard: () => {},
	isResetting: false,
	setIsResetting: () => {},
})

export const ChallengeProvider = ({ children }: { children: ReactNode }) => {
	const [isChallenge, setIsChallenge] = useState(false)
	const [isResetting, setIsResetting] = useState(false)
	const [showScoreboard, setShowScoreboard] = useState(false)

	return (
		<ChallengeContext.Provider
			value={{
				isChallenge,
				setIsChallenge,
				showScoreboard,
				setShowScoreboard,
				isResetting,
				setIsResetting,
			}}
		>
			{children}
		</ChallengeContext.Provider>
	)
}
