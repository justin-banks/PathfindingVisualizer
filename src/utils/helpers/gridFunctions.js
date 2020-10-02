export function findStart(grid) {
	for (const row of grid) {
		for (const cell of row) {
			if (cell.startPoint) {
				return cell;
			}
		}
	}
}

export function findFinish(grid) {
	for (const row of grid) {
		for (const cell of row) {
			if (cell.finishPoint) {
				return cell;
			}
		}
	}
}

export function getUnvisitedNeighbors(cell, grid) {
	const { row, col } = cell;
	const validNeighbors = [];
	if (col > 0) {
		validNeighbors.push(grid[row][col - 1]);
	}
	if (col < grid[0].length - 1) {
		validNeighbors.push(grid[row][col + 1]);
	}
	if (row > 0) {
		validNeighbors.push(grid[row - 1][col]);
	}
	if (row < grid.length - 1) {
		validNeighbors.push(grid[row + 1][col]);
	}

	return validNeighbors.filter((neighbor) => !neighbor.beenVisited);
}

export function getAllCells(grid) {
	const cells = [];
	for (const row of grid) {
		for (const cell of row) {
			cells.push(cell);
		}
	}
	return cells;
}

export function pathfindFunction(
	grid,
	heuristic,
	allowDiagonals,
	dontCutCorners,
	heuristicOption,
	algorithmOptions,
	biasResults
) {
	const startCell = findStart(grid);
	const finishCell = findFinish(grid);
	const cellsInOrder = [];
	startCell.distance = 0;
	startCell.heuristicDistanceTotal = 0;
	startCell.heuristicDistance = 0;
	const remainingCells = getAllCells(grid);
	while (!!remainingCells.length) {
		switch (algorithmOptions) {
			case 2:
				sortCellsHeuristic(remainingCells);
				break;
			default:
				sortCells(remainingCells);
				break;
		}

		const lowestDistanceCell = remainingCells.shift();
		if (lowestDistanceCell.currentWall) {
			continue;
		}
		if (lowestDistanceCell.distance === Infinity) {
			return cellsInOrder;
		}

		lowestDistanceCell.beenVisited = true;
		cellsInOrder.push(lowestDistanceCell);
		if (lowestDistanceCell === finishCell) {
			return cellsInOrder;
		}
		updateNeighbors(
			lowestDistanceCell,
			grid,
			heuristic,
			finishCell,
			allowDiagonals,
			dontCutCorners,
			heuristicOption,
			algorithmOptions,
			biasResults
		);
	}
}

function updateNeighbors(
	cell,
	grid,
	heuristic,
	finishCell,
	allowDiagonals,
	dontCutCorners,
	heuristicOption,
	algorithmOptions,
	biasResults
) {
	const unvisitedNeighbors = getUnvisitedNeighbors(cell, grid);
	var diagonalUnvisitedNeighbors = [];
	if (allowDiagonals) {
		diagonalUnvisitedNeighbors = diagonalCells(
			cell,
			grid,
			unvisitedNeighbors,
			dontCutCorners
		);
	}

	var cardinalCost;
	var diagonalCost;
	switch (heuristicOption) {
		case "Octile":
			cardinalCost = 1;
			diagonalCost = Math.SQRT2;
			break;
		default:
			cardinalCost = 10;
			diagonalCost = 14;
	}
	var biasAmount;
	if (biasResults) {
		biasAmount = 1 + 1 / (150 * 150);
	} else {
		biasAmount = 1;
	}
	for (const neighbor of unvisitedNeighbors) {
		if (neighbor.distance > cell.distance + cardinalCost) {
			neighbor.distance = cell.distance + cardinalCost;
			if (algorithmOptions === 4) {
				neighbor.heuristicDistanceTotal =
					cell.heuristicDistanceTotal + 1 * biasAmount;
			} else {
				neighbor.heuristicDistanceTotal =
					neighbor.distance +
					heuristic(
						neighbor.row,
						neighbor.col,
						finishCell.row,
						finishCell.col
					) *
						biasAmount;
			}
			neighbor.parent = cell;
			neighbor.heuristicDistance =
				heuristic(neighbor.row, neighbor.col, finishCell.row, finishCell.col) *
				biasAmount;
		}
	}
	for (const neighbor of diagonalUnvisitedNeighbors) {
		if (neighbor.distance > cell.distance + diagonalCost) {
			neighbor.distance = cell.distance + diagonalCost;
			if (algorithmOptions === 4) {
				neighbor.heuristicDistanceTotal =
					cell.heuristicDistanceTotal + 1 * biasAmount;
			} else {
				neighbor.heuristicDistanceTotal =
					neighbor.distance +
					heuristic(
						neighbor.row,
						neighbor.col,
						finishCell.row,
						finishCell.col
					) *
						biasAmount;
			}
			neighbor.parent = cell;
			neighbor.heuristicDistance =
				heuristic(neighbor.row, neighbor.col, finishCell.row, finishCell.col) *
				biasAmount;
		}
	}
}

function diagonalCells(cell, grid, unvisitedNeighbors, dontCutCorners) {
	const { row, col } = cell;
	const validNeighbors = [];

	if (col > 0 && row > 0) {
		if (
			checkDiagonalCellsHelper(
				row,
				col,
				row - 1,
				col - 1,
				grid,
				dontCutCorners,
				unvisitedNeighbors
			)
		) {
			validNeighbors.push(grid[row - 1][col - 1]);
		}
	}
	if (col > 0 && row < grid.length - 1) {
		if (
			checkDiagonalCellsHelper(
				row,
				col,
				row + 1,
				col - 1,
				grid,
				dontCutCorners,
				unvisitedNeighbors
			)
		) {
			validNeighbors.push(grid[row + 1][col - 1]);
		}
	}
	if (col < grid[0].length - 1 && row > 0) {
		if (
			checkDiagonalCellsHelper(
				row,
				col,
				row - 1,
				col + 1,
				grid,
				dontCutCorners,
				unvisitedNeighbors
			)
		) {
			validNeighbors.push(grid[row - 1][col + 1]);
		}
	}
	if (col < grid[0].length - 1 && row < grid.length - 1) {
		if (
			checkDiagonalCellsHelper(
				row,
				col,
				row + 1,
				col + 1,
				grid,
				dontCutCorners,
				unvisitedNeighbors
			)
		) {
			validNeighbors.push(grid[row + 1][col + 1]);
		}
	}
	return validNeighbors.filter(
		(neighbor) => !neighbor.beenVisited && !neighbor.currentWall
	);
}

function checkDiagonalCellsHelper(
	currRow,
	currCol,
	nextRow,
	nextCol,
	grid,
	dontCutCorners,
	unvisitedNeighbors
) {
	if (dontCutCorners) {
		return (
			unvisitedNeighbors.includes(grid[nextRow][currCol]) &&
			!grid[nextRow][currCol].currentWall &&
			unvisitedNeighbors.includes(grid[currRow][nextCol]) &&
			!grid[currRow][nextCol].currentWall
		);
	} else {
		return (
			(unvisitedNeighbors.includes(grid[nextRow][currCol]) &&
				!grid[nextRow][currCol].currentWall) ||
			(unvisitedNeighbors.includes(grid[currRow][nextCol]) &&
				!grid[currRow][nextCol].currentWall)
		);
	}
}

export function sortCells(remainingCells) {
	remainingCells.sort(
		(cellA, cellB) =>
			cellA.heuristicDistanceTotal - cellB.heuristicDistanceTotal
	);
}

function sortCellsHeuristic(remainingCells) {
	remainingCells.sort(
		(cellA, cellB) => cellA.heuristicDistance - cellB.heuristicDistance
	);
}
