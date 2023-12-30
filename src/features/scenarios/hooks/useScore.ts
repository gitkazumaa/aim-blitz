import { useContext } from "react"
import { ScoreContext } from "../components/ScoreProvider"

export const useScore = () => useContext(ScoreContext)
