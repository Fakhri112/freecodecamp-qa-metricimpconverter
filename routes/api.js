"use strict";

const ConvertHandler = require("../controllers/convertHandler.js");

module.exports = function (app) {
	let convertHandler = new ConvertHandler();
	app.get("/api/convert", (req, res) => {
		let input = req.query.input;
		let initNum = convertHandler.getNum(input);
		let initUnit = convertHandler.getUnit(input);
		let returnUnit = convertHandler.getReturnUnit(initUnit);
		let returnNum = convertHandler.convert(initNum, initUnit);
		let string = convertHandler.getString(
			initNum,
			initUnit,
			returnNum,
			returnUnit,
		);

		if ((!returnUnit || !initUnit) && !initNum) {
			return res.send("invalid number and unit");
		}
		if (!initNum) return res.send("invalid number");
		if (!returnUnit || !initUnit) return res.send("invalid unit");

		return res.json({
			initNum,
			initUnit,
			returnUnit,
			returnNum,
			string,
		});
	});
};
