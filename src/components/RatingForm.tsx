import * as React from "react";
import * as ReactDOM from "react-dom";

import ratingCalc, {LoanState} from "../functions/RatingCalculator";

interface LabelProps {label: string}

export default class RatingForm extends React.Component<LabelProps, LoanState> {

    constructor(props: LabelProps) {
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

    formChanged(event: any) {
        const target = event.target;
        const name = target.name;
        let rating = target.value;
 
        let formValues = {...this.state, [name]: rating};
        
        // default value (clear previous state)
        this.setState(new LoanState(rating, 0, 0, 0, true));

        ratingCalc(
            rating, 
            (loan: LoanState) => this.setState(loan), 
            (err: string) => {
                this.setState(new LoanState(rating)); 
                alert(err);
            })
    }  

    render() {

        let avg = (this.state.inProcess) ? 'zpracovává se...' : this.state.avgLoan.toLocaleString('cs-CZ', { maximumFractionDigits: 0 }) + ' kč';

        const count = this.state.numOfCust;

        return (

            <div>
                <h1>{this.props.label}</h1>                

                <fieldset>
                    <div className="row">                        
                        <div className="col-md-6">
                            <div className="styled-select slate">                     
                                <select onChange={this.formChanged} id="rating" name="rating" value={this.state.rating}>
                                    <option value="" disabled>Vyber rating</option>
                                    <option value="AAAAA">A**  téměř bez rizika</option>
                                    <option value="AAAA">A*   nejnižší riziko</option>
                                    <option value="AAA">A++  nízké riziko</option>
                                    <option value="AA">A+   nízké riziko</option>
                                    <option value="A">A    nižší riziko</option>
                                    <option value="B">B    střední riziko</option>
                                    <option value="C">C    vyšší riziko</option>
                                    <option value="D">D    rizikové</option>
                                </select>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <h3>Průměrná výše půjčky: {avg}</h3>
                        </div>
                    </div>
                </fieldset> 
            </div>
         
        );    
    }    
}