console.dnaToTable = dna => {
	let outDna = [];
	dna.forEach( item => outDna.push(Object.assign({},item))	);
	console.table(outDna);
};
module.exports = {}