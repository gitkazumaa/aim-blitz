import { useContext } from "react"
import { LocalSettingsContext } from "../components/LocalSettingsProvider"

export const useLocalSettings = () => useContext(LocalSettingsContext)
