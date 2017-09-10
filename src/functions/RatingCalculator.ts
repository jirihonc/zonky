export class LoanState {

    rating: string;
    numOfCust: number;
    avgLoan: number;
    totalLoan: number;
    inProcess: boolean;

    constructor(rating: string, numOfCust: number = 0, avgLoan: number = 0, totalLoan: number = 0, inProcess: boolean = false) {
        this.rating = rating;
        this.numOfCust = numOfCust;
        this.avgLoan = avgLoan;
        this.totalLoan = totalLoan;
        this.inProcess = inProcess;
    } 
} 

interface ZonkyPic {
    name: string,
    url: string
}

export interface ZonkyLoan {
    id: number,
    url: string,
    name: string,
        story: string,
        purpose: string,
        photos: ZonkyPic[],
        nickName: string,
        termInMonths: number,
        interestRate: number,
        rating: string,
        topped: boolean,
        amount: number,
        remainingInvestment: number,
        investmentRate: number,
        covered: boolean,
        datePublished: string,
        published: boolean,
        deadline: string,
        investmentsCount: number,
        questionsCount: number,
        region: string,
        mainIncomeType: string   
}

function auth(): string {

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

    request.onerror = function (this: XMLHttpRequestEventTarget, ev: ErrorEvent) {
        console.log('err:', this);
        console.log('event:', ev);
    };

    var body = "username=test&password=test&grant_type=password&scope=SCOPE_APP_WEB";

    request.send(body);    

    return "done";
}

export default function (rating: string, updateLoanResult: (loan: LoanState) => void, errorResult: (errText: string) => void): void {
    
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
            
            if(this.responseText && this.responseText.startsWith("[")) {
                const data = JSON.parse(this.responseText);

                let loan = calculateLoan(rating, data);

                updateLoanResult(loan); 
            } else {
                console.log('No response');
                console.log(this.responseText);         
            }
        }
    };


    request.onerror = function (this: XMLHttpRequestEventTarget, ev: ErrorEvent) {
        console.log('err:', this);
        console.log('event:', ev);
        errorResult("Network connection problem: " + ev.type);
    };

    request.send();
} 

export function calculateLoan(rating: string, data : ZonkyLoan[]): LoanState {
   
    let count = data.length;
    let total = data.reduce(function(sum, user, index) {        
        return sum + user.amount;
      }, 0);


    console.log('Number of loans: ' + count);
    // console.log('Avg loan is ' + (sum / count));

    return new LoanState(rating, count, (total / count), total, false);
}