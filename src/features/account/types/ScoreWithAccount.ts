import { Account } from "./Account"

export interface ScoreWithUser {
	_id: string
	accountId: Account
	scenarioId: string
	score: number
	accuracy: number
	date: string
}
