import { suite, test, slow, timeout } from "mocha-typescript";
import { assert } from "chai";
import calculateLoan, {LoanState, ZonkyLoan} from "../src/functions/RatingCalculator";

@suite class RatingTest {
    @test method() {
        assert.equal(1, 2, "Expected one to equal two.");
    }
}