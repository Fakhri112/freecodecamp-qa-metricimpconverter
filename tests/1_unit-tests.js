const chai = require("chai");
let assert = chai.assert;
const ConvertHandler = require("../controllers/convertHandler.js");

let convertHandler = new ConvertHandler();

suite("Unit Tests", function () {
	test("convertHandler should correctly read a whole number input.", (done) => {
		assert.equal(convertHandler.getNum("231gal"), 231);
		done();
	});
	test("convertHandler should correctly read a decimal number input.", (done) => {
		assert.equal(convertHandler.getNum("23.12gal"), 23.12);
		done();
	});
	test("convertHandler should correctly read a fractional input.", (done) => {
		assert.equal(convertHandler.getNum("22/11gal"), 2);
		done();
	});
	test("convertHandler should correctly read a fractional input with a decimal.", (done) => {
		assert.equal(convertHandler.getNum("22.5/12gal"), 1.875);
		done();
	});
	test("convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3).", (done) => {
		assert.equal(convertHandler.getNum("3/2/37gal"), false);
		done();
	});
	test("convertHandler should correctly default to a numerical input of 1 when no numerical input is provided.", (done) => {
		assert.equal(convertHandler.getNum("mi"), 1);
		done();
	});
	test("convertHandler should correctly read each valid input unit.", (done) => {
		assert.equal(convertHandler.getUnit("2lbs"), "lbs");
		done();
	});
	test("convertHandler should correctly return an error for an invalid input unit.", (done) => {
		assert.equal(convertHandler.getUnit("2lbs[]"), false);
		done();
	});
	test("convertHandler should return the correct return unit for each valid input unit.", (done) => {
		assert.equal(convertHandler.getReturnUnit("gal"), "L");
		done();
	});
	test("convertHandler should correctly return the spelled-out string unit for each valid input unit.", (done) => {
		assert.equal(
			convertHandler.getString(6, "mi", 9.65604, "km"),
			"6 miles converts to 9.65604 kilometers",
		);
		done();
	});
	test("convertHandler should correctly convert gal to L.", (done) => {
		let initNum = convertHandler.getNum("53/5gal");
		let initUnit = convertHandler.getUnit("53/5gal");
		let returnUnit = convertHandler.getReturnUnit(initUnit);
		let returnNum = convertHandler.convert(initNum, initUnit);
		assert.equal(returnUnit, "L");
		assert.equal(returnNum, 40.12535);
		done();
	});
	test("convertHandler should correctly convert L to gal.", (done) => {
		let initNum = convertHandler.getNum("3.5/2l");
		let initUnit = convertHandler.getUnit("3.5/2l");
		let returnUnit = convertHandler.getReturnUnit(initUnit);
		let returnNum = convertHandler.convert(initNum, initUnit);
		assert.equal(returnUnit, "gal");
		assert.equal(returnNum, 0.4623);
		done();
	});
	test("convertHandler should correctly convert mi to km.", (done) => {
		let initNum = convertHandler.getNum("32.72mi");
		let initUnit = convertHandler.getUnit("32.72mi");
		let returnUnit = convertHandler.getReturnUnit(initUnit);
		let returnNum = convertHandler.convert(initNum, initUnit);
		assert.equal(returnUnit, "km");
		assert.equal(returnNum, 52.6576);
		done();
	});
	test("convertHandler should correctly convert km to mi.", (done) => {
		let initNum = convertHandler.getNum("20/2.5km");
		let initUnit = convertHandler.getUnit("20/2.5km");
		let returnUnit = convertHandler.getReturnUnit(initUnit);
		let returnNum = convertHandler.convert(initNum, initUnit);
		assert.equal(returnUnit, "mi");
		assert.equal(returnNum, 4.97098);
		done();
	});
	test("convertHandler should correctly convert lbs to kg.", (done) => {
		let initNum = convertHandler.getNum("22.7/3.14lbs");
		let initUnit = convertHandler.getUnit("22.7/3.14lbs");
		let returnUnit = convertHandler.getReturnUnit(initUnit);
		let returnNum = convertHandler.convert(initNum, initUnit);
		assert.equal(returnUnit, "kg");
		assert.equal(returnNum, 3.27915);
		done();
	});
	test("convertHandler should correctly convert kg to lbs.", (done) => {
		let initNum = convertHandler.getNum("45/3kg");
		let initUnit = convertHandler.getUnit("45/3kg");
		let returnUnit = convertHandler.getReturnUnit(initUnit);
		let returnNum = convertHandler.convert(initNum, initUnit);
		assert.equal(returnUnit, "lbs");
		assert.equal(returnNum, 33.06937);
		done();
	});
});
