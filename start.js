const express = require('express');
const app = express();
const config = require('./config.json');
const identifier = require('./controllers/mutanIdentifier');
const data = require('./test/dna');

app.use(express.json());

app.post('/mutant', (req, res) => {
	let dna = req.body.dna;
	let count = 0;
	count += identifier.findHorizontalMatch(dna);
	count += identifier.findVerticalMatch(dna);
	count += identifier.findDiagonalRightMatch(dna);
	count += identifier.findDiagonalLeftMatch(dna);

	if (count >= config.minMatchesQuantity) {
		res.status(200).send({"isMutant": true, "message": count + " matches"});
	} else{
		res.status(403).send({"isMutant": false, "message": "" + count + " matches"});
	}
});

app.listen(config.port, () => console.log(`app listening on port ${config.port}!`));
