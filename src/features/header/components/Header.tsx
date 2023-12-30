import { Paper, GlobalStyles, IconButton } from "@mui/material"
import MenuRoundedIcon from "@mui/icons-material/MenuRounded"
import { toggleSidebar } from "@/features/sidebar/utils/sidebar"

export const Header = () => {
	return (
		<Paper
			sx={{
				display: { xs: "flex", md: "none" },
				alignItems: "center",
				justifyContent: "space-between",
				position: "fixed",
				top: 0,
				width: "100vw",
				height: 56,
				zIndex: 9998,
				paddingY: 1,
				paddingX: 2,
				gap: 1,
				borderRadius: 0,
			}}
		>
			<GlobalStyles
				styles={theme => ({
					":root": {
						"--Header-height": "56px",
						[theme.breakpoints.up("md")]: {
							"--Header-height": "0px",
						},
					},
				})}
			/>
			<IconButton onClick={() => toggleSidebar()} sx={{ alignSelf: "start" }}>
				<MenuRoundedIcon />
			</IconButton>
		</Paper>
	)
}
