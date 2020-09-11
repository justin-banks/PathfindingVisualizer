import { findStart, findFinish, getAllCells, sortCells } from "./gridFunctions";

const Diagonals = {
	NorthEast: 1,
	SouthEast: 2,
	SouthWest: 3,
	NorthWest: 4,
};

export function jumpPoint(grid, heuristic) {
	const startCell = findStart(grid);
	const finishCell = findFinish(grid);
	const CellsInOrder = [];
	startCell.distance = 0;
	startCell.heuristicDistanceTotal = 0;
	CellsInOrder.concat(
		expandDiagonal(
			grid,
			startCell,
			1,
			1,
			startCell,
			CellsInOrder,
			finishCell,
			heuristic
		)
	);
	startCell.beenVisited = false;
	CellsInOrder.concat(
		expandDiagonal(
			grid,
			startCell,
			1,
			-1,
			startCell,
			CellsInOrder,
			finishCell,
			heuristic
		)
	);
	startCell.beenVisited = false;
	CellsInOrder.concat(
		expandDiagonal(
			grid,
			startCell,
			-1,
			-1,
			startCell,
			CellsInOrder,
			finishCell,
			heuristic
		)
	);
	startCell.beenVisited = false;
	CellsInOrder.concat(
		expandDiagonal(
			grid,
			startCell,
			-1,
			1,
			startCell,
			CellsInOrder,
			finishCell,
			heuristic
		)
	);
	startCell.parent = null;

	while (1) {
		const allCells = getAllCells(grid);
		const remainingCells = allCells.filter(
			(cell) => cell.direction.length !== 0
		);
		if (remainingCells.length === 0) {
			return CellsInOrder;
		}
		sortCells(remainingCells);
		var lowestDistanceCell = remainingCells.shift();
		if (lowestDistanceCell.startPoint && remainingCells.length === 0) {
			return CellsInOrder;
		} else if (lowestDistanceCell.startPoint) {
			lowestDistanceCell = remainingCells.shift();
		}
		if (lowestDistanceCell.currentWall) {
			continue;
		}
		if (lowestDistanceCell.distance === Infinity) {
			return CellsInOrder;
		}
		if (lowestDistanceCell === finishCell) {
			return CellsInOrder;
		}
		const direction = lowestDistanceCell.direction.shift();
		const rowInc = getRowInc(direction);
		const colInc = getColInc(direction);
		expandDiagonal(
			grid,
			grid[lowestDistanceCell.row + rowInc][lowestDistanceCell.col + colInc],
			rowInc,
			colInc,
			lowestDistanceCell,
			CellsInOrder,
			finishCell,
			heuristic
		);
	}
	return CellsInOrder;
}

function getRowInc(direction) {
	if (direction === Diagonals.NorthEast || direction === Diagonals.NorthWest) {
		return -1;
	} else {
		return 1;
	}
}

function getColInc(direction) {
	if (direction === Diagonals.NorthEast || direction === Diagonals.SouthEast) {
		return 1;
	} else {
		return -1;
	}
}

function expandDiagonal(
	grid,
	cell,
	rowInc,
	colInc,
	parent,
	visitedCells,
	finishCell,
	heuristic
) {
	if (cell !== undefined && !cell.beenVisited && !cell.currentWall) {
		visitedCells.push(cell);
		cell.beenVisited = true;
		if (cell === finishCell) {
			cell.parent = parent;
			cell.distance =
				origin.distance +
				14 * Math.abs(origin.row - parent.row) +
				10 * Math.abs(parent.row - cell.row);
			cell.heuristicDistance = heuristic(
				cell.row,
				cell.col,
				finishCell.row,
				finishCell.col
			);
			cell.heuristicDistanceTotal = 0;
			cell.direction.push(getDirection(-1, colInc));
			return visitedCells;
		}
		if (
			validVerticalExpansion(grid, cell.row, -rowInc) &&
			grid[cell.row - rowInc][cell.col] !== undefined &&
			grid[cell.row - rowInc][cell.col].currentWall &&
			grid[cell.row - rowInc][cell.col + colInc] !== undefined &&
			!grid[cell.row - rowInc][cell.col + colInc].currentWall &&
			grid[cell.row][cell.col + colInc] !== undefined &&
			!grid[cell.row][cell.col + colInc].currentWall
		) {
			cell.parent = parent;
			cell.distance = parent.distance + 14 * Math.abs(cell.row - parent.row);
			cell.heuristicDistance = heuristic(
				cell.row,
				cell.col,
				finishCell.row,
				finishCell.col
			);
			cell.heuristicDistanceTotal = cell.heuristicDistance + cell.distance;
			cell.direction.push(getDirection(-rowInc, colInc));
		}
		if (
			validVerticalExpansion(grid, cell.row, rowInc) &&
			grid[cell.row][cell.col - colInc] !== undefined &&
			grid[cell.row][cell.col - colInc].currentWall &&
			grid[cell.row + rowInc][cell.col - colInc] !== undefined &&
			!grid[cell.row + rowInc][cell.col - colInc].currentWall &&
			grid[cell.row + rowInc][cell.col] !== undefined &&
			!grid[cell.row + rowInc][cell.col].currentWall
		) {
			cell.parent = parent;
			cell.distance = parent.distance + 14 * Math.abs(cell.row - parent.row);
			cell.heuristicDistance = heuristic(
				cell.row,
				cell.col,
				finishCell.row,
				finishCell.col
			);
			cell.heuristicDistanceTotal = cell.heuristicDistance + cell.distance;
			cell.direction.push(getDirection(rowInc, -colInc));
		}
		visitedCells.concat(
			expandHorizontal(
				grid,
				grid[cell.row][cell.col + colInc],
				colInc,
				cell,
				parent,
				visitedCells,
				finishCell,
				heuristic
			)
		);

		if (validVerticalExpansion(grid, cell.row, rowInc)) {
			visitedCells.concat(
				expandVertical(
					grid,
					grid[cell.row + rowInc][cell.col],
					rowInc,
					cell,
					parent,
					visitedCells,
					finishCell,
					heuristic
				)
			);
		}
		if (validDiagonalExpansion(grid, cell, rowInc, colInc)) {
			return expandDiagonal(
				grid,
				grid[cell.row + rowInc][cell.col + colInc],
				rowInc,
				colInc,
				parent,
				visitedCells,
				finishCell,
				heuristic
			);
		}
	}
}
function validDiagonalExpansion(grid, cell, rowInc, colInc) {
	if (
		validVerticalExpansion(grid, cell.row, rowInc) &&
		grid[cell.row + rowInc][cell.col + colInc] !== undefined
	) {
		return !(
			grid[cell.row][cell.col + colInc].currentWall &&
			grid[cell.row + rowInc][cell.col].currentWall
		);
	}
	return false;
}

function expandHorizontal(
	grid,
	cell,
	colInc,
	parent,
	origin,
	visitedCells,
	finishCell,
	heuristic
) {
	if (
		cell !== undefined &&
		cell.currentWall === false &&
		cell.beenVisited === false
	) {
		visitedCells.push(cell);
		cell.beenVisited = true;
		if (cell === finishCell) {
			parent.parent = origin;
			cell.parent = parent;
			cell.distance =
				origin.distance +
				14 * Math.abs(origin.row - parent.row) +
				10 * Math.abs(parent.row - cell.row);
			cell.heuristicDistance = heuristic(
				cell.row,
				cell.col,
				finishCell.row,
				finishCell.col
			);
			cell.heuristicDistanceTotal = 0;
			cell.direction.push(getDirection(-1, colInc));
			return visitedCells;
		}
		if (
			validVerticalExpansion(grid, cell.row, 1) &&
			grid[cell.row + 1][cell.col] !== undefined &&
			grid[cell.row + 1][cell.col].currentWall &&
			grid[cell.row + 1][cell.col + colInc] !== undefined &&
			!grid[cell.row + 1][cell.col + colInc].currentWall &&
			!grid[cell.row][cell.col + colInc].currentWall
		) {
			parent.parent = origin;
			cell.parent = parent;
			cell.distance =
				origin.distance +
				14 * Math.abs(origin.row - parent.row) +
				10 * Math.abs(parent.col - cell.col);
			cell.heuristicDistance = heuristic(
				cell.row,
				cell.col,
				finishCell.row,
				finishCell.col
			);
			cell.heuristicDistanceTotal = cell.heuristicDistance + cell.distance;
			cell.direction.push(getDirection(1, colInc));
		}
		if (
			validVerticalExpansion(grid, cell.row, -1) &&
			grid[cell.row - 1][cell.col] !== undefined &&
			grid[cell.row - 1][cell.col].currentWall &&
			grid[cell.row - 1][cell.col + colInc] !== undefined &&
			!grid[cell.row - 1][cell.col + colInc].currentWall &&
			!grid[cell.row][cell.col + colInc].currentWall
		) {
			parent.parent = origin;
			cell.parent = parent;
			cell.distance =
				origin.distance +
				14 * Math.abs(origin.row - parent.row) +
				10 * Math.abs(parent.col - cell.col);
			cell.heuristicDistance = heuristic(
				cell.row,
				cell.col,
				finishCell.row,
				finishCell.col
			);
			cell.heuristicDistanceTotal = cell.heuristicDistance + cell.distance;
			cell.direction.push(getDirection(-1, colInc));
		}
		return expandHorizontal(
			grid,
			grid[cell.row][cell.col + colInc],
			colInc,
			parent,
			origin,
			visitedCells,
			finishCell,
			heuristic
		);
	}
	return visitedCells;
}

function expandVertical(
	grid,
	cell,
	rowInc,
	parent,
	origin,
	visitedCells,
	finishCell,
	heuristic
) {
	if (cell !== undefined && cell.currentWall === false) {
		visitedCells.push(cell);
		cell.beenVisited = true;
		if (cell === finishCell) {
			parent.parent = origin;
			cell.parent = parent;
			cell.distance =
				origin.distance +
				14 * Math.abs(origin.row - parent.row) +
				10 * Math.abs(parent.row - cell.row);
			cell.heuristicDistance = heuristic(
				cell.row,
				cell.col,
				finishCell.row,
				finishCell.col
			);
			cell.heuristicDistanceTotal = 0;
			cell.direction.push(getDirection(rowInc, 1));
			return visitedCells;
		}
		if (
			validVerticalExpansion(grid, cell.row, rowInc) &&
			grid[cell.row][cell.col + 1] !== undefined &&
			grid[cell.row][cell.col + 1].currentWall &&
			grid[cell.row + rowInc][cell.col + 1] !== undefined &&
			!grid[cell.row + rowInc][cell.col + 1].currentWall &&
			!grid[cell.row + rowInc][cell.col].currentWall
		) {
			parent.parent = origin;
			cell.parent = parent;
			cell.distance =
				origin.distance +
				14 * Math.abs(origin.row - parent.row) +
				10 * Math.abs(parent.row - cell.row);
			cell.heuristicDistance = heuristic(
				cell.row,
				cell.col,
				finishCell.row,
				finishCell.col
			);
			cell.heuristicDistanceTotal = cell.heuristicDistance + cell.distance;
			cell.direction.push(getDirection(rowInc, 1));
		}
		if (
			validVerticalExpansion(grid, cell.row, rowInc) &&
			grid[cell.row][cell.col - 1] !== undefined &&
			grid[cell.row][cell.col - 1].currentWall &&
			grid[cell.row + rowInc][cell.col - 1] !== undefined &&
			!grid[cell.row + rowInc][cell.col - 1].currentWall &&
			!grid[cell.row + rowInc][cell.col].currentWall
		) {
			parent.parent = origin;
			cell.parent = parent;
			cell.distance =
				origin.distance +
				14 * Math.abs(origin.row - parent.row) +
				10 * Math.abs(parent.row - cell.row);
			cell.heuristicDistance = heuristic(
				cell.row,
				cell.col,
				finishCell.row,
				finishCell.col
			);
			cell.heuristicDistanceTotal = cell.heuristicDistance + cell.distance;
			cell.direction.push(getDirection(rowInc, -1));
		}
		if (validVerticalExpansion(grid, cell.row, rowInc)) {
			expandVertical(
				grid,
				grid[cell.row + rowInc][cell.col],
				rowInc,
				parent,
				origin,
				visitedCells,
				finishCell,
				heuristic
			);
		}
	}
}

function validVerticalExpansion(grid, currRow, rowInc) {
	return currRow + rowInc >= 0 && currRow + rowInc < grid.length;
}

function getDirection(rowInc, colInc) {
	if (rowInc < 0 && colInc > 0) {
		return Diagonals.NorthEast;
	} else if (rowInc > 0 && colInc > 0) {
		return Diagonals.SouthEast;
	} else if (rowInc > 0 && colInc < 0) {
		return Diagonals.SouthWest;
	} else if (rowInc < 0 && colInc < 0) {
		return Diagonals.NorthWest;
	} else {
		return null;
	}
}
