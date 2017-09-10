"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const RatingCalculator_1 = require("../functions/RatingCalculator");
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
        let rating = target.value;
        let formValues = Object.assign({}, this.state, { [name]: rating });
        // default value (clear previous state)
        this.setState(new RatingCalculator_1.LoanState(rating, 0, 0, 0, true));
        RatingCalculator_1.default(rating, (loan) => this.setState(loan), (err) => {
            this.setState(new RatingCalculator_1.LoanState(rating));
            alert(err);
        });
    }
    render() {
        let avg = (this.state.inProcess) ? 'zpracovává se...' : this.state.avgLoan.toLocaleString('cs-CZ', { maximumFractionDigits: 0 }) + ' kč';
        const count = this.state.numOfCust;
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
//# sourceMappingURL=RatingForm.js.map