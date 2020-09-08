import { findStart, findFinish, getAllCells } from "./gridFunctions";

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
	const remainingCells = getAllCells(grid);

	expandDiagonal(grid, startCell, Diagonals.SouthEast);
	return null;
}

function expandDiagonal(grid, cell, direction) {
	if (direction === Diagonals.NorthEast) {
		expandHorizontal(grid, cell.row, cell.col, 1);
	} else if (direction === Diagonals.SouthEast) {
	} else if (direction === Diagonals.SouthWest) {
	} else if (direction === Diagonals.NorthWest) {
	}
}
