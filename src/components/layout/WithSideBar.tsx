import { Stack } from "@mui/material"
import { Outlet } from "react-router-dom"
import { Header } from "@/features/header"
import { Sidebar } from "@/features/sidebar"

export const WithSideBar = () => {
	return (
		<Stack flexDirection="row">
			<Header />
			<Sidebar />
			<Stack
				sx={{
					pt: {
						xs: "calc(var(--Header-height))",
					},
					flexGrow: 1,
					alignItems: "center",
				}}
			>
				<Outlet />
			</Stack>
		</Stack>
	)
}
