import {
	noHeuristic,
	manhattanHeuristic,
	octileHeuristic,
	euclideanHeuristic,
	chebyshevHeuristic,
} from "./heuristics";
import { pathfindFunction, findFinish } from "./../helpers/gridFunctions";
import { jumpPoint } from "./../helpers/jumpPoint";
export function getPath(
	grid,
	algorithmOption,
	heuristicOption,
	allowDiagonal,
	dontCutCorners
) {
	switch (algorithmOption) {
		case 0:
			heuristicOption = "0";
			break;
	}
	var heuristic;
	switch (heuristicOption) {
		case "0":
			heuristic = noHeuristic();
			break;
		case "Manhattan":
			heuristic = manhattanHeuristic();
			break;
		case "Octile":
			console.log("here");
			heuristic = octileHeuristic();
			break;
		case "Euclidean":
			heuristic = euclideanHeuristic();
			break;
		case "Chebyschev":
			heuristic = chebyshevHeuristic();
			break;
		default:
			heuristic = noHeuristic();
	}
	if (algorithmOption === 3) {
		return jumpPoint(grid, heuristic);
	}
	return pathfindFunction(
		grid,
		heuristic,
		allowDiagonal,
		dontCutCorners,
		heuristicOption,
		algorithmOption
	);
}

export function getShortestPath(grid) {
	const finishCell = findFinish(grid);
	const shortestPathCells = [];
	let currCell = finishCell;
	while (currCell !== null && currCell.parent !== currCell) {
		shortestPathCells.unshift(currCell);
		currCell = currCell.parent;
	}
	const shortestPathCellsFinal = [];
	shortestPathCellsFinal.push(shortestPathCells[0]);
	var rowInc, colInc, nextCell;
	for (let i = 1; i < shortestPathCells.length; i++) {
		if (shortestPathCells[i - 1].row < shortestPathCells[i].row) {
			rowInc = 1;
		} else if (shortestPathCells[i - 1].row > shortestPathCells[i].row) {
			rowInc = -1;
		} else {
			rowInc = 0;
		}
		if (shortestPathCells[i - 1].col < shortestPathCells[i].col) {
			colInc = 1;
		} else if (shortestPathCells[i - 1].col > shortestPathCells[i].col) {
			colInc = -1;
		} else {
			colInc = 0;
		}
		for (let j = 1; nextCell !== shortestPathCells[i]; j++) {
			nextCell =
				grid[shortestPathCells[i - 1].row + rowInc * j][
					shortestPathCells[i - 1].col + colInc * j
				];
			shortestPathCellsFinal.push(nextCell);
		}
	}
	return shortestPathCellsFinal;
}
