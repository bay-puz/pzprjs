// test/answer_test.js

var assert = require("assert");

var pzpr = require("../../dist/js/pzpr.js");

var testdata = require("../load_testdata.js");

pzpr.variety.each(function(pid) {
	describe(pid + " answer test", function() {
		describe("Answer check", function() {
			var puzzle = new pzpr.Puzzle();
			puzzle.setConfig("forceallcell", true);
			testdata[pid].failcheck.forEach(function(testcase) {
				it("Check: " + testcase[0], function() {
					puzzle.open(testcase[1]);
					var failcode = puzzle.check(true);
					var failcodePassive = puzzle.check(false);
					assert.equal(failcode[0], testcase[0]);
					assert.equal(!!failcode[0], !!failcodePassive[0]);
					if (testcase.length > 2 && "undecided" in testcase[2]) {
						assert.equal(failcode.undecided, testcase[2].undecided);
					}
					assert.notEqual(failcode.gettext("en"), pzpr.failcodes.en.invalid);
				});
			});
		});
	});
});
