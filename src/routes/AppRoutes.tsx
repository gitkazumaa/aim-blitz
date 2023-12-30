import { createBrowserRouter, redirect, RouterProvider } from "react-router-dom"
import { WithSideBar } from "@/components/layout/WithSideBar"
import { HomePage } from "@/features/home"
import {
	CreateAccountPage,
	AccountPage,
	AccountEditPage,
} from "@/features/account"
import { SignInPage } from "@/features/account"
import { ScenariosPage } from "@/features/scenarios"
import { SettingsPage } from "@/features/settings"
import { TileFrenzyPage } from "@/features/tile-frenzy"
import { getAccountById } from "@/features/account/api/getAccountById"
import { getRecentScoresById } from "@/features/account/api/getRecentScoresById"
import { getAccount } from "@/features/account/api/getAccount"
import { OneWallFiveTargetsPage } from "@/features/1-wall-5-targets"

const router = createBrowserRouter([
	{
		path: "/aim-blitz",
		element: <WithSideBar />,
		children: [
			{
				path: "/aim-blitz",
				index: true,
				element: <HomePage />,
			},
			{
				path: "/aim-blitz/create-account",
				loader: async () => {
					const getAccountResponse = await getAccount()

					if (getAccountResponse?.data?.account) {
						return redirect("/")
					} else {
						return null
					}
				},
				element: <CreateAccountPage />,
			},
			{ path: "/aim-blitz/scenarios", element: <ScenariosPage /> },
			{ path: "/aim-blitz/settings", element: <SettingsPage /> },
			{
				path: "/aim-blitz/sign-in",
				loader: async () => {
					const getAccountResponse = await getAccount()

					if (getAccountResponse?.data?.account) {
						return redirect("/")
					} else {
						return null
					}
				},
				element: <SignInPage />,
			},
			{
				path: "/aim-blitz/accounts/:accountId",
				loader: async ({ params }) => {
					if (params.accountId) {
						const getAccountByIdResponse = await getAccountById({
							accountId: params.accountId,
						})
						const getScoresByIdResponse = await getRecentScoresById({
							accountId: params.accountId,
						})

						if (getAccountByIdResponse?.data?.account) {
							return {
								account: getAccountByIdResponse?.data?.account,
								recentScores: getScoresByIdResponse?.data?.scores,
							}
						} else {
							return redirect("/")
						}
					}
				},
				element: <AccountPage />,
			},
			{
				path: "/aim-blitz/accounts/:accountId/edit",
				loader: async ({ params }) => {
					if (params.accountId) {
						const getAccountResponse = await getAccount()

						if (getAccountResponse?.data?.account) {
							if (getAccountResponse.data.account._id === params.accountId) {
								return null
							}
						}
					}
					return redirect("/")
				},
				element: <AccountEditPage />,
			},
		],
	},
	{
		path: "/aim-blitz/scenarios",
		children: [
			{
				path: "/aim-blitz/scenarios/tile-frenzy",
				element: <TileFrenzyPage />,
			},
			{
				path: "/aim-blitz/scenarios/1-wall-5-targets",
				element: <OneWallFiveTargetsPage />,
			},
		],
	},
])

export const AppRoutes = () => {
	return <RouterProvider router={router} />
}
