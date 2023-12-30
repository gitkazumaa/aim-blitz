export function median(numbersArray: number[]) {
	// Sort the array in ascending order
	const sortedArray = numbersArray.slice().sort((a, b) => a - b)

	const length = sortedArray.length

	// Check if the array has an odd or even length
	if (length % 2 === 0) {
		// If even, return the average of the two middle numbers rounded to 2 decimal places
		const middleIndex1 = length / 2 - 1
		const middleIndex2 = length / 2
		const medianValue = (
			(sortedArray[middleIndex1] + sortedArray[middleIndex2]) /
			2
		).toFixed(2)
		return parseFloat(medianValue) // Convert the result back to a floating-point number
	} else {
		// If odd, return the middle number
		const middleIndex = Math.floor(length / 2)
		return sortedArray[middleIndex]
	}
}
