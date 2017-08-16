
export class LoanState {

    rating: string;
    numOfCust: number;
    avgLoan: number;
    totalLoan: number;

    constructor(rating: string, numOfCust: number, avgLoan: number, totalLoan: number) {
        this.rating = rating;
        this.numOfCust = numOfCust;
        this.avgLoan = avgLoan;
        this.totalLoan = totalLoan;
    } 
} 

export default function (rating: string): LoanState {
    
    console.log('selected rating: ' + rating);   
    
    // Rating: 
    // A**  téměř bez rizika
    // A*   nejnižší riziko
    // A++  nízké riziko        
    // A+   nízké riziko
    // A    nižší riziko
    // B    střední riziko
    // C    vyšší riziko
    // D    rizikové

    let loan: LoanState;
    switch(rating) {
        case "A**": loan = new LoanState(rating, 10, 50000, 500000); break;
        case "A*": loan = new LoanState(rating, 50, 40000, 4000000); break;
        case "A++": loan = new LoanState(rating, 30, 60000, 6000000); break;
        case "A+": loan = new LoanState(rating, 500, 40000, 7000000); break;
        case "A": loan = new LoanState(rating, 60, 70000, 8000000); break;
        case "B": loan = new LoanState(rating, 70, 80000, 4000000); break;
        case "C": loan = new LoanState(rating, 20, 500, 3000000); break;
        case "D": loan = new LoanState(rating, 30, 3000, 2000000); break;
        default: loan = new LoanState('', 0, 0, 0);
    }


    return  loan;  
} 