import { noHeuristic, makeHeuristic } from "./heuristics";
import { pathfindFunction, findFinish } from "./../helpers/gridFunctions";
export function getPath(grid, algorithmOption, heuristicOption) {
	switch (algorithmOption) {
		case 0:
			heuristicOption = 0;
			break;
	}
	var heuristic;
	switch (heuristicOption) {
		case "0":
			heuristic = noHeuristic();
			break;
		case "1":
			heuristic = makeHeuristic();
			break;
		default:
			heuristic = noHeuristic();
	}
	return pathfindFunction(grid, heuristic);
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
