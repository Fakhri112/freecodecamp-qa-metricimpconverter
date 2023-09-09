function ConvertHandler() {
	function noNumber(unit) {
		if (!unit.match(/\d/g)) return (unit = "1" + unit);
		return unit;
	}

	this.getNum = function (input) {
		const REGEX_GET_NUM =
			/(\d+(\.)?\d+(\/)\d+(\.)?\d+)|(\d+(\.)?\d+(\/)\d+)|(\d+(\/)\d+(\.)?\d+)|(?<![/])\d+(\/)\d+(?![/])|(?<![/])(\d+(\.)?\d+)(?![/])|(?<![/])\d+(?![/])/g;
		const DETECT_DOUBLE = /^[^\/]*\/?[^\/]*$/;
		input = noNumber(input);
		let result;
		let getNum = REGEX_GET_NUM.exec(input);
		if (getNum == null || !DETECT_DOUBLE.test(input)) return false;
		let detectSlash = /(\d+\.\d+|\d+)\/(\d+\.\d+|\d+)/g.exec(getNum[0]);
		if (detectSlash) {
			result = detectSlash[1] / detectSlash[2];
			return result;
		}
		if (getNum[0].match(/(?<=\.)\d/)) return parseFloat(getNum[0]);
		return parseInt(getNum[0]);
	};

	this.getUnit = function (input) {
		input = noNumber(input);
		let result = input.toLowerCase().match(/(?<=\d)[a-z]+$/g);
		if (result == null) {
			return false;
		}
		result = result[0].toLowerCase() == "l" ? "L" : result[0].toLowerCase();
		return result;
	};

	this.getReturnUnit = function (initUnit) {
		if (!initUnit) return false;
		let unitObject = {
			kg: "lbs",
			L: "gal",
			km: "mi",
			gal: "L",
			lbs: "kg",
			mi: "km",
		};

		for (key in unitObject) {
			if (initUnit.toLowerCase() == key.toLowerCase()) {
				return (result = unitObject[key]);
			}
		}

		return false;
	};

	this.convert = function (initNum, initUnit) {
		if (!initUnit) return false;
		let result;
		let unitObject = {
			lbs: initNum * 0.453592,
			gal: initNum * 3.78541,
			mi: initNum * 1.60934,
			kg: initNum / 0.453592,
			L: initNum / 3.78541,
			km: initNum / 1.60934,
		};
		for (key in unitObject) {
			if (initUnit.toLowerCase() == key.toLowerCase()) {
				result = Number(unitObject[key].toFixed(5));
				break;
			}
		}
		return result;
	};

	this.getString = function (initNum, initUnit, returnNum, returnUnit) {
		if (!initUnit) return false;
		let result;
		let unitObject = {
			kg: "pounds",
			L: "liters",
			km: "kilometers",
			gal: "gallons",
			lbs: "kilograms",
			mi: "miles",
		};
		result = `${initNum} ${unitObject[initUnit]} converts to ${returnNum} ${unitObject[returnUnit]}`;
		return result;
	};
}

module.exports = ConvertHandler;
