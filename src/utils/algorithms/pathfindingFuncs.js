import {
	noHeuristic,
	manhattanHeuristic,
	octileHeuristic,
	euclideanHeuristic,
	chebyshevHeuristic,
} from "./heuristics";
import { pathfindFunction, findFinish } from "./../helpers/gridFunctions";
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
		default:
			heuristic = noHeuristic();
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
	while (currCell.parent !== null) {
		shortestPathCells.unshift(currCell);
		currCell = currCell.parent;
	}
	return shortestPathCells;
}
