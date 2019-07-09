const express = require('express');
const path = require('path');
const app = express();
const {Firestore} = require('@google-cloud/firestore');
const config = require('./config.json');
const identifier = require('./controllers/mutanIdentifier');
const data = require('./test/dna');

const firestore = new Firestore();
const db = new Firestore({
  projectId: 'mutants-246102',
  keyFilename: 'C:\\DEV\\keys\\mutants-4f181f170813.json',
});

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/mutant', (req, res) => {
	let dna = req.body.dna;
	let addedDna = db.collection('dna').add({
	  addedAt: new Date(),
	  data: JSON.stringify(req.body)
	}).then(ref => {
	  console.log('Added document with ID: ', ref.id);
	});
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

app.get('/stats', (req, res) => {
	res.send( JSON.stringify({count_mutant_dna: 40, count_human_dna: 100, ratio: 0.4}) );
});

const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});