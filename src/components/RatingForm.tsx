
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
            totalLoan: 0
        };

        this.formChanged = this.formChanged.bind(this);
    }

    formChanged(event: any) {
        const target = event.target;
        const name = target.name;
 
        let formValues = {...this.state, [name]: target.value};

        ratingCalc(target.value, this);

        // console.log('avg: ' + loan.avgLoan);       

        // this.setState(loan); 
    }  

    render() {

        const avg = this.state.avgLoan.toFixed(2);
        const count = this.state.numOfCust;

        console.log('rendered avg: ' + avg);    

        return (

            <div>
                <h2>{this.props.label}</h2>                

                <fieldset>
                    <div className="row">                        
                        <div className="col-md-12">
                                                    
                            <select onChange={this.formChanged} id="rating" name="rating" value={this.state.rating}>
                                <option value="" disabled>Vyber rating</option>
                                <option value="A**">A**  téměř bez rizika</option>
                                <option value="A*">A*   nejnižší riziko</option>
                                <option value="A++">A++  nízké riziko</option>
                                <option value="A+">A+   nízké riziko</option>
                                <option value="A">A    nižší riziko</option>
                                <option value="B">B    střední riziko</option>
                                <option value="C">C    vyšší riziko</option>
                                <option value="D">D    rizikové</option>
                            </select>
                            
                        </div>
                    </div>
                </fieldset> 

                <div className="row">                        
                    <div className="col-md-12">
                        <h4>Celkovy pocet pujcek: {count}</h4>
                    </div>
                </div>

                <div className="row">                        
                    <div className="col-md-12">
                        <h4>Prumerna vyse pujcky: {avg}</h4>
                    </div>
                </div>
            </div>
         
        );    
    }    
}