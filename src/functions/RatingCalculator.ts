/*
interface Window {
    XDomainRequest?: any;
}*/


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

function createCORSRequest (method: string, url: string): XMLHttpRequest {

  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {
    xhr.open(method, url, true);
  } else {
    xhr = null;
  }

  return xhr;
}

function sendCORSRequest () {
    var url = 'https://api.zonky.cz/loans/marketplace';
    var xhr = createCORSRequest('GET', url);
    xhr.onerror = function() { alert('error'); };
    xhr.onload = function() { alert('success'); };
    xhr.send();
}


function marketplace (rating: string, caller: any) {

    // https://www.thepolyglotdeveloper.com/2014/08/bypass-cors-errors-testing-apis-locally/
    // https://api.zonky.cz/loans/marketplace?rating__eq=D

    var request = new XMLHttpRequest();

    request.open('GET', 'https://api.zonky.cz/loans/marketplace?rating__eq=' + rating);
    
    request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    request.setRequestHeader('Accept', 'application/json');


    request.onreadystatechange = function () {

        if (this.readyState === 4) {
            const data = JSON.parse(this.responseText);

            let loan = calculateLoan(rating, data);

            caller.setState(loan); 
        }
    };


    request.onerror = function (this: XMLHttpRequestEventTarget, ev: ErrorEvent) {
        console.log('err:', this);
        console.log('event:', ev);
    };

    request.send();
}


export default function (rating: string, caller: any): void {
    
    console.log('selected rating: ' + rating);   

    // auth();
    marketplace(rating, caller);

    // calculateLoan();
    
    // Rating: 
    // A**  téměř bez rizika
    // A*   nejnižší riziko
    // A++  nízké riziko        
    // A+   nízké riziko
    // A    nižší riziko
    // B    střední riziko
    // C    vyšší riziko
    // D    rizikové


    /*
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
    
    */
} 

interface ZonkyPic {
    name: string,
    url: string
}

interface ZonkyLoan {
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

function calculateLoan(rating: string, data : any): LoanState {
   
    /*
    let data = [
    {
        "id": 1,
        "url": "https://app.zonky.cz/loan/1",
        "name": "Loan refinancing",
        "story": "Dear investors, ...",
        "purpose": "6",
        "photos": [
        {
            "name": "6",
            "url": "/loans/31959/photos/1987"
        }
        ],
        "nickName": "zonky0",
        "termInMonths": 42,
        "interestRate": 0.0599,
        "rating": "AAA",
        "topped": false,
        "amount": 200000,
        "remainingInvestment": 152600,
        "investmentRate": 0.237,
        "covered": false,
        "datePublished": "2016-04-19T18:25:41.208+02:00",
        "published": true,
        "deadline": "2016-04-26T18:23:53.101+02:00",
        "investmentsCount": 72,
        "questionsCount": 3,
        "region": "6",
        "mainIncomeType": "EMPLOYMENT"
    },
    {
        "id": 2,
        "url": "https://app.zonky.cz/loan/1",
        "name": "Peter Novak",
        "story": "Dear investors, ...",
        "purpose": "6",
        "photos": [
        {
            "name": "6",
            "url": "/loans/31959/photos/1987"
        }
        ],
        "nickName": "zonky0",
        "termInMonths": 42,
        "interestRate": 0.0599,
        "rating": "AAA",
        "topped": false,
        "amount": 300000,
        "remainingInvestment": 152600,
        "investmentRate": 0.237,
        "covered": false,
        "datePublished": "2016-04-19T18:25:41.208+02:00",
        "published": true,
        "deadline": "2016-04-26T18:23:53.101+02:00",
        "investmentsCount": 72,
        "questionsCount": 3,
        "region": "6",
        "mainIncomeType": "EMPLOYMENT"
    }    
    ];*/

    let sum = 0;
    let count = 0;
    
    for (let user of data) {
        // console.log(user.name + ' has loan ' + user.amount); 
        count++;
        sum += user.amount;
    }

    console.log('Number of loans ' + count);
    console.log('Avg loan is ' + (sum / count));

    return new LoanState(rating, count, (sum / count), sum);
}