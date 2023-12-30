import { useContext } from "react"
import { TimerContext } from "../components/TimerProvider"

export const useTimer = () => useContext(TimerContext)
