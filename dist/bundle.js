/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = React;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(0);
const ReactDOM = __webpack_require__(2);
const RatingForm_1 = __webpack_require__(3);
ReactDOM.render(React.createElement(RatingForm_1.default, { label: "Zonky, výpočet průměrné půjčky v závislosti na ratingu" }), document.getElementById("content"));


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = ReactDOM;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(0);
const RatingCalculator_1 = __webpack_require__(4);
class RatingForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rating: '',
            numOfCust: 0,
            avgLoan: 0,
            totalLoan: 0,
            inProcess: false
        };
        this.formChanged = this.formChanged.bind(this);
    }
    formChanged(event) {
        const target = event.target;
        const name = target.name;
        let formValues = Object.assign({}, this.state, { [name]: target.value });
        RatingCalculator_1.default(target.value, this);
        // console.log('avg: ' + loan.avgLoan);       
        // let loan = new LoanState('',0,0,0,false);
        // this.setState(loan); 
    }
    render() {
        // let avg = this.state.avgLoan.toFixed(2);
        let avg = (this.state.inProcess) ? 'zpracovává se...' : this.state.avgLoan.toLocaleString('cs-CZ', { maximumFractionDigits: 0 }) + ' kč';
        const count = this.state.numOfCust;
        // console.log('rendered avg: ' + avg);    
        return (React.createElement("div", null,
            React.createElement("h1", null, this.props.label),
            React.createElement("fieldset", null,
                React.createElement("div", { className: "row" },
                    React.createElement("div", { className: "col-md-6" },
                        React.createElement("div", { className: "styled-select slate" },
                            React.createElement("select", { onChange: this.formChanged, id: "rating", name: "rating", value: this.state.rating },
                                React.createElement("option", { value: "", disabled: true }, "Vyber rating"),
                                React.createElement("option", { value: "AAAAA" }, "A**  t\u00E9m\u011B\u0159 bez rizika"),
                                React.createElement("option", { value: "AAAA" }, "A*   nejni\u017E\u0161\u00ED riziko"),
                                React.createElement("option", { value: "AAA" }, "A++  n\u00EDzk\u00E9 riziko"),
                                React.createElement("option", { value: "AA" }, "A+   n\u00EDzk\u00E9 riziko"),
                                React.createElement("option", { value: "A" }, "A    ni\u017E\u0161\u00ED riziko"),
                                React.createElement("option", { value: "B" }, "B    st\u0159edn\u00ED riziko"),
                                React.createElement("option", { value: "C" }, "C    vy\u0161\u0161\u00ED riziko"),
                                React.createElement("option", { value: "D" }, "D    rizikov\u00E9")))),
                    React.createElement("div", { className: "col-md-6" },
                        React.createElement("h3", null,
                            "Pr\u016Fm\u011Brn\u00E1 v\u00FD\u0161e p\u016Fj\u010Dky: ",
                            avg))))));
    }
}
exports.default = RatingForm;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

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
function marketplace(rating, caller) {
    // https://www.thepolyglotdeveloper.com/2014/08/bypass-cors-errors-testing-apis-locally/
    // https://api.zonky.cz/loans/marketplace?rating__eq=D
    console.log('init rating: ' + rating);
    caller.setState(new LoanState(rating, 0, 0, 0, true));
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
                caller.setState(loan);
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
        caller.setState(new LoanState(rating));
        alert("Network connection problem");
    };
    request.send();
}
function default_1(rating, caller) {
    console.log('selected rating: ' + rating);
    // auth();
    marketplace(rating, caller);
}
exports.default = default_1;
function calculateLoan(rating, data) {
    let count = 0;
    let total = data.reduce(function (sum, user, index) {
        count = index + 1;
        return sum + user.amount;
    }, 0);
    console.log('Number of loans: ' + count);
    // console.log('Avg loan is ' + (sum / count));
    return new LoanState(rating, count, (total / count), total, false);
}


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map