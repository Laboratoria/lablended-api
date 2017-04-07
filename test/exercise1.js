var assert = require("assert");

describe("Pruebas Unitarias", function () {
	it("Algunos_elementos_duplicados", function() {
		// Failure message:
		// Existen algunos elementos duplicados
		assert.deepEqual([3,4,5,6,7], naiveSet([3,4,3,4,5,6,7]));
	});

	it("Todos_los_elementos_iguales", function() {
		// Failure message:
		// Debe retornar 1 elemento en el arreglo
		assert.deepEqual(1, naiveSet([1,1,1,1,1]));
	});

	it("Elementos_vacios", function() {
		// Failure message:
		// Cuando el arreglo de entrada esta vacio debe retornar un arreglo vacio tambien
		assert.deepEqual([], naiveSet([]));
	});
	it("Todos_los_elementos_son_distintos", function() {
		// Failure message:
		// Todos los elementos de este arreglo son diferentes
		assert.deepEqual([1,2,3,4,5], naiveSet([1,2,3,4,5]));
	});
});
