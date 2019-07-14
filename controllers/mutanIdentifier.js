require('../lib/dnaLog');
const config = require('../config');

const findHorizontalMatch = (dna) => {
	////console.info("\n==============================\nsearching for horizontal matches...\n");

	let n = dna.length, countMatch = 0;
	////console.debug(`n = ${n} -- dna = ${dna}`);

	for (let row = 0; row < n; row++) {
		let count = 0;
		////console.debug(`\n------------------------------\ncount: ${count} -- row: ${row}`);
		for (let col = 1; col < n; col++) {
			if (dna[row][col-1] == dna[row][col]) {
				count++;
				////console.debug(`col: ${col} -- [${row}][${col-1}]: ${dna[row][col-1]} == [${row}][${col}]: ${dna[row][col]} ? IGUALES!`);
				if (count == (config.minOccurrences - 1)) {
					countMatch++;
					count = 0;
					col++;
					////console.debug(`COUNT MATCH: ${countMatch}`);
				}
			} else {
				////console.debug(`col: ${col} -- [${row}][${col-1}]: ${dna[row][col-1]} == [${row}][${col}]: ${dna[row][col]} ? nop`);
				count = 0;
			}
		}
	}

	////console.info(`\n >> matches: ${countMatch}`);
	return countMatch;
};

const findVerticalMatch = (dna) => {
	//console.info("\n==============================\nsearching for vertical matches...\n");

	let n = dna.length, countMatch = 0;
	//console.debug(`n = ${n} -- dna = ${dna}`);
	//console.dnaToTable(dna);

	for (let col = 0; col < n; col++) {
		let count = 0;
		//console.debug(`\n------------------------------\ncount: ${count} -- col: ${col}`);
		for (let row = 1; row < n; row++) {
			if (dna[row-1][col] == dna[row][col]) {
				count++;
				//console.debug(`row: ${row} -- [${row-1}][${col}]: ${dna[row-1][col]} == [${row}][${col}]: ${dna[row][col]} ? IGUALES!`);
				if (count == (config.minOccurrences - 1)) {
					countMatch++;
					count = 0;
					row++;
					//console.debug(`COUNT MATCH: ${countMatch}`);
				}
			} else {
				//console.debug(`row: ${row} -- [${row-1}][${col}]: ${dna[row-1][col]} == [${row}][${col}]: ${dna[row][col]} ? nop`);
				count = 0;
			}
		}
	}
	
	//console.info(`\n >> matches: ${countMatch}`);
	return countMatch;
};


const findDiagonalRightMatch = (dna) => {
	//console.info("\n==============================\nsearching for 'diagonal to right' matches...\n");

	let n = dna.length, 
		countMatch = 0, 
		limit = n - config.minOccurrences, 
		_n = n-1;

	//console.debug(`n = ${n} -- limit = ${limit} -- dna = ${dna}`);
	//console.dnaToTable(dna);

	for (let i = -limit; i <= limit; i++) {
		let count = 0, 
			_i = Math.abs(i);
		//console.debug(`\n------------------------------\ncount: ${count} -- i: ${i}`);

		for(let j=1; j <= ((n-1) - _i); j++) {
			let _j = j-1;
			if (i <= 0) {
				if ( dna[ _i + _j ][ _j ] == dna[ _i + j ][ j ] ) {
					count++;
					//console.debug(`j: ${j} -- [${_i + _j}][${_j}]: ${dna[_i + _j][_j]} == [${_i + j}][${j}]: ${dna[_i + j][j]} ? IGUALES!`);
					if (count == (config.minOccurrences - 1)) {
						countMatch++;
						//console.debug(`COUNT MATCH: ${countMatch}`);
						count = 0;
						j++;
					}
				} else {
					//console.debug(`j: ${j} -- [${_i + _j}][${_j}]: ${dna[_i + _j][_j]} == [${_i + j}][${j}]: ${dna[_i + j][j]} ? nop`);
					count = 0;
				}
			} else {
				if ( dna[ _j ][ _i + _j ] == dna[ j ][ _i + j ] ) {
					count++;
					//console.debug(`j: ${j} -- [${_j}][${_i + _j}]: ${dna[_j][_i + _j]} == [${j}][${_i + j}]: dna[${j}][${_i + j}] ? IGUALES!`);
					if (count == (config.minOccurrences - 1)) {
						countMatch++;
						//console.debug(`COUNT MATCH: ${countMatch}`);
						count = 0; 
						j++;
					}
				} else {
					//console.debug(`j: ${j} -- [${j-1}][${i + (j-1)}]: ${dna[_j][i + _j]} == [${j}][${_i + j}]: dna[${j}][${_i + j}] ? nop`);
					count = 0;
				}
			}
		}
	}

	//console.info(`\n >> matches: ${countMatch}`);
	return countMatch;
};

const findDiagonalLeftMatch = (dna) => {
	//console.info("\n==============================\nsearching for 'diagonal to left' matches...\n");

	let n = dna.length, 
		countMatch = 0, 
		limit = n - config.minOccurrences
		_n = n-1;
	//console.debug(`n = ${n} -- limit = ${limit} -- dna = ${dna}`);
	//console.dnaToTable(dna);

	for (let i = -limit; i <= limit; i++) {
		let count = 0, 
			_i = Math.abs(i);
		//console.debug(`\n------------------------------\ncount: ${count} -- i: ${i}`);

		for(let j=1; j <= (_n - _i); j++) {
			let _j = j-1;

			if (i >= 0) {
				if ( dna[ _j ][ (_n -_j) - _i ] == dna[ j ][ (_n-j) - _i ] ) {
					count++;
					//console.debug(`j: ${j} -- [${_j}][${(_n -_j) - _i}]: ${dna[_j][(_n -_j) - _i]} == [${j}][${(_n-j) - _i}]: ${dna[j][(_n-j) - _i]} ? IGUALES!`);
					if (count == (config.minOccurrences - 1)) {
						countMatch++;
						//console.debug(`COUNT MATCH: ${countMatch}`);
						count = 0; 
						j++;
					}
				} else {
					//console.debug(`j: ${j} -- [${_j}][${(_n -_j) - _i}]: ${dna[_j][(_n -_j) - _i]} == [${j}][${(_n-j) - _i}]: ${dna[j][(_n-j) - _i]} ? nop`);
					count = 0;
				}
			} else {
				if ( dna[ _i + _j ][ _n - _j ] == dna[ _i + j ][ _n - j ] ) {
					count++;
					//console.debug(`j: ${j} -- [${_i + _j}][${_n - _j}]: ${dna[_i + _j][_n - _j]} == [${_i + j}][${_n - j}]: ${dna[_i + j][_n - j]} ? IGUALES!`);
					if (count == (config.minOccurrences - 1)) {
						countMatch++;
						//console.debug(`COUNT MATCH: ${countMatch}`);
						count = 0; 
						j++;
					}
				} else {
					//console.debug(`j: ${j} -- [${_i + _j}][${_n - _j}]: ${dna[_i + _j][_n - _j]} == [${_i + j}][${_n - j}]: ${dna[_i + j][_n - j]} ? nop`);
					count = 0;
				}
			}
		}
	}

	//console.info(`\n >> matches: ${countMatch}`);
	return countMatch;
};

const isMutant = (dna) => {
	let count = 0;
	count += findHorizontalMatch(dna);
	if (count < config.minMatchesQuantity) count += findVerticalMatch(dna);
	if (count < config.minMatchesQuantity) count += findDiagonalRightMatch(dna);
	if (count < config.minMatchesQuantity) count += findDiagonalLeftMatch(dna);

	return count >= config.minMatchesQuantity ? true : false;
};

const isValidDna = (dna) => {
	let rows = Array.isArray(dna) ? dna.length : 0;
	if (!Array.isArray(dna)) return false;
	if (Array.isArray(dna) && (rows < 4 || rows > 1000)) return false;
	for( let i = 0; i < rows; i++) {
		let row = dna[i];
		if ( !(typeof row === 'string' || row instanceof String) ) return false;
		if (row.length != rows) return false;
		if (/[^(A|T|C|G)]/.test(row)) return false;
	};
	return true;
}

module.exports = {isMutant, isValidDna, findHorizontalMatch, findVerticalMatch, findDiagonalRightMatch, findDiagonalLeftMatch};