import { createContext, ReactNode, useState } from "react"
import { useTimer, TimerResult } from "react-timer-hook"
import { usePointerLockControls } from "../hooks/usePointerLockControls"
import { useScore } from "../hooks/useScore"
import { useChallenge } from "../hooks/useChallenge"
import { useGetAccount } from "@/features/account"
import { usePostScore } from "@/features/account/hooks/usePostScore"

interface TimerContext extends TimerResult {
	toggleTimer: () => void
	resetTimer: () => void
}

export const TimerContext = createContext<TimerContext>({} as TimerContext)

export const TimerProvider = ({
	children,
	timeDuration,
	scenarioName,
}: {
	children: ReactNode
	timeDuration: number
	scenarioName: string
}) => {
	const [hasStarted, setHasStarted] = useState(false)
	const { pointerLockControls } = usePointerLockControls()
	const { isChallenge, setShowScoreboard } = useChallenge()

	const { accuracy, score, resetScore } = useScore()
	const { data: getAccountResponse } = useGetAccount()

	const postScoreMutation = usePostScore({
		scenarioName,
	})

	const time = new Date()
	time.setSeconds(time.getSeconds() + timeDuration)

	const { ...timerProps } = useTimer({
		expiryTimestamp: time,
		onExpire: () => {
			resetTimer()
			setHasStarted(false)
			setShowScoreboard(true)
			pointerLockControls.current.unlock()
			if (getAccountResponse?.data?.account) {
				postScoreMutation.mutate({
					scenarioName,
					score,
					accuracy,
				})
			}
		},
		autoStart: false,
	})

	const toggleTimer = () => {
		if (isChallenge) {
			if (!timerProps.isRunning) {
				if (hasStarted) {
					timerProps.resume()
				} else {
					resetScore()
					setHasStarted(true)
					timerProps.start()
				}
			} else if (timerProps.isRunning) {
				timerProps.pause()
			}
		}
	}

	const resetTimer = () => {
		const time = new Date()
		time.setSeconds(time.getSeconds() + timeDuration)
		timerProps.restart(time, false)
		setHasStarted(false)
	}

	return (
		<TimerContext.Provider value={{ toggleTimer, resetTimer, ...timerProps }}>
			{children}
		</TimerContext.Provider>
	)
}
