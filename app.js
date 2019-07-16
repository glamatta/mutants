const fs = require('fs');
const express = require('express');
const path = require('path');
const app = express();
const {Firestore} = require('@google-cloud/firestore');
const config = require('./config.json');
const identifier = require('./controllers/mutanIdentifier');
const showdown = require('showdown');
const converter = new showdown.Converter({emoji: true, tables: true});

const db = new Firestore();

const dnaCollection = db.collection('dna');

app.use(express.json());
app.set('view engine', 'pug');
app.set("views", path.join(__dirname, "views"));

// publicar resultado HTML de Code Coverage
app.use('/coverage', express.static(path.join(__dirname, 'coverage')));

// publicar archivos de recursos web
app.use('/files', express.static(path.join(__dirname, 'public/resources')));

// publicar documentación
app.use('/doc', (req, res) => {
  fs.readFile(__dirname + '/public/doc' + req.path, 'utf-8', function(err, data) {
    if (err) res.status(404).render("notFound", { title: req.path });
    if ('md' == req.path.split('.').pop()) {
    	res.render("markdown", {
	        title: req.path,
	        content: converter.makeHtml(data)
	    });
    } else {
	    res.send(data);
    }
  });
});

app.get('/', (req, res) => res.redirect('/doc/index.md'));

// publicar servicio de consulta de DNA
app.post('/mutant', (req, res) => {
	if (req.hasOwnProperty('body') && req.body.hasOwnProperty('dna') && req.body['dna'] && identifier.isValidDna(req.body.dna)) {
		let dna = req.body.dna;
		let isMutant = identifier.isMutant(dna);
		let statusCode = isMutant ? 200 : 403;
		res.status(statusCode).json({"isMutant": isMutant});

		if (process.env.NODE_ENV != 'test') {
			let dnaItem = {
			  addedAt: new Date(),
			  data: JSON.stringify(req.body),
			  isMutant: isMutant
			};
		
			dnaCollection.where('data', '==', dnaItem.data).get().then(
				snapshot => { if (snapshot.empty) dnaCollection.add(dnaItem) }
			);
		}

	} else {
		res.status(400).json({"code": 400, "message": "Bad Request"});
	}
});

// publicar servicio de estadísticas 
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

// Ejecutar el servidor
app.runningServer = app.listen(process.env.PORT || config.defaultPort);

module.exports = app;