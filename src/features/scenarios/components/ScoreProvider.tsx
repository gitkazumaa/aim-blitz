import {
	createContext,
	ReactNode,
	useState,
	Dispatch,
	SetStateAction,
	useEffect,
} from "react"

interface ScoreContext {
	shotsFired: number
	setShotsFired: Dispatch<SetStateAction<number>>
	shotsHit: number
	setShotsHit: Dispatch<SetStateAction<number>>
	damage: number
	setDamage: Dispatch<SetStateAction<number>>
	accuracy: number
	setAccuracy: Dispatch<SetStateAction<number>>
	score: number
	setScore: Dispatch<SetStateAction<number>>
	resetScore: () => void
}

export const ScoreContext = createContext<ScoreContext>({
	shotsFired: 0,
	setShotsFired: () => {},
	shotsHit: 0,
	setShotsHit: () => {},
	damage: 0,
	setDamage: () => {},
	accuracy: 0,
	setAccuracy: () => {},
	score: 0,
	setScore: () => {},
	resetScore: () => {},
})

export const ScoreProvider = ({
	children,
	damagePerHit,
}: {
	children: ReactNode
	damagePerHit: number
}) => {
	const [shotsFired, setShotsFired] = useState(0)
	const [shotsHit, setShotsHit] = useState(0)
	const [damage, setDamage] = useState(0)
	const [accuracy, setAccuracy] = useState(0)
	const [score, setScore] = useState(0)

	const resetScore = () => {
		setShotsFired(0)
		setShotsHit(0)
		setDamage(0)
		setAccuracy(0)
		setScore(0)
	}

	useEffect(() => {
		setAccuracy(
			shotsFired <= 0 ? 0 : Math.round((shotsHit / shotsFired) * 10000) / 100
		)
	}, [shotsFired, shotsHit])

	useEffect(() => {
		setScore(Math.round(shotsHit * (accuracy / 100) * 100) / 100)
	}, [shotsHit, accuracy])

	useEffect(() => {
		setDamage(shotsHit * damagePerHit)
	}, [shotsHit, damagePerHit])

	return (
		<ScoreContext.Provider
			value={{
				shotsFired,
				setShotsFired,
				shotsHit,
				setShotsHit,
				damage,
				setDamage,
				accuracy,
				setAccuracy,
				score,
				setScore,
				resetScore,
			}}
		>
			{children}
		</ScoreContext.Provider>
	)
}
