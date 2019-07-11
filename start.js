const express = require('express');
const path = require('path');
const app = express();
const {Firestore} = require('@google-cloud/firestore');
const config = require('./config.json');
const identifier = require('./controllers/mutanIdentifier');
const data = require('./test/dna');

const db = new Firestore(config.dbConnection);

const dnaCollection = db.collection('dna');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/mutant', (req, res) => {
	let dna = req.body.dna;
	let count = 0;
	count += identifier.findHorizontalMatch(dna);
	count += identifier.findVerticalMatch(dna);
	count += identifier.findDiagonalRightMatch(dna);
	count += identifier.findDiagonalLeftMatch(dna);

	let isMutant = count >= config.minMatchesQuantity ? true : false;
	let statusCode = isMutant ? 200 : 403;
	res.status(statusCode).json({"isMutant": isMutant, "message": count + " matches"});

	let dnaItem = {
	  addedAt: new Date(),
	  data: JSON.stringify(req.body),
	  isMutant: isMutant
	};

	dnaCollection.where('data', '==', dnaItem.data).get().then(
		snapshot => { if (snapshot.empty) dnaCollection.add(dnaItem) }
	);
});

app.get('/stats', (req, res) => {
	let countMutant = 0, countHuman = 0;

	dnaCollection.where('isMutant', '==', true).get()
	.then(snap => countMutant = snap.size)
	.then(() => {
		dnaCollection.where('isMutant', '==', false).get()
		.then(snap => countHuman = snap.size)
		.then(() => {
			res.json({
				count_mutant_dna: countMutant, 
				count_human_dna: countHuman, 
				ratio: (countMutant / (countMutant + countHuman))
			});
		}).catch(error => console.error("db error: ", error));
	}).catch(error => console.error("db error: ", error));
});

const PORT = process.env.PORT || config.defaultPort;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}...`));