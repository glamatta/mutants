const assert = require('assert');
const dnas = require("./dna");
const identifier = require('../controllers/mutanIdentifier');
require('../lib/dnaLog');

describe("Pruebas del algoritmo de detección", function() {
  console.log(`#### ${new Date()} ####\n\nData to test:`);
  Object.keys(dnas).forEach(function(key) {
    console.log(key);
    console.dnaToTable(dnas[key].dna);
  });

  describe("Análisis Horizontal", function() {
    
    it("dna1: Debe encontrar 0 match", function() {
      let matches = identifier.findHorizontalMatch(dnas.d1.dna);
      assert.equal(matches, 0);
    });

    it("dna2: Debe encontrar 1 match", function() {
      let matches = identifier.findHorizontalMatch(dnas.d2.dna);
      assert.equal(matches, 1);
    });

    it("dna3: Debe encontrar 3 matches", function() {
      let matches = identifier.findHorizontalMatch(dnas.d3.dna);
      assert.equal(matches, 3);
    });

    it("dna4: Debe encontrar 4 matches", function() {
      let matches = identifier.findHorizontalMatch(dnas.d4.dna);
      assert.equal(matches, 4);
    });

    it("dna5: Debe encontrar 16 matches", function() {
      let matches = identifier.findHorizontalMatch(dnas.d5.dna);
      assert.equal(matches, 16);
    });

    it("dna6: Debe encontrar 3 matches", function() {
      let matches = identifier.findHorizontalMatch(dnas.d6.dna);
      assert.equal(matches, 3);
    });

    it("dna13: Debe encontrar 0 match", function() {
      let matches = identifier.findHorizontalMatch(dnas.d13.dna);
      assert.equal(matches, 0);
    });

    it("dna14: Debe encontrar 0 match", function() {
      let matches = identifier.findHorizontalMatch(dnas.d14.dna);
      assert.equal(matches, 0);
    });

  });

  describe("Análisis Vertical", function() {
    
    it("dna1: Debe encontrar 0 match", function() {
      let matches = identifier.findVerticalMatch(dnas.d1.dna);
      assert.equal(matches, 0);
    });

    it("dna2: Debe encontrar 1 match", function() {
      let matches = identifier.findVerticalMatch(dnas.d2.dna);
      assert.equal(matches, 1);
    });

    it("dna3: Debe encontrar 2 matches", function() {
      let matches = identifier.findVerticalMatch(dnas.d3.dna);
      assert.equal(matches, 2);
    });

    it("dna4: Debe encontrar 4 matches", function() {
      let matches = identifier.findVerticalMatch(dnas.d4.dna);
      assert.equal(matches, 4);
    });

    it("dna5: Debe encontrar 16 matches", function() {
      let matches = identifier.findVerticalMatch(dnas.d5.dna);
      assert.equal(matches, 16);
    });

    it("dna6: Debe encontrar 4 matches", function() {
      let matches = identifier.findVerticalMatch(dnas.d6.dna);
      assert.equal(matches, 4);
    });

    it("dna13: Debe encontrar 0 match", function() {
      let matches = identifier.findVerticalMatch(dnas.d13.dna);
      assert.equal(matches, 0);
    });

    it("dna14: Debe encontrar 0 match", function() {
      let matches = identifier.findVerticalMatch(dnas.d14.dna);
      assert.equal(matches, 0);
    });

  });

  describe("Análisis Diagonal Derecha", function() {
    
    it("dna1: Debe encontrar 0 match", function() {
      let matches = identifier.findDiagonalRightMatch(dnas.d1.dna);
      assert.equal(matches, 0);
    });

    it("dna2: Debe encontrar 1 match", function() {
      let matches = identifier.findDiagonalRightMatch(dnas.d2.dna);
      assert.equal(matches, 1);
    });

    it("dna3: Debe encontrar 1 match", function() {
      let matches = identifier.findDiagonalRightMatch(dnas.d3.dna);
      assert.equal(matches, 1);
    });

    it("dna4: Debe encontrar 1 match", function() {
      let matches = identifier.findDiagonalRightMatch(dnas.d4.dna);
      assert.equal(matches, 1);
    });

    it("dna5: Debe encontrar 10 matches", function() {
      let matches = identifier.findDiagonalRightMatch(dnas.d5.dna);
      assert.equal(matches, 10);
    });

    it("dna6: Debe encontrar 3 matches", function() {
      let matches = identifier.findDiagonalRightMatch(dnas.d6.dna);
      assert.equal(matches, 3);
    });

    it("dna13: Debe encontrar 1 match", function() {
      let matches = identifier.findDiagonalRightMatch(dnas.d13.dna);
      assert.equal(matches, 1);
    });

    it("dna14: Debe encontrar 1 match", function() {
      let matches = identifier.findDiagonalRightMatch(dnas.d14.dna);
      assert.equal(matches, 1);
    });

  });

  describe("Análisis Diagonal Izquierda", function() {
    
    it("dna1: Debe encontrar 0 match", function() {
      let matches = identifier.findDiagonalLeftMatch(dnas.d1.dna);
      assert.equal(matches, 0);
    });

    it("dna2: Debe encontrar 0 match", function() {
      let matches = identifier.findDiagonalLeftMatch(dnas.d2.dna);
      assert.equal(matches, 0);
    });

    it("dna3: Debe encontrar 1 match", function() {
      let matches = identifier.findDiagonalLeftMatch(dnas.d3.dna);
      assert.equal(matches, 1);
    });

    it("dna4: Debe encontrar 1 match", function() {
      let matches = identifier.findDiagonalLeftMatch(dnas.d4.dna);
      assert.equal(matches, 1);
    });

    it("dna5: Debe encontrar 10 matches", function() {
      let matches = identifier.findDiagonalLeftMatch(dnas.d5.dna);
      assert.equal(matches, 10);
    });

    it("dna6: Debe encontrar 5 matches", function() {
      let matches = identifier.findDiagonalLeftMatch(dnas.d6.dna);
      assert.equal(matches, 5);
    });

    it("dna13: Debe encontrar 0 match", function() {
      let matches = identifier.findDiagonalLeftMatch(dnas.d13.dna);
      assert.equal(matches, 0);
    });

    it("dna14: Debe encontrar 1 match", function() {
      let matches = identifier.findDiagonalLeftMatch(dnas.d14.dna);
      assert.equal(matches, 1);
    });

  });

});