import { useTheme, Stack, Typography, Button, Icon } from "@mui/material"
import FlashOnIcon from "@mui/icons-material/FlashOn"
import { Link } from "react-router-dom"
import { useChallenge } from "../hooks/useChallenge"
import { useTimer } from "../hooks/useTimer"
import { usePointerLockControls } from "../hooks/usePointerLockControls"
import { useState } from "react"
import { useScore } from "../hooks/useScore"
import { useGetAccount } from "@/features/account"
import { useUpdateSettings } from "@/features/account"
import { useLocalStorageSettings } from "@/features/settings/hooks/useLocalStorageSettings"
import { SettingsMenuPopup } from "./SettingsMenuPopup"

export const PlayMenu = () => {
	const theme = useTheme()
	const { isChallenge, setIsChallenge, setIsResetting } = useChallenge()
	const [showSettings, setShowSettings] = useState<boolean>(false)
	const { resetTimer } = useTimer()
	const { resetScore } = useScore()
	const { pointerLockControls, isLocked } = usePointerLockControls()
	const { data: getAccountResponse, isLoading } = useGetAccount()
	const { localStorageSettings, setLocalStorageSettings } =
		useLocalStorageSettings()
	const updateSettingsMutation = useUpdateSettings()

	const handleRestartClick = () => {
		if (isChallenge) {
			resetTimer()
			resetScore()
			pointerLockControls.current.camera.rotation.set(0, 0, 0)
			setIsResetting(true)
		}
	}

	return (
		<>
			{!isLocked &&
				(!showSettings ? (
					<>
						<Stack
							position="absolute"
							top="50%"
							left="50%"
							width="20%"
							paddingX={2}
							borderRadius={1}
							sx={{
								transform: "translate(-50%, -50%)",
								backgroundColor: `${theme.palette.background.default}BF`,
								backgroundImage:
									theme.palette.mode === "dark"
										? "linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))"
										: "linear-gradient(rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05))",
							}}
							minWidth={"258px"}
						>
							<Stack
								flexDirection={"row"}
								justifyContent="center"
								alignItems="center"
								marginY={1}
								paddingY={1}
								width={"100%"}
								flexWrap={"wrap"}
							>
								<Typography
									textAlign={"center"}
									gap={1}
									variant="h3"
									color={""}
								>
									Aim
								</Typography>
								<Icon sx={{ width: 48, height: 48 }} color={"primary"}>
									<FlashOnIcon sx={{ width: 48, height: 48 }} />
								</Icon>
								<Typography textAlign={"center"} gap={1} variant="h3">
									Blitz
								</Typography>
							</Stack>
							<Button
								id="play-button"
								variant="contained"
								size="large"
								color="success"
								sx={{
									marginBottom: 1,
								}}
							>
								Play
							</Button>
							<Stack flexDirection="row" marginBottom={1}>
								<Button
									onClick={() => {
										setIsChallenge(false)
									}}
									color="primary"
									variant={!isChallenge ? "contained" : "outlined"}
									fullWidth
								>
									Freeplay
								</Button>
								<Button
									onClick={() => {
										setIsChallenge(true)
									}}
									color="primary"
									variant={isChallenge ? "contained" : "outlined"}
									fullWidth
								>
									Challenge
								</Button>
							</Stack>
							<Button
								color="primary"
								variant="contained"
								fullWidth
								sx={{
									display: isChallenge ? "block" : "none",
									marginBottom: 1,
								}}
								onClick={handleRestartClick}
							>
								Restart
							</Button>
							<Button
								color="primary"
								variant="contained"
								fullWidth
								sx={{
									marginBottom: 1,
								}}
								onClick={() => setShowSettings(true)}
							>
								Settings
							</Button>
							<Button
								sx={{
									marginBottom: 2,
									backgroundColor: theme.palette.action.disabled,
								}}
								variant="contained"
								fullWidth
								component={Link}
								to="/scenarios"
							>
								Quit
							</Button>
						</Stack>
					</>
				) : (
					<>
						{!isLoading && (
							<SettingsMenuPopup
								settingsMenuProps={{
									settings:
										getAccountResponse?.data?.account?.settings ||
										localStorageSettings.settings,
									setSettings: getAccountResponse?.data?.account?.settings
										? updateSettingsMutation.mutateAsync
										: setLocalStorageSettings,
									onSave: () => setShowSettings(false),
									onCancel: () => setShowSettings(false),
								}}
							/>
						)}
					</>
				))}
		</>
	)
}
