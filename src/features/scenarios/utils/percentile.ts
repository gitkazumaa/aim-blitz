export function percentile(number: number, numbersArray: number[]) {
	// Add number to numbersArray if it is not in it already
	let index = numbersArray.indexOf(number)
	if (index === -1) {
		numbersArray.push(number)
	}

	// Sort the array in ascending order
	const sortedArray = numbersArray.slice().sort((a, b) => a - b)

	// Find the index of the number in the sorted array
	index = sortedArray.indexOf(number)

	// Calculate the percentile and round to 2 decimal places
	const percentile = (((index + 1) / sortedArray.length) * 100).toFixed(2)

	return parseFloat(percentile) // Convert the result back to a floating-point number
}
