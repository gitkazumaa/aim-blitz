import { Stack } from "@mui/material"
import { LocalSettingsProvider } from "@/features/settings/components/LocalSettingsProvider"
import { PointerLockProvider } from "@/features/scenarios/components/PointerLockControlsProvider"
import { ChallengeProvider } from "@/features/scenarios/components/ChallengeProvider"
import { ScoreProvider } from "@/features/scenarios/components/ScoreProvider"
import { R3fCanvas } from "@/features/scenarios/three-components/R3fCanvas"
import { Crosshair } from "@/features/scenarios/components/Crosshair"
import { PlayMenu } from "@/features/scenarios/components/PlayMenu"
import { Timer } from "@/features/scenarios/components/Timer"
import { Scoreboard } from "@/features/scenarios/components/Scoreboard"
import { Statistics } from "@/features/scenarios/components/Statistics"
import { TimerProvider } from "@/features/scenarios/components/TimerProvider"
import { Controls } from "@/features/scenarios/three-components/Controls"
import {
	WALL_WIDTH,
	WALL_HEIGHT,
	FLOOR_DEPTH,
	Map,
} from "../three-components/Map"
import { ThreeTargets } from "../three-components/ThreeTargets"

const scenarioName = "tile-frenzy"

export const TileFrenzyPage = () => {
	return (
		<LocalSettingsProvider>
			<PointerLockProvider>
				<ChallengeProvider>
					<ScoreProvider damagePerHit={25}>
						<TimerProvider timeDuration={30} scenarioName={scenarioName}>
							<Stack width={"100%"} height={"100%"}>
								<R3fCanvas>
									<Map />
									<ThreeTargets />
									<Controls
										position={[
											WALL_WIDTH / 2,
											WALL_HEIGHT / 2,
											FLOOR_DEPTH - 1,
										]}
									/>
								</R3fCanvas>
								<Crosshair />
								<PlayMenu />
								<Timer />
								<Scoreboard scenarioName={scenarioName} />
								<Statistics />
							</Stack>
						</TimerProvider>
					</ScoreProvider>
				</ChallengeProvider>
			</PointerLockProvider>
		</LocalSettingsProvider>
	)
}
