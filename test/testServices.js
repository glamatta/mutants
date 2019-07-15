const dnas = require("./dna");
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

process.env.NODE_ENV = 'test';

chai.use(chaiHttp);

describe('Pruebas de servicios REST', () => {
	const server = require('../app');
	
	describe('/GET stats', () => {
		it('Debe entragar estadísiticas de DB en gcloud_firestore', (done) => {
			chai.request(server)
			.get('/stats')
			.end((err, res) => {
				res.should.have.status(200);
				res.should.have.header('content-type', 'application/json; charset=utf-8');
				res.body.should.have.property('count_mutant_dna');
				done();
			});
		});
	});

	describe('/POST mutant', () => {
		it('dna1: Debe responder No-mutant > code 403', (done) => {
			chai.request(server)
			.post('/mutant')
			.send(dnas.d1)
			.end((err, res) => {
				res.should.have.status(403);
				done();
			});
		});

		it('dna2: Debe responder Mutant > code 200', (done) => {
			chai.request(server)
			.post('/mutant')
			.send(dnas.d2)
			.end((err, res) => {
				res.should.have.status(200);
				done();
			});
		});

		it('dna3: Debe responder Mutant > code 200', (done) => {
			chai.request(server)
			.post('/mutant')
			.send(dnas.d3)
			.end((err, res) => {
				res.should.have.status(200);
				done();
			});
		});

		it('dna4: Debe responder Mutant > code 200', (done) => {
			chai.request(server)
			.post('/mutant')
			.send(dnas.d4)
			.end((err, res) => {
				res.should.have.status(200);
				done();
			});
		});

		it('dna5: Debe responder Mutant > code 200', (done) => {
			chai.request(server)
			.post('/mutant')
			.send(dnas.d5)
			.end((err, res) => {
				res.should.have.status(200);
				done();
			});
		});

		it('dna6: Debe responder Mutant > code 200', (done) => {
			chai.request(server)
			.post('/mutant')
			.send(dnas.d6)
			.end((err, res) => {
				res.should.have.status(200);
				done();
			});
		});

		it('dna7: Debe responder Bad Request > code 400', (done) => {
			chai.request(server)
			.post('/mutant')
			.send(dnas.d7)
			.end((err, res) => {
				res.should.have.status(400);
				done();
			});
		});

		it('dna8: Debe responder Bad Request > code 400', (done) => {
			chai.request(server)
			.post('/mutant')
			.send(dnas.d8)
			.end((err, res) => {
				res.should.have.status(400);
				done();
			});
		});

		it('dna9: Debe responder Bad Request > code 400', (done) => {
			chai.request(server)
			.post('/mutant')
			.send(dnas.d9)
			.end((err, res) => {
				res.should.have.status(400);
				done();
			});
		});

		it('dna10: Debe responder Bad Request > code 400', (done) => {
			chai.request(server)
			.post('/mutant')
			.send(dnas.d10)
			.end((err, res) => {
				res.should.have.status(400);
				done();
			});
		});

		it('dna11: Debe responder Bad Request > code 400', (done) => {
			chai.request(server)
			.post('/mutant')
			.send(dnas.d11)
			.end((err, res) => {
				res.should.have.status(400);
				done();
			});
		});

		it('dna12: Debe responder Bad Request > code 400', (done) => {
			chai.request(server)
			.post('/mutant')
			.send(dnas.d12)
			.end((err, res) => {
				res.should.have.status(400);
				done();
			});
		});

		it('dna13: Debe responder No-mutant > code 403', (done) => {
			chai.request(server)
			.post('/mutant')
			.send(dnas.d13)
			.end((err, res) => {
				res.should.have.status(403);
				done();
			});
		});

		it('dna14: Debe responder Mutant > code 200', (done) => {
			chai.request(server)
			.post('/mutant')
			.send(dnas.d14)
			.end((err, res) => {
				res.should.have.status(200);
				done();
			});
		});


	});

	after(()=>{
		server.runningServer.close();
	});
});

describe('Pruebas de documentación', () => {
	const server = require('../app');
	
	describe('/GET Home', () => {
		it('Debe responder un HTML para el home de la documentación', (done) => {
			chai.request(server)
			.get('/')
			.end((err, res) => {
				res.should.have.status(200);
				done();
			});
		});
	});

	after(()=>{
		server.runningServer.close();
	});
});