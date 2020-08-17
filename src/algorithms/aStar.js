export function aStar(grid, heuristic) {
	console.log("here");
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
		updateNeighbors(lowestDistanceCell, grid, heuristic, finishCell);
	}
}

export function getShortestPath(grid) {
	const finishCell = findFinish(grid);
	const shortestPathCells = [];
	let currCell = finishCell;
	while (currCell.parent !== null) {
		shortestPathCells.unshift(currCell);
		currCell = currCell.parent;
	}
	return shortestPathCells;
}

function findStart(grid) {
	for (const row of grid) {
		for (const cell of row) {
			if (cell.startPoint) {
				return cell;
			}
		}
	}
}

function findFinish(grid) {
	for (const row of grid) {
		for (const cell of row) {
			if (cell.finishPoint) {
				return cell;
			}
		}
	}
}

function updateNeighbors(cell, grid, heuristic, finishCell) {
	const unvisitedNeighbors = getUnvisitedNeighbors(cell, grid);
	for (const neighbor of unvisitedNeighbors) {
		if (neighbor.distance > cell.distance + 10) {
			neighbor.distance = cell.distance + 10;
			neighbor.heuristicDistance =
				neighbor.distance +
				heuristic(neighbor.row, neighbor.col, finishCell.row, finishCell.col);
			neighbor.parent = cell;
		}
	}
}

function getUnvisitedNeighbors(cell, grid) {
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

	return validNeighbors;
}

function sortCells(remainingCells) {
	remainingCells.sort(
		(cellA, cellB) => cellA.heuristicDistance - cellB.heuristicDistance
	);
}

function getAllCells(grid) {
	const cells = [];
	for (const row of grid) {
		for (const cell of row) {
			cells.push(cell);
		}
	}
	return cells;
}
