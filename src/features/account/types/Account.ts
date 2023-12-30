import { Settings } from "@/features/settings"

export interface Account {
	_id: string
	date: string
	image: string
	password: string
	username: string
	scores: Map<string, string>
	settings: Settings
}
