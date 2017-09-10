"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class LoanState {
    constructor(rating, numOfCust = 0, avgLoan = 0, totalLoan = 0, inProcess = false) {
        this.rating = rating;
        this.numOfCust = numOfCust;
        this.avgLoan = avgLoan;
        this.totalLoan = totalLoan;
        this.inProcess = inProcess;
    }
}
exports.LoanState = LoanState;
function auth() {
    var request = new XMLHttpRequest();
    request.open('POST', 'https://api.zonky.cz/oauth/token', true);
    // request.withCredentials = true;
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    request.setRequestHeader('Authorization', 'Basic d2ViOndlYg==');
    request.onreadystatechange = function () {
        if (this.readyState === 4) {
            console.log('Status:', this.status);
            console.log('Headers:', this.getAllResponseHeaders());
            console.log('Body:', this.responseText);
        }
    };
    request.onerror = function (ev) {
        console.log('err:', this);
        console.log('event:', ev);
    };
    var body = "username=test&password=test&grant_type=password&scope=SCOPE_APP_WEB";
    request.send(body);
    return "done";
}
function default_1(rating, updateLoanResult, errorResult) {
    console.log('selected rating: ' + rating);
    // https://www.thepolyglotdeveloper.com/2014/08/bypass-cors-errors-testing-apis-locally/
    // https://api.zonky.cz/loans/marketplace?rating__eq=D
    var request = new XMLHttpRequest();
    request.open('GET', 'https://api.zonky.cz/loans/marketplace?rating__eq=' + rating);
    request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    request.setRequestHeader('Accept', 'application/json');
    // https://crossorigin.me/
    request.setRequestHeader('X-Page', '0');
    request.setRequestHeader('X-Size', '3000');
    request.onreadystatechange = function () {
        if (this.readyState === 4) {
            let totalCount = this.getResponseHeader('X-Total');
            console.log("total count: " + totalCount);
            if (this.responseText && this.responseText.startsWith("[")) {
                const data = JSON.parse(this.responseText);
                let loan = calculateLoan(rating, data);
                updateLoanResult(loan);
            }
            else {
                console.log('No response');
                console.log(this.responseText);
            }
        }
    };
    request.onerror = function (ev) {
        console.log('err:', this);
        console.log('event:', ev);
        errorResult("Network connection problem: " + ev.type);
    };
    request.send();
}
exports.default = default_1;
function calculateLoan(rating, data) {
    let count = data.length;
    let total = data.reduce(function (sum, user, index) {
        return sum + user.amount;
    }, 0);
    console.log('Number of loans: ' + count);
    // console.log('Avg loan is ' + (sum / count));
    return new LoanState(rating, count, (total / count), total, false);
}
exports.calculateLoan = calculateLoan;
//# sourceMappingURL=RatingCalculator.js.map