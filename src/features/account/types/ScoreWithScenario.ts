import { Scenario } from "@/features/scenarios/types/Scenario"

export interface ScoreWithScenario {
	_id: string
	accountId: string
	scenarioId: Scenario
	score: number
	accuracy: number
	date: string
}
