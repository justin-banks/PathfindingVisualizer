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
	if (col < grid.length - 1) {
		validNeighbors.push(grid[row][col + 1]);
	}
	if (row > 0) {
		validNeighbors.push(grid[row - 1][col]);
	}
	if (row < grid[0].length - 1) {
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

export function pathfindFunction(grid, heuristic, allowDiagonals) {
	const startCell = findStart(grid);
	const finishCell = findFinish(grid);
	const cellsInOrder = [];
	startCell.distance = 0;
	startCell.heuristicDistance = 0;
	const remainingCells = getAllCells(grid);
	while (!!remainingCells.length) {
		sortCells(remainingCells);

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
			allowDiagonals
		);
	}
}

function updateNeighbors(cell, grid, heuristic, finishCell, allowDiagonals) {
	console.log(allowDiagonals);
	const unvisitedNeighbors = getUnvisitedNeighbors(cell, grid);
	var diagonalUnvisitedNeighbors = [];
	if (allowDiagonals) {
		diagonalUnvisitedNeighbors = diagonalCells(cell, grid, unvisitedNeighbors);
	}
	for (const neighbor of unvisitedNeighbors) {
		if (neighbor.distance > cell.distance + 10) {
			neighbor.distance = cell.distance + 10;
			neighbor.heuristicDistance =
				neighbor.distance +
				heuristic(neighbor.row, neighbor.col, finishCell.row, finishCell.col);
			neighbor.parent = cell;
		}
	}
	for (const neighbor of diagonalUnvisitedNeighbors) {
		if (neighbor.distance > cell.distance + 14) {
			neighbor.distance = cell.distance + 14;
			neighbor.heuristicDistance =
				neighbor.distance +
				heuristic(neighbor.row, neighbor.col, finishCell.row, finishCell.col);
			neighbor.parent = cell;
		}
	}
}

function diagonalCells(cell, grid, unvisitedNeighbors) {
	const { row, col } = cell;
	console.log("row: " + row + " col:" + col);
	const validNeighbors = [];

	if (col > 0 && row > 0) {
		if (
			(unvisitedNeighbors.includes(grid[row - 1][col]) &&
				!grid[row - 1][col].currentWall) ||
			(unvisitedNeighbors.includes(grid[row][col - 1]) &&
				!grid[row][col - 1].currentWall)
		) {
			validNeighbors.push(grid[row - 1][col - 1]);
		}
	}
	if (col > 0 && row < grid[0].length - 1) {
		if (
			(unvisitedNeighbors.includes(grid[row + 1][col]) &&
				!grid[row + 1][col].currentWall) ||
			(unvisitedNeighbors.includes(grid[row][col - 1]) &&
				!grid[row][col - 1].currentWall)
		) {
			validNeighbors.push(grid[row + 1][col - 1]);
		}
	}
	if (col < grid.length - 1 && row > 0) {
		if (
			(unvisitedNeighbors.includes(grid[row - 1][col]) &&
				!grid[row - 1][col].currentWall) ||
			(unvisitedNeighbors.includes(grid[row][col + 1]) &&
				!grid[row][col + 1].currentWall)
		) {
			validNeighbors.push(grid[row - 1][col + 1]);
		}
	}
	if (col < grid.length - 1 && row < grid[0].length - 1) {
		if (
			(unvisitedNeighbors.includes(grid[row + 1][col]) &&
				!grid[row + 1][col].currentWall) ||
			(unvisitedNeighbors.includes(grid[row][col + 1]) &&
				!grid[row][col + 1].currentWall)
		) {
			validNeighbors.push(grid[row + 1][col + 1]);
		}
	}
	return validNeighbors.filter(
		(neighbor) => !neighbor.beenVisited && !neighbor.currentWall
	);
}

function sortCells(remainingCells) {
	remainingCells.sort(
		(cellA, cellB) => cellA.heuristicDistance - cellB.heuristicDistance
	);
}
