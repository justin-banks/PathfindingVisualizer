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

export function euclideanHeuristic() {
	return function (cellRow, cellCol, finishRow, finishCol) {
		const deltaRow = Math.abs(cellRow - finishRow);
		const deltaCol = Math.abs(cellCol - finishCol);
		return 10 * Math.sqrt(deltaRow * deltaRow + deltaCol * deltaCol);
	};
}

export function manhattanHeuristic() {
	return function (cellRow, cellCol, finishRow, finishCol) {
		const deltaRow = Math.abs(cellRow - finishRow);
		const deltaCol = Math.abs(cellCol - finishCol);
		return 10 * (deltaRow + deltaCol);
	};
}

export function chebyshevHeuristic() {
	return function (cellRow, cellCol, finishRow, finishCol) {
		const deltaRow = Math.abs(cellRow - finishRow);
		const deltaCol = Math.abs(cellCol - finishCol);
		return 10 * Math.max(deltaRow, deltaCol);
	};
}

export function octileHeuristic() {
	return function (cellRow, cellCol, finishRow, finishCol) {
		const deltaRow = Math.abs(cellRow - finishRow);
		const deltaCol = Math.abs(cellCol - finishCol);
		return (
			deltaRow + deltaCol + (Math.SQRT2 - 2) * Math.min(deltaRow, deltaCol)
		);
	};
}

export function noHeuristic() {
	return function (cellRow, cellCol, finishRow, finishCol) {
		return 0;
	};
}
