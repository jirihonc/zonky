'use strict';
import calculateLoan, {LoanState, ZonkyLoan} from "../src/functions/RatingCalculator";

describe('addition', function () {
  it('should add 1+2 correctly', function (done) {
    var onePlusOne = 1 + 2;
   
    // rating: string, data : ZonkyLoan[]
    // ZonkyLoan[]
    var data = [
        {}
    ]; 

    calculateLoan("AAAAA");

    onePlusOne.should.equal(3);
    // must call done() so that mocha know that we are... done.
    // Useful for async tests.
    done();
  });
});