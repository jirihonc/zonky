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


function marketplace (rating: string) {

        // https://api.zonky.cz/loans/marketplace?rating__eq=D

    var request = new XMLHttpRequest();

    request.open('GET', 'https://api.zonky.cz/loans/marketplace?rating__eq=' + rating);
    
    request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    request.setRequestHeader('Accept', 'application/json');
    // request.setRequestHeader('access-control-allow-origin', '*');


    // request.setRequestHeader('User-Agent', 'Rating-demo/1.0 (https://github.com/jirihonc/zonky)');

    request.onreadystatechange = function () {

        console.log('Status:', this.status);

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

    request.send();
}


export default function (rating: string): LoanState {
    
    console.log('selected rating: ' + rating);   

    // auth();
    // marketplace(rating);

    calculateLoan();
    
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

function calculateLoan() {
    // let data: ZonkyLoan[] = [{"id":117421,"url":"https://app.zonky.cz/loan/117421","name":"J789","story":"Dobrý den,žádám Vás o poskytnutí 140000kč z nichž cca 120000 bude sloužit ke splácení 4 půjček,zbylé peníze využijí na domácí vybavení.\nPředem děkuji.","purpose":"6","photos":[{"name":"shutterstock_227689387.b716626c.jpg","url":"/loans/117421/photos/13392"}],"userId":148037,"nickName":"zonky148037","termInMonths":84,"interestRate":0.154900,"rating":"C","topped":null,"amount":140000.00,"remainingInvestment":0.00,"investmentRate":1.0,"covered":true,"datePublished":"2017-08-19T07:27:30.673+02:00","published":true,"deadline":"2017-08-20T23:54:23.631+02:00","investmentsCount":180,"questionsCount":0,"region":"13","mainIncomeType":"EMPLOYMENT"},{"id":121459,"url":"https://app.zonky.cz/loan/121459","name":"Refinancování mikropůjček","story":"Dobrý den milý investoři,\nrád bych Vás touto formou poprosil o pomoc při refinancování mikropůjček mé milováné přítelkyně.","purpose":"9","photos":[{"name":"shutterstock_323504294.8769275f.jpg","url":"/loans/121459/photos/13349"}],"userId":152738,"nickName":"zonky152738","termInMonths":54,"interestRate":0.154900,"rating":"C","topped":null,"amount":75000.00,"remainingInvestment":0.00,"investmentRate":1.0,"covered":true,"datePublished":"2017-08-18T12:39:52.368+02:00","published":true,"deadline":"2017-08-20T12:13:23.527+02:00","investmentsCount":114,"questionsCount":0,"region":"2","mainIncomeType":"EMPLOYMENT"},{"id":104554,"url":"https://app.zonky.cz/loan/104554","name":"Zase funkční koupelna","story":"Ahoj já jsem Milan, mám doma malinký problém a doufám že mi ho pomůžete vyřešit do výplaty zbývá pár týdnů a nám se doma hroutí koupelna, potřebuji nutně opravit odpady a vyměnit staré části a to bude potřebovat malou finanční injekci abychom mohli zase normálně fungovat a bez funkční koupelny uznejte se bydlet nedá ;) budu moc rád za projevený zájem a případnou pomoc hezký den M.","purpose":"7","photos":[{"name":"shutterstock_290447321.63929138.jpg","url":"/loans/104554/photos/13316"}],"userId":132830,"nickName":"Milda77","termInMonths":24,"interestRate":0.154900,"rating":"C","topped":null,"amount":20000.00,"remainingInvestment":0.00,"investmentRate":1.0,"covered":true,"datePublished":"2017-08-17T17:00:23.256+02:00","published":true,"deadline":"2017-08-19T16:37:09.296+02:00","investmentsCount":41,"questionsCount":1,"region":"11","mainIncomeType":"EMPLOYMENT"},{"id":121468,"url":"https://app.zonky.cz/loan/121468","name":"Porouchaný mini cooper","story":"Oprava auta.  Padlá převodovka u mého mini coopera.","purpose":"1","photos":[{"name":"othe-default.cbec3a78.png","url":"/loans/121468/photos/13283"}],"userId":152747,"nickName":"zonky152747","termInMonths":54,"interestRate":0.154900,"rating":"C","topped":null,"amount":20000.00,"remainingInvestment":0.00,"investmentRate":1.0,"covered":true,"datePublished":"2017-08-17T13:39:37.648+02:00","published":true,"deadline":"2017-08-19T13:37:42.256+02:00","investmentsCount":37,"questionsCount":1,"region":"4","mainIncomeType":"EMPLOYMENT"},{"id":116674,"url":"https://app.zonky.cz/loan/116674","name":"Na zarizeni bytu","story":"Potrebuji pujcit na zarizeni bytu","purpose":"7","photos":[{"name":"othe-default.cbec3a78.png","url":"/loans/116674/photos/13265"}],"userId":147177,"nickName":"zonky147177","termInMonths":84,"interestRate":0.154900,"rating":"C","topped":null,"amount":60000.00,"remainingInvestment":0.00,"investmentRate":1.0,"covered":true,"datePublished":"2017-08-17T10:10:47.509+02:00","published":true,"deadline":"2017-08-19T10:06:34.333+02:00","investmentsCount":75,"questionsCount":1,"region":"10","mainIncomeType":"PENSION"},{"id":119117,"url":"https://app.zonky.cz/loan/119117","name":"Chceme lepsi zivot","story":"Dobrý den milý investoři,\ns přítelkyní jsme se dostaly do úzkých kvůli nesmyslným drobným půjčkám , které vznikly na pomoc rodinnemu příslušníkovi a my sami momentalně nevíme jak danou situaci vyřešit a mít spokojený život,bez starostí a omezovaní. Předem děkujeme za pomoc a pochopení :-) Hlavně děkujeme lidem ze Zonky, že se nám snaží pomoct :-) ","purpose":"6","photos":[{"name":"shutterstock_156861968.b9ea581f.jpg","url":"/loans/119117/photos/13238"}],"userId":150021,"nickName":"zonky150021","termInMonths":7,"interestRate":0.154900,"rating":"C","topped":null,"amount":25000.00,"remainingInvestment":0.00,"investmentRate":1.0,"covered":true,"datePublished":"2017-08-16T16:15:08.490+02:00","published":true,"deadline":"2017-08-18T16:01:57.796+02:00","investmentsCount":42,"questionsCount":0,"region":"14","mainIncomeType":"EMPLOYMENT"},{"id":121085,"url":"https://app.zonky.cz/loan/121085","name":"Zpět ke snům","story":"Dobrý den,\nve zkratce se pokusím sepsat svůj příběh a zároveň důvod, proč tu jsem. Ve 20-ti letech jsem se rozhodla podnikat. Dva roky každodenní dřiny se postupně začaly vyplácet. Bohužel jsem se však setkala s \"nedobrým\" odběratelem, který není schopen ustát své závazky a řádně splácet faktury. Proto potřebuji na následující tři měsíce trochu pomoci a dostat se tak zpět do bodu, kde jsem byla ještě před měsícem, a mohla si opět začít plnit své sny.","purpose":"9","photos":[{"name":"othe-default.cbec3a78.png","url":"/loans/121085/photos/13215"}],"userId":152311,"nickName":"zonky152311","termInMonths":66,"interestRate":0.154900,"rating":"C","topped":null,"amount":40000.00,"remainingInvestment":0.00,"investmentRate":1.0,"covered":true,"datePublished":"2017-08-16T11:19:45.140+02:00","published":true,"deadline":"2017-08-18T11:13:04.858+02:00","investmentsCount":70,"questionsCount":0,"region":"2","mainIncomeType":"SELF_EMPLOYMENT"},{"id":120184,"url":"https://app.zonky.cz/loan/120184","name":"Splátka kreditní karty + koupě a stavba nového komínu","story":"Dobrý den, část půjčky bych využila na splátku drahé kreditní karty a zbylé finance potřebujeme na koupi a stavbu nového komínu,abychom mohli v zimě kde být.Předem velice děkuji","purpose":"9","photos":[{"name":"othe-default.cbec3a78.png","url":"/loans/120184/photos/13213"}],"userId":151247,"nickName":"zonky151247","termInMonths":84,"interestRate":0.154900,"rating":"C","topped":null,"amount":100000.00,"remainingInvestment":0.00,"investmentRate":1.0,"covered":true,"datePublished":"2017-08-16T10:53:22.184+02:00","published":true,"deadline":"2017-08-18T10:46:14.791+02:00","investmentsCount":125,"questionsCount":0,"region":"2","mainIncomeType":"EMPLOYMENT"},{"id":120001,"url":"https://app.zonky.cz/loan/120001","name":"Nové auto","story":"Dobrý den milý investoři.Předem děkuji všem,kteří mi umožní koupit si nějaké ojeté auto.Znáte to určitě všichni bez auta jako bez ruky,alespoň u mě to tak je.Nutné na nákupy na tréninky a hlavně do práce.Děkuji všem","purpose":"1","photos":[{"name":"othe-default.cbec3a78.png","url":"/loans/120001/photos/13181"}],"userId":151026,"nickName":"zonky151026","termInMonths":60,"interestRate":0.154900,"rating":"C","topped":null,"amount":70000.00,"remainingInvestment":0.00,"investmentRate":1.0,"covered":true,"datePublished":"2017-08-15T16:35:53.606+02:00","published":true,"deadline":"2017-08-17T16:29:28.491+02:00","investmentsCount":113,"questionsCount":0,"region":"14","mainIncomeType":"EMPLOYMENT"},{"id":112603,"url":"https://app.zonky.cz/loan/112603","name":"domacnost","story":"vybaveni domacnosti","purpose":"7","photos":[{"name":"othe-default.cbec3a78.png","url":"/loans/112603/photos/13171"}],"userId":142529,"nickName":"zonky142529","termInMonths":84,"interestRate":0.154900,"rating":"C","topped":null,"amount":30000.00,"remainingInvestment":0.00,"investmentRate":1.0,"covered":true,"datePublished":"2017-08-15T14:46:33.702+02:00","published":true,"deadline":"2017-08-17T14:45:04.888+02:00","investmentsCount":35,"questionsCount":1,"region":"1","mainIncomeType":"EMPLOYMENT"},{"id":118605,"url":"https://app.zonky.cz/loan/118605","name":"Refinancování","story":"Do dluhů jsem se dostala před několika roky díky svému bratrovi, kterému jsem tedy pomohla, věřila jsem mu a nečekala, že by se k tomu postavil tak nezodpovědně, jako se nakonec postavil. Náhle mu zemřela snoubenka, nebyl schopen nějakou dobu pracovat a poprosil mě o pomoc. Věřila jsem, že kdybych já potřebovala s čímkoliv pomoci od něj jako od staršího bratra, pomohl by mi a já bych mu to oplatila, vrátila a byla si jistá, že to stejné mohu čekat i od něj a proto jsem mu pomohla. Byla jsem naučená vše řešit sama a postarat se sama o sebe, což nebylo zrovna jednoduché. Byla jsem na vše sama, hodně jsem si musela odříct a snažila se to nějak utáhnout, protože bratr mi nic nevracel. Pomoct mu byla bohužel největší chyba v mém životě a dostalo mě to do svízelné situace, dá se říci, že jak psychicky tak fyzicky za to platím dosud. To nejhorší už mám za sebou, většina je splacena. Teď mi zbývají k doplacení dva úvěry, jenže mezitím jsem se vdala a narodila se nám dcerka a teď při rodičovské potřebuji snížit měsíční splátku tak, abychom lépe vycházeli a trošku si oddechli. Peníze použiji na doplacení těchto úvěrů a kontokorentu a vytvoření drobné rezervy, aby se našemu měsíčnímu rozpočtu trochu ulevilo. ","purpose":"6","photos":[{"name":"shutterstock_387229171.706d1f15.jpg","url":"/loans/118605/photos/13155"}],"userId":149432,"nickName":"zonky149432","termInMonths":78,"interestRate":0.154900,"rating":"C","topped":null,"amount":70000.00,"remainingInvestment":0.00,"investmentRate":1.0,"covered":true,"datePublished":"2017-08-15T00:14:59.632+02:00","published":true,"deadline":"2017-08-16T23:58:18.703+02:00","investmentsCount":97,"questionsCount":0,"region":"2","mainIncomeType":"MATERNITY_LEAVE"}];

    
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
    ];

    let sum = 0;
    let count = 0;
    
    for (let user of data) {
        console.log(user.name + ' has loan ' + user.amount); 
        count++;
        sum += user.amount;
    }

    console.log('Avg loan is ' + (sum / count));


}