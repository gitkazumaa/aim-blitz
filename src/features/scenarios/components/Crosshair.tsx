import { Box } from "@mui/material"
import { useLocalSettings } from "@/features/settings/hooks/useLocalSettings"
import { usePointerLockControls } from "../hooks/usePointerLockControls"
import { Crosshair as CrosshairSvg } from "@/features/settings/components/Crosshair"

export const Crosshair = () => {
	const { localSettings } = useLocalSettings()
	const { isLocked } = usePointerLockControls()

	return (
		<>
			{isLocked && (
				<>
					<Box
						component="div"
						position={"absolute"}
						top={"50%"}
						left={"50%"}
						sx={{
							transform: "translate3d(-50%, -50%, 0)",
						}}
					>
						<CrosshairSvg crosshairProps={localSettings.crosshair} />
					</Box>
				</>
			)}
		</>
	)
}
