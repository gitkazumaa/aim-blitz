interface CrosshairProps {
	crosshairProps: {
		crosshairColor: string
		crosshairOutlineColor: string
		crosshairOpacity: number
		crosshairOutlineOpacity: number
		dotOpacity: number
		dotOutlineOpacity: number
		crosshairGap: number
		crosshairLength: number
		crosshairThickness: number
		crosshairOutlineThickness: number
		dotShape: string
		dotSize: number
		dotOutlineThickness: number
		hideTopLine: boolean
		crosshairRenderSize: number
	}
	fitWidth?: boolean
}

// const DEFAULT_RENDER_SIZE = 50

//TODO: ODD CROSSHAIR GAP. MOVE RIGHT RECT RIGHT AND BOTTOM RECT DOWN
//TODO: ODD CROSSHAIR GAP. MOVE RIGHT RECT RIGHT AND BOTTOM RECT DOWN

export const Crosshair = ({ crosshairProps, fitWidth }: CrosshairProps) => {
	const FIXED_LENGTH = 200
	const length = fitWidth
		? (crosshairProps.crosshairGap +
				crosshairProps.crosshairLength * 2 +
				crosshairProps.crosshairOutlineThickness) *
		  crosshairProps.crosshairRenderSize
		: FIXED_LENGTH

	const halfLength = length / 2

	return (
		<svg
			width={"100%"}
			height={"100%"}
			viewBox={`0 0 ${length} ${length}`}
			transform={`scale(${crosshairProps.crosshairRenderSize})`}
			style={{
				maxWidth: FIXED_LENGTH,
				maxHeight: FIXED_LENGTH,
			}}
		>
			{/* Left Rectangle Outline */}
			<rect
				x={
					halfLength -
					crosshairProps.crosshairLength -
					Math.floor(crosshairProps.crosshairGap / 2) -
					Math.floor(crosshairProps.crosshairOutlineThickness / 2)
				}
				y={
					halfLength -
					Math.floor(crosshairProps.crosshairThickness / 2) -
					Math.floor(crosshairProps.crosshairOutlineThickness / 2)
				}
				width={
					crosshairProps.crosshairLength +
					crosshairProps.crosshairOutlineThickness
				}
				height={
					crosshairProps.crosshairThickness +
					crosshairProps.crosshairOutlineThickness
				}
				fill={crosshairProps.crosshairOutlineColor}
				opacity={
					crosshairProps.crosshairOutlineOpacity >
					crosshairProps.crosshairOpacity
						? crosshairProps.crosshairOpacity
						: crosshairProps.crosshairOutlineOpacity
				}
			/>
			{/* Right Rectangle Outline */}
			<rect
				x={
					halfLength +
					Math.floor((crosshairProps.crosshairGap - 1) / 2) +
					1 -
					Math.floor(crosshairProps.crosshairOutlineThickness / 2)
				}
				y={
					halfLength -
					Math.floor(crosshairProps.crosshairThickness / 2) -
					Math.floor(crosshairProps.crosshairOutlineThickness / 2)
				}
				width={
					crosshairProps.crosshairLength +
					crosshairProps.crosshairOutlineThickness
				}
				height={
					crosshairProps.crosshairThickness +
					crosshairProps.crosshairOutlineThickness
				}
				fill={crosshairProps.crosshairOutlineColor}
				opacity={
					crosshairProps.crosshairOutlineOpacity >
					crosshairProps.crosshairOpacity
						? crosshairProps.crosshairOpacity
						: crosshairProps.crosshairOutlineOpacity
				}
			/>
			{!crosshairProps.hideTopLine && (
				<>
					{/* Top Rectangle Outline */}
					<rect
						x={
							halfLength -
							Math.floor(crosshairProps.crosshairThickness / 2) -
							Math.floor(crosshairProps.crosshairOutlineThickness / 2)
						}
						y={
							halfLength -
							crosshairProps.crosshairLength -
							Math.floor(crosshairProps.crosshairGap / 2) -
							Math.floor(crosshairProps.crosshairOutlineThickness / 2)
						}
						width={
							crosshairProps.crosshairThickness +
							crosshairProps.crosshairOutlineThickness
						}
						height={
							crosshairProps.crosshairLength +
							crosshairProps.crosshairOutlineThickness
						}
						fill={crosshairProps.crosshairOutlineColor}
						opacity={
							crosshairProps.crosshairOutlineOpacity >
							crosshairProps.crosshairOpacity
								? crosshairProps.crosshairOpacity
								: crosshairProps.crosshairOutlineOpacity
						}
					/>
				</>
			)}
			{/* Bottom Rectangle Outline*/}
			<rect
				x={
					halfLength -
					Math.floor(crosshairProps.crosshairThickness / 2) -
					Math.floor(crosshairProps.crosshairOutlineThickness / 2)
				}
				y={
					halfLength +
					Math.floor((crosshairProps.crosshairGap - 1) / 2) +
					1 -
					Math.floor(crosshairProps.crosshairOutlineThickness / 2)
				}
				width={
					crosshairProps.crosshairThickness +
					crosshairProps.crosshairOutlineThickness
				}
				height={
					crosshairProps.crosshairLength +
					crosshairProps.crosshairOutlineThickness
				}
				fill={crosshairProps.crosshairOutlineColor}
				opacity={
					crosshairProps.crosshairOutlineOpacity >
					crosshairProps.crosshairOpacity
						? crosshairProps.crosshairOpacity
						: crosshairProps.crosshairOutlineOpacity
				}
			/>
			{crosshairProps.dotShape === "Circle" ? (
				<>
					{/* Circle Outline */}
					<circle
						cx={halfLength}
						cy={halfLength}
						r={
							Math.floor(crosshairProps.dotSize / 2) +
							Math.floor(crosshairProps.dotOutlineThickness / 2)
						}
						fill={crosshairProps.crosshairOutlineColor}
						opacity={
							crosshairProps.dotOutlineOpacity > crosshairProps.dotOpacity
								? crosshairProps.dotOpacity
								: crosshairProps.dotOutlineOpacity
						}
					/>
				</>
			) : (
				<>
					{/* Square Outline */}
					<rect
						x={
							halfLength -
							Math.floor(crosshairProps.dotSize / 2) -
							Math.floor(crosshairProps.dotOutlineThickness / 2)
						}
						y={
							halfLength -
							Math.floor(crosshairProps.dotSize / 2) -
							Math.floor(crosshairProps.dotOutlineThickness / 2)
						}
						width={crosshairProps.dotSize + crosshairProps.dotOutlineThickness}
						height={crosshairProps.dotSize + crosshairProps.dotOutlineThickness}
						fill={crosshairProps.crosshairOutlineColor}
						opacity={
							crosshairProps.dotOutlineOpacity > crosshairProps.dotOpacity
								? crosshairProps.dotOpacity
								: crosshairProps.dotOutlineOpacity
						}
					/>
				</>
			)}

			{/* Left Rectangle */}
			<rect
				x={
					halfLength -
					crosshairProps.crosshairLength -
					Math.floor(crosshairProps.crosshairGap / 2)
				}
				y={halfLength - Math.floor(crosshairProps.crosshairThickness / 2)}
				width={crosshairProps.crosshairLength}
				height={crosshairProps.crosshairThickness}
				fill={crosshairProps.crosshairColor}
				opacity={crosshairProps.crosshairOpacity}
			/>

			{/* Right Rectangle */}
			<rect
				x={halfLength + Math.floor((crosshairProps.crosshairGap - 1) / 2) + 1}
				y={halfLength - Math.floor(crosshairProps.crosshairThickness / 2)}
				width={crosshairProps.crosshairLength}
				height={crosshairProps.crosshairThickness}
				fill={crosshairProps.crosshairColor}
				opacity={crosshairProps.crosshairOpacity}
			/>
			{!crosshairProps.hideTopLine && (
				<>
					{/* Top Rectangle */}
					<rect
						x={halfLength - Math.floor(crosshairProps.crosshairThickness / 2)}
						y={
							halfLength -
							crosshairProps.crosshairLength -
							Math.floor(crosshairProps.crosshairGap / 2)
						}
						width={crosshairProps.crosshairThickness}
						height={crosshairProps.crosshairLength}
						fill={crosshairProps.crosshairColor}
						opacity={crosshairProps.crosshairOpacity}
					/>
				</>
			)}
			{/* Bottom Rectangle */}
			<rect
				x={halfLength - Math.floor(crosshairProps.crosshairThickness / 2)}
				y={halfLength + Math.floor((crosshairProps.crosshairGap - 1) / 2) + 1}
				width={crosshairProps.crosshairThickness}
				height={crosshairProps.crosshairLength}
				fill={crosshairProps.crosshairColor}
				opacity={crosshairProps.crosshairOpacity}
			/>
			{crosshairProps.dotShape === "Circle" ? (
				<>
					{/* Circle */}
					<circle
						cx={halfLength}
						cy={halfLength}
						r={Math.floor(crosshairProps.dotSize / 2)}
						fill={crosshairProps.crosshairColor}
						opacity={crosshairProps.dotOpacity}
					/>
				</>
			) : (
				<>
					{/* Square */}
					<rect
						x={halfLength - Math.floor(crosshairProps.dotSize / 2)}
						y={halfLength - Math.floor(crosshairProps.dotSize / 2)}
						width={crosshairProps.dotSize}
						height={crosshairProps.dotSize}
						fill={crosshairProps.crosshairColor}
						opacity={crosshairProps.dotOpacity}
					/>
				</>
			)}
		</svg>
	)
}
