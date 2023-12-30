import { Stack, Typography, CircularProgress } from "@mui/material"
import { useGetAccount } from "@/features/account"
import { useLocalStorageSettings } from "../hooks/useLocalStorageSettings"
import { SettingsMenu } from "../components/SettingsMenu"
import { useUpdateSettings } from "@/features/account"
import { LocalSettingsProvider } from "../components/LocalSettingsProvider"

export const SettingsPage = () => {
	const { data: getAccountResponse, isLoading } = useGetAccount()
	const { localStorageSettings, setLocalStorageSettings } =
		useLocalStorageSettings()
	const updateSettingsMutation = useUpdateSettings()

	return (
		<LocalSettingsProvider>
			<Stack paddingX={4} height="100%" width="100%">
				<Typography textAlign="center" variant="h3" marginY={1} padding={1}>
					Settings
				</Typography>
				{!isLoading && getAccountResponse?.data?.account?.settings ? (
					<SettingsMenu
						settings={getAccountResponse?.data?.account?.settings}
						setSettings={updateSettingsMutation.mutateAsync}
					/>
				) : !isLoading && !getAccountResponse?.data?.account?.settings ? (
					<SettingsMenu
						settings={localStorageSettings.settings}
						setSettings={setLocalStorageSettings}
					/>
				) : (
					isLoading && (
						<Stack height="100%" justifyContent="center" alignItems="center">
							<CircularProgress />
						</Stack>
					)
				)}
			</Stack>
		</LocalSettingsProvider>
	)
}
