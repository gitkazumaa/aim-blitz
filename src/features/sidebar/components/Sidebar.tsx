import {
	useTheme,
	Paper,
	GlobalStyles,
	Box,
	Stack,
	Typography,
	List,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Divider,
	Icon,
	ButtonBase,
} from "@mui/material"
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined"
import MapOutlinedIcon from "@mui/icons-material/MapOutlined"
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined"
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined"
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined"
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined"
import FlashOnIcon from "@mui/icons-material/FlashOn"
import { Link, useLocation } from "react-router-dom"
import { closeSidebar } from "../utils/sidebar"
import { useLocalStorage } from "usehooks-ts"
import { useGetAccount } from "@/features/account"
import { AccountMenu } from "@/features/account/components/AccountMenu"

export const Sidebar = () => {
	const theme = useTheme()
	const location = useLocation()
	const [, setTheme] = useLocalStorage("theme", "dark")
	const { data: getAccountResponse, isLoading } = useGetAccount()

	return (
		<Paper
			sx={{
				position: {
					xs: "fixed",
					md: "sticky",
				},
				transform: {
					xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))",
					md: "none",
				},
				transition: "transform 0.4s, width 0.4s",
				zIndex: 10000,
				height: "100dvh",
				width: "var(--Sidebar-width)",
				top: 0,
				flexShrink: 0,
				gap: 2,
				borderRadius: 0,
				backgroundImage:
					theme.palette.mode === "dark"
						? "linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))"
						: "linear-gradient(rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05))",
			}}
		>
			<GlobalStyles
				styles={theme => ({
					":root": {
						"--Sidebar-width": "240px",
					},
					[theme.breakpoints.up("md")]: {
						":root": {
							"--SideNavigation-slideIn": 1,
						},
					},
				})}
			/>
			<Box
				component="div"
				sx={{
					position: "fixed",
					zIndex: 9998,
					top: 0,
					left: 0,
					width: "100vw",
					height: "100vh",
					opacity: "var(--SideNavigation-slideIn)",
					transition: "opacity 0.4s",
					transform: {
						xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--Sidebar-width, 0px)))",
						lg: "translateX(-100%)",
					},
				}}
				onClick={() => closeSidebar()}
			/>
			<Stack
				height={"100%"}
				width={"100%"}
				justifyContent={"space-between"}
				alignItems={"center"}
			>
				<Stack width={"100%"} justifyContent="center" alignItems="center">
					<ButtonBase
						component={Link}
						to="/"
						color={theme.palette.text.primary}
						disableRipple
					>
						<Stack
							flexDirection={"row"}
							justifyContent="center"
							alignItems="center"
							marginY={1}
							paddingY={1}
							width={"100%"}
						>
							<Typography textAlign={"center"} gap={1} variant="h4" color={""}>
								Aim
							</Typography>
							<Icon sx={{ width: 34, height: 34 }} color={"primary"}>
								<FlashOnIcon sx={{ width: 34, height: 34 }} />
							</Icon>
							<Typography textAlign={"center"} gap={1} variant="h4">
								Blitz
							</Typography>
						</Stack>
					</ButtonBase>

					<List
						sx={{
							width: "100%",
							marginY: 1,
							paddingY: 1,
						}}
					>
						<ListItemButton
							component={Link}
							to="/"
							selected={location.pathname === "/"}
						>
							<ListItemIcon>
								<HomeOutlinedIcon />
							</ListItemIcon>
							<ListItemText>Home</ListItemText>
						</ListItemButton>
						<ListItemButton
							component={Link}
							to="/scenarios"
							selected={location.pathname === "/scenarios"}
						>
							<ListItemIcon>
								<MapOutlinedIcon />
							</ListItemIcon>
							<ListItemText>Scenarios</ListItemText>
						</ListItemButton>
						<ListItemButton
							component={Link}
							to="/settings"
							selected={location.pathname === "/settings"}
						>
							<ListItemIcon>
								<SettingsOutlinedIcon />
							</ListItemIcon>
							<ListItemText>Settings</ListItemText>
						</ListItemButton>
					</List>
				</Stack>
				<Stack width={"100%"} justifyContent="center" alignItems="center">
					<List
						sx={{
							width: "100%",
							marginY: 1,
							paddingY: 1,
						}}
					>
						<ListItemButton
							onClick={() =>
								setTheme(prevTheme => (prevTheme === "dark" ? "light" : "dark"))
							}
						>
							<ListItemIcon>
								{theme.palette.mode === "light" ? (
									<DarkModeOutlinedIcon />
								) : (
									<LightModeOutlinedIcon />
								)}
							</ListItemIcon>
							<ListItemText
								primary={
									theme.palette.mode === "light" ? "Dark Mode" : "Light Mode"
								}
							/>
						</ListItemButton>
					</List>
					<Divider sx={{ width: "100%" }} />
					<List
						sx={{
							width: "100%",
							marginY: 1,
							paddingY: 1,
						}}
					>
						{!isLoading && getAccountResponse?.data?.account ? (
							<AccountMenu account={getAccountResponse?.data.account} />
						) : (
							<ListItemButton component={Link} to="/sign-in">
								<ListItemIcon sx={{ width: 24, height: 24 }}>
									<LoginOutlinedIcon />
								</ListItemIcon>
								<ListItemText primary="Sign In" />
							</ListItemButton>
						)}
					</List>
				</Stack>
			</Stack>
		</Paper>
	)
}
