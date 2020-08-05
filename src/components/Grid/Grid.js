import React from "react";
import "./Grid.css";
import Cell from "./../Cell/Cell";

function Grid({ row = 10, col = 10 }) {
	if (row <= 1) {
		throw new Error("row size must be greater than 1");
	} else if (col <= 1) {
		throw new Error("col size must be greater than 1");
	}

	var rowArr = new Array(col).fill(1);
	var cellsRow = rowArr.map((step, move) => {
		return <Cell key={move} />;
	});

	var gridArr = new Array(row).fill(1);
	var finalGrid = gridArr.map((step, move) => {
		return (
			<div className="GridRow" key={move}>
				{cellsRow}
			</div>
		);
	});

	return <div className="Grid">{finalGrid}</div>;
}

export default Grid;
