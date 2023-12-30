import { useContext } from "react"
import { ChallengeContext } from "../components/ChallengeProvider"

export const useChallenge = () => useContext(ChallengeContext)
