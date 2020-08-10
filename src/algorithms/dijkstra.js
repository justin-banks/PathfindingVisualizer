export function dijkstra(grid) {
	const startCell = findStart(grid);
	const finishCell = findFinish(grid);
	const cellsInOrder = [];
	startCell.distance = 0;
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
		updateNeighbors(lowestDistanceCell, grid);
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

function updateNeighbors(cell, grid) {
	const unvisitedNeighbors = getUnvisitedNeighbors(cell, grid);
	for (const neighbor of unvisitedNeighbors) {
		neighbor.distance = cell.distance + 1;
		neighbor.parent = cell;
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

	return validNeighbors.filter((neighbor) => !neighbor.beenVisited);
}

function sortCells(remainingCells) {
	remainingCells.sort((cellA, cellB) => cellA.distance - cellB.distance);
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
