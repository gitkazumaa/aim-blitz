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
		path: "/",
		element: <WithSideBar />,
		children: [
			{
				path: "/",
				index: true,
				element: <HomePage />,
			},
			{
				path: "/create-account",
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
			{ path: "/scenarios", element: <ScenariosPage /> },
			{ path: "/settings", element: <SettingsPage /> },
			{
				path: "/sign-in",
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
				path: "/accounts/:accountId",
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
				path: "/accounts/:accountId/edit",
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
		path: "/scenarios",
		children: [
			{
				path: "/scenarios/tile-frenzy",
				element: <TileFrenzyPage />,
			},
			{
				path: "/scenarios/1-wall-5-targets",
				element: <OneWallFiveTargetsPage />,
			},
			{
				path: "/scenarios/*",
				loader: () => redirect("/scenarios"),
			},
		],
	},
	{
		path: "*",
		loader: () => redirect("/"),
	},
])

export const AppRoutes = () => {
	return <RouterProvider router={router} />
}
