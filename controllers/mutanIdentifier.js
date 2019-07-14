require('../lib/dnaLog');
const config = require('../config');

const findHorizontalMatch = (dna) => {
	let n = dna.length, countMatch = 0;

	for (let row = 0; row < n; row++) {
		let count = 0;
		for (let col = 1; col < n; col++) {
			if (dna[row][col-1] == dna[row][col]) {
				count++;
				if (count == (config.minOccurrences - 1)) {
					countMatch++;
					count = 0;
					col++;
				}
			} else {
				count = 0;
			}
		}
	}
	return countMatch;
};

const findVerticalMatch = (dna) => {
	let n = dna.length, countMatch = 0;

	for (let col = 0; col < n; col++) {
		let count = 0;
		for (let row = 1; row < n; row++) {
			if (dna[row-1][col] == dna[row][col]) {
				count++;
				if (count == (config.minOccurrences - 1)) {
					countMatch++;
					count = 0;
					row++;
				}
			} else {
				count = 0;
			}
		}
	}
	
	return countMatch;
};


const findDiagonalRightMatch = (dna) => {
	let n = dna.length, 
		countMatch = 0, 
		limit = n - config.minOccurrences, 
		_n = n-1;

	for (let i = -limit; i <= limit; i++) {
		let count = 0, 
			_i = Math.abs(i);
		
		for(let j=1; j <= ((n-1) - _i); j++) {
			let _j = j-1;
			if (i <= 0) {
				if ( dna[ _i + _j ][ _j ] == dna[ _i + j ][ j ] ) {
					count++;
					if (count == (config.minOccurrences - 1)) {
						countMatch++;
						count = 0;
						j++;
					}
				} else {
					count = 0;
				}
			} else {
				if ( dna[ _j ][ _i + _j ] == dna[ j ][ _i + j ] ) {
					count++;
					if (count == (config.minOccurrences - 1)) {
						countMatch++;
						count = 0; 
						j++;
					}
				} else {
					count = 0;
				}
			}
		}
	}

	return countMatch;
};

const findDiagonalLeftMatch = (dna) => {
	let n = dna.length, 
		countMatch = 0, 
		limit = n - config.minOccurrences
		_n = n-1;
	
	for (let i = -limit; i <= limit; i++) {
		let count = 0, 
			_i = Math.abs(i);
		
		for(let j=1; j <= (_n - _i); j++) {
			let _j = j-1;

			if (i >= 0) {
				if ( dna[ _j ][ (_n -_j) - _i ] == dna[ j ][ (_n-j) - _i ] ) {
					count++;
					if (count == (config.minOccurrences - 1)) {
						countMatch++;
						count = 0; 
						j++;
					}
				} else {
					count = 0;
				}
			} else {
				if ( dna[ _i + _j ][ _n - _j ] == dna[ _i + j ][ _n - j ] ) {
					count++;
					if (count == (config.minOccurrences - 1)) {
						countMatch++;
						count = 0; 
						j++;
					}
				} else {
					count = 0;
				}
			}
		}
	}

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

module.exports = {
	isMutant, 
	isValidDna, 
	findHorizontalMatch, 
	findVerticalMatch, 
	findDiagonalRightMatch, 
	findDiagonalLeftMatch
};