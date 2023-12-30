import { useState } from "react"
import { Link } from "react-router-dom"
import {
	Avatar,
	ListItemButton,
	ListItem,
	ListItemIcon,
	ListItemText,
	Menu,
	List,
	IconButton,
} from "@mui/material"
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined"
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined"
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined"
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined"
import { queryClient } from "@/libs/reactQuery"
import { Account } from "../types/Account"
import { signOut } from "../api/signOut"
import { enqueueSnackbar } from "notistack"

interface AccountMenuParameters {
	account: Account
}

export const AccountMenu = ({ account }: AccountMenuParameters) => {
	const [profileMenuAnchorEl, setProfileMenuAnchorEl] =
		useState<null | HTMLElement>(null)
	const open = Boolean(profileMenuAnchorEl)

	const handleClick = (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		setProfileMenuAnchorEl(event.currentTarget)
	}

	const handleClose = () => {
		setProfileMenuAnchorEl(null)
	}

	const handleSignOutClick = async () => {
		const response = await signOut()

		if (response.success) {
			enqueueSnackbar(response.message, { variant: "success" })
			queryClient.invalidateQueries({ queryKey: ["api", "accounts"] })
		} else {
			enqueueSnackbar(response.message, { variant: "error" })
		}
	}

	return (
		<>
			<ListItem sx={{ paddingY: 1 }}>
				<ListItemIcon>
					<Avatar src={account.image} />
				</ListItemIcon>
				<ListItemText primary={account.username} />
				<IconButton onClick={event => handleClick(event)}>
					<MoreVertOutlinedIcon />
				</IconButton>
			</ListItem>
			<Menu
				anchorEl={profileMenuAnchorEl}
				open={open}
				onClose={handleClose}
				sx={{ zIndex: 10001 }}
				anchorOrigin={{
					vertical: "top",
					horizontal: "left",
				}}
			>
				<List>
					<ListItemButton
						component={Link}
						to={`/aim-blitz/accounts/${account._id}`}
						onClick={handleClose}
					>
						<ListItemIcon>
							<AccountCircleOutlinedIcon />
						</ListItemIcon>
						<ListItemText primary="Profile" />
					</ListItemButton>
					<ListItemButton
						component={Link}
						to={`/aim-blitz/accounts/${account._id}/edit`}
						onClick={handleClose}
					>
						<ListItemIcon>
							<SettingsOutlinedIcon />
						</ListItemIcon>
						<ListItemText primary="Edit" />
					</ListItemButton>
					<ListItemButton
						onClick={() => {
							handleSignOutClick()
							handleClose()
						}}
					>
						<ListItemIcon>
							<LogoutOutlinedIcon />
						</ListItemIcon>
						<ListItemText primary="Sign out" />
					</ListItemButton>
				</List>
			</Menu>
		</>
	)
}
