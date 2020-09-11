export function createMazeFunction(row, col) {
	const maze = generateMazeLayout(row * 2 - 1, col * 2 - 1);
	const mazeConnections = connectMaze(maze, 0, 0);
	return mazeConnections;
}

function connectMaze(maze, row, col) {
	var orderedvisits = [];
	orderedvisits.push(finalLoc(row, col, false));
	maze[row][col].beenVisited = true;
	var unvisitedNeighbors = getUnvisitedNeighbors(maze, row, col);
	while (unvisitedNeighbors.length > 0) {
		const randomNeighbor = Math.floor(
			Math.random() * unvisitedNeighbors.length
		);
		const betweenSpace =
			maze[(row + unvisitedNeighbors[randomNeighbor].row) / 2][
				(col + unvisitedNeighbors[randomNeighbor].col) / 2
			];
		orderedvisits.push(finalLoc(betweenSpace.row, betweenSpace.col, false));
		orderedvisits = orderedvisits.concat(
			connectMaze(
				maze,
				unvisitedNeighbors[randomNeighbor].row,
				unvisitedNeighbors[randomNeighbor].col
			)
		);

		orderedvisits.push(finalLoc(betweenSpace.row, betweenSpace.col, true));
		unvisitedNeighbors = unvisitedNeighbors.filter((cell) => !cell.beenVisited);
	}
	orderedvisits.push(finalLoc(row, col, true));
	return orderedvisits;
}

function finalLoc(row, col, beenConnected) {
	return { row: row, col: col, beenConnected: beenConnected };
}

function getUnvisitedNeighbors(maze, row, col) {
	const unvisitedNeighbors = [];
	if (row > 1) {
		unvisitedNeighbors.push(maze[row - 2][col]);
	}
	if (col > 1) {
		unvisitedNeighbors.push(maze[row][col - 2]);
	}
	if (row < maze.length - 2) {
		unvisitedNeighbors.push(maze[row + 2][col]);
	}
	if (col < maze[0].length - 2) {
		unvisitedNeighbors.push(maze[row][col + 2]);
	}
	return unvisitedNeighbors.filter((cell) => !cell.beenVisited);
}

function generateMazeLayout(row, col) {
	const maze = [];
	for (let i = 0; i < row; i++) {
		const mazeRow = [];
		for (let j = 0; j < col; j++) {
			mazeRow.push(createMazeCell(i, j));
		}
		maze.push(mazeRow);
	}
	return maze;
}

function createMazeCell(row, col) {
	return {
		row: row,
		col: col,
		beenVisited: false,
	};
}
