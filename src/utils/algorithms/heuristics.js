export function makeHeuristic() {
	return function (cellRow, cellCol, finishRow, finishCol) {
		const deltaRow = Math.abs(cellRow - finishRow);
		const deltaCol = Math.abs(cellCol - finishCol);
		return (
			((10 * Math.min(deltaRow, deltaCol) + 10 * Math.max(deltaRow, deltaCol)) *
				1001) /
			1000
		);
	};
}

export function noHeuristic() {
	return function (cellRow, cellCol, finishRow, finishCol) {
		return 0;
	};
}
