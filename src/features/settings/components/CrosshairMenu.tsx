import { useState } from "react"
import { ButtonBase, Menu, Grid, Typography } from "@mui/material"

interface CrosshairMenuProps {
	crosshairImageName: string
	onClick: (crosshairImageName: string) => void
}

export const CrosshairMenu = ({
	crosshairImageName,
	onClick,
}: CrosshairMenuProps) => {
	const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null)

	const CROSSHAIR_IMAGE_NAMES = [
		"aimbeast.png",
		"bigplus.png",
		"boxdot.png",
		"cross.png",
		"diamond.png",
	]

	const handleButtonClick = (event: React.MouseEvent<HTMLElement>) => {
		setMenuAnchor(event.currentTarget)
	}

	const handleMenuClose = () => {
		setMenuAnchor(null)
	}

	const handleOnClick = (crosshairImageName: string) => {
		onClick(crosshairImageName)
	}

	return (
		<>
			<ButtonBase
				sx={{ width: 48, height: 48, minWidth: 48, minHeight: 48 }}
				onClick={handleButtonClick}
			>
				<img
					src={`/crosshairs/${crosshairImageName}`}
					alt="Crosshair"
					width={48}
					height={48}
				/>
			</ButtonBase>
			<Menu
				anchorEl={menuAnchor}
				open={Boolean(menuAnchor)}
				onClose={handleMenuClose}
				slotProps={{
					paper: {
						sx: {
							px: 2,
							width: 304,
						},
					},
				}}
			>
				<Grid container rowSpacing={2}>
					<Grid item xs={12}>
						<Typography>Crosshair Selection</Typography>
					</Grid>
					<Grid item container xs={12} columns={5} spacing={1}>
						{CROSSHAIR_IMAGE_NAMES.map((crosshairImageName, index) => (
							<Grid item key={`Crosshair ${index + 1}`}>
								<ButtonBase onClick={() => handleOnClick(crosshairImageName)}>
									<img
										src={`/crosshairs/${crosshairImageName}`}
										alt={`Crosshair ${index + 1}`}
										width={48}
										height={48}
									/>
								</ButtonBase>
							</Grid>
						))}
					</Grid>
				</Grid>
			</Menu>
		</>
	)
}
