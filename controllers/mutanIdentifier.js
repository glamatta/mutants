const config = require('../config');

// Horizontal match
const findHorizontalMatch = (dna) => {
	console.info("\n==============================\nsearching for horizontal matches...\n");

	let n = dna.length, countMatch = 0;
	console.debug(`n = ${n} -- dna = ${dna}`);

	for (let row = 0; row < n; row++) {
		let count = 0;
		console.debug(`\n------------------------------\ncount: ${count} -- row: ${row}`);
		for (let col = 1; col < n; col++) {
			if (dna[row][col-1] == dna[row][col]) {
				count++;
				console.debug(`col: ${col} -- [${row}][${col-1}]: ${dna[row][col-1]} == [${row}][${col}]: ${dna[row][col]} ? IGUALES!`);
				if (count == (config.minOccurrences - 1)) {
					countMatch++;
					console.debug(`COUNT MATCH: ${countMatch}`);
				}
			} else {
				console.debug(`col: ${col} -- [${row}][${col-1}]: ${dna[row][col-1]} == [${row}][${col}]: ${dna[row][col]} ? nop`);
				count = 0;
			}
		}
	}

	console.info(`\n >> matches: ${countMatch}`);
	return countMatch;
};

const findVerticalMatch = (dna) => {
	console.info("\n==============================\nsearching for vertical matches...\n");

	let n = dna.length, countMatch = 0;
	console.debug(`n = ${n} -- dna = ${dna}`);

	for (let col = 0; col < n; col++) {
		let count = 0;
		console.debug(`\n------------------------------\ncount: ${count} -- col: ${col}`);
		for (let row = 1; row < n; row++) {
			if (dna[row-1][col] == dna[row][col]) {
				count++;
				console.debug(`row: ${row} -- [${row-1}][${col}]: ${dna[row-1][col]} == [${row}][${col}]: ${dna[row][col]} ? IGUALES!`);
				if (count == (config.minOccurrences - 1)) {
					countMatch++;
					console.debug(`COUNT MATCH: ${countMatch}`);
				}
			} else {
				console.debug(`row: ${row} -- [${row-1}][${col}]: ${dna[row-1][col]} == [${row}][${col}]: ${dna[row][col]} ? nop`);
				count = 0;
			}
		}
	}

	console.info(`\n >> matches: ${countMatch}`);
	return countMatch;
};


const findDiagonalRightMatch = (dna) => {
	console.info("\n==============================\nsearching for 'diagonal to right' matches...\n");

	let n = dna.length, countMatch = 0, limit = n - config.minOccurrences;
	console.debug(`n = ${n} -- limit = ${limit} -- dna = ${dna}`);

	for (let i = -limit; i <= limit; i++) {
		let count = 0;
		console.debug(`\n------------------------------\ncount: ${count} -- i: ${i}`);

		for(let j=1; j <= ((n-1) - Math.abs(i)); j++) {
			if (i <= 0) {
				if (dna[Math.abs(i) + (j-1)][j-1] == dna[Math.abs(i) + j][j]) {
					count++;
					console.debug(`j: ${j} -- [${Math.abs(i) + (j-1)}][${j-1}]: ${dna[Math.abs(i) + (j-1)][j-1]} == [${Math.abs(i) + j}][${j}]: ${dna[Math.abs(i) + j][j]} ? IGUALES!`);
					if (count == (config.minOccurrences - 1)) {
						countMatch++;
						console.debug(`COUNT MATCH: ${countMatch}`);
					}
				} else {
					console.debug(`j: ${j} -- [${Math.abs(i) + (j-1)}][${j-1}]: ${dna[Math.abs(i) + (j-1)][j-1]} == [${Math.abs(i) + j}][${j}]: ${dna[Math.abs(i) + j][j]} ? nop`);
					count = 0;
				}
			} else {
				if (dna[j-1][i + (j-1)] == dna[j][i + j]) {
					count++;
					console.debug(`j: ${j} -- [${j-1}][${i + (j-1)}]: ${dna[j-1][i + (j-1)]} == [${j}][${Math.abs(i) + j}]: dna[${j}][${i + j}] ? IGUALES!`);
					if (count == (config.minOccurrences - 1)) {
						countMatch++;
						console.debug(`COUNT MATCH: ${countMatch}`);
					}
				} else {
					console.debug(`j: ${j} -- [${j-1}][${i + (j-1)}]: ${dna[j-1][i + (j-1)]} == [${j}][${Math.abs(i) + j}]: dna[${j}][${i + j}] ? nop`);
					count = 0;
				}
			}
		}
	}

	console.info(`\n >> matches: ${countMatch}`);
	return countMatch;
};

const findDiagonalLeftMatch = (dna) => {
	console.info("\n==============================\nsearching for 'diagonal to left' matches...\n");

	let n = dna.length, countMatch = 0, limit = n - config.minOccurrences;
	console.debug(`n = ${n} -- limit = ${limit} -- dna = ${dna}`);

	for (let i = limit; i >= -limit; i--) {
		let count = 0;
		console.debug(`\n------------------------------\ncount: ${count} -- i: ${i}`);

		for(let j=1; j <= ((n-1) - Math.abs(i)); j++) {
			if (i >= 0) {
				if (dna[j-1][(n-i) - j] == dna[j][(n-i)-(j+1)]) {
					count++;
					console.debug(`j: ${j} -- [${j-1}][${(n-i) - j}]: ${dna[j-1][(n-i) - j]} == [${j}][${(n-i)-(j+1)}]: ${dna[j][(n-i)-(j+1)]} ? IGUALES!`);
					if (count == (config.minOccurrences - 1)) {
						countMatch++;
						console.debug(`COUNT MATCH: ${countMatch}`);
					}
				} else {
					console.debug(`j: ${j} -- [${j-1}][${(n-i) - j}]: ${dna[j-1][(n-i) - j]} == [${j}][${(n-i)-(j+1)}]: ${dna[j][(n-i)-(j+1)]} ? nop`);
					count = 0;
				}
			} else {
				if (dna[Math.abs(i) + (j-1)][n-j] == dna[Math.abs(i) + j][n - (j-1)]) {
					count++;
					console.debug(`j: ${j} -- [${Math.abs(i) + (j-1)}][${n-j}]: ${dna[Math.abs(i) + (j-1)][n-j]} == [${Math.abs(i) + j}][${n - (j-1)}]: ${dna[Math.abs(i) + j][n - (j-1)]} ? IGUALES!`);
					if (count == (config.minOccurrences - 1)) {
						countMatch++;
						console.debug(`COUNT MATCH: ${countMatch}`);
					}
				} else {
					console.debug(`j: ${j} -- [${Math.abs(i) + (j-1)}][${n-j}]: ${dna[Math.abs(i) + (j-1)][n-j]} == [${Math.abs(i) + j}][${n - (j-1)}]: ${dna[Math.abs(i) + j][n - (j-1)]} ? nop`);
					count = 0;
				}
			}
		}
	}

	console.info(`\n >> matches: ${countMatch}`);
	return countMatch;
};

module.exports = {findHorizontalMatch, findVerticalMatch, findDiagonalRightMatch, findDiagonalLeftMatch};