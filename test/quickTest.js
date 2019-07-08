const identifier = require('../controllers/mutanIdentifier');
const data = require('./dna');

let testData = data.d3.dna;

var cantHor = identifier.findHorizontalMatch(testData);
var cantVer = identifier.findVerticalMatch(testData);
var cantDR = identifier.findDiagonalRightMatch(testData);
var cantDL = identifier.findDiagonalLeftMatch(testData);

console.info ("\n\n****************************************************************************\n\n");

for (let i = 0; i < testData.length; i++) {
	let out = "";
	for (let j = 0; j < testData[i].length; j++) {
		out += testData[i][j] + "  ";
	}
	console.info (out);
}

console.info("\n\nHORIZONTALES: ", cantHor);
console.info("VERTICALES: ", cantVer);
console.info("DIAGONAL DERECHA: ", cantDR);
console.info("DIAGONAL IZQUIERDA: ", cantDL);
