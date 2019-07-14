const dnas = require('./dna');
const identifier = require('../controllers/mutanIdentifier');

// identifier.findHorizontalMatch(dnas.d5.dna);
// identifier.findVerticalMatch(dnas.d6.dna);
// identifier.findDiagonalRightMatch(dnas.d5.dna);
identifier.findDiagonalLeftMatch(dnas.d5.dna);