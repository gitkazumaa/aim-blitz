import { createContext, useState, useEffect } from "react"
import { useLocalStorageSettings } from "../hooks/useLocalStorageSettings"
import { useGetAccount } from "@/features/account"
import { Children } from "@/types/Children"
import { Settings } from "../types/Settings"
import { DEFAULT_SETTINGS } from "../hooks/useLocalStorageSettings"

type LocalSettingsContext = {
	localSettings: Settings
	setLocalSettings: React.Dispatch<React.SetStateAction<Settings>>
	resetLocalSettings: () => void
}

export const LocalSettingsContext = createContext<LocalSettingsContext>({
	localSettings: {} as Settings,
	setLocalSettings: () => {},
	resetLocalSettings: () => {},
})

export const LocalSettingsProvider = ({ children }: Children) => {
	const { data: getAccountResponse, isLoading } = useGetAccount()
	const { localStorageSettings } = useLocalStorageSettings()

	// Use the account settings if available, otherwise use local storage or default settings
	const accountSettings = getAccountResponse?.data?.account?.settings
	const initialSettings = accountSettings || localStorageSettings.settings

	const [localSettings, setLocalSettings] = useState<Settings>(initialSettings)

	useEffect(() => {
		// Update localSettings when getAccountResponse changes
		if (!isLoading && accountSettings) {
			setLocalSettings(accountSettings)
		}
	}, [getAccountResponse, isLoading, accountSettings])

	const resetLocalSettings = () => {
		setLocalSettings(DEFAULT_SETTINGS)
	}

	return (
		<LocalSettingsContext.Provider
			value={{
				localSettings,
				setLocalSettings,
				resetLocalSettings,
			}}
		>
			{children}
		</LocalSettingsContext.Provider>
	)
}
