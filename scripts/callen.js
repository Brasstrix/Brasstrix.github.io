//TO DO
//Need variables
//Pay/H
//Weekly Gross+net, WeeklyExpenses
//Month Gross+net, MonthExpenses, month remaining
//Array for
//OnceMonth Expense [Name, $]
//Weekly Expense [name, $, DayOfWeek]

//Net Income calculator
//  Need week, month
//Dis month
//  knows how many of each day there will be

//Variables (let,const)
let CurrentMonth = new Date().getMonth();
let CurrentYear = new Date().getFullYear();
const DisMonth = document.getElementById("DisMonth");

let Pay = 19.86;

let GrosWeek = 0;
let NetWeek = 0;
let ExpWeek = 0;

const GrosWeektd = document.getElementById("WeeklyGross");
const NetWeektd = document.getElementById("WeeklyNet");

let GrosMonth = 0;
let NetMonth = 0;

const GrosMonthtd = document.getElementById("MonthGross");
const NetMonthtd = document.getElementById("MonthNet");

let ExpMonth = 0;
let RemMonth = 0;

let PerWeekExp = []; // [name, $, DayOfWeek]
let PerMonthExp = []; //[Name, $]


function GetDayCount(year,month){
  const WeekdayCount = [0,0,0,0,0,0,0];
  const date = new Date(year, month, 1);

  while (date.getMonth() === month){
    const weekday = date.getDay();

    WeekdayCount[weekday]++;
    date.setDate(date.getDate()+1);
  }

  return WeekdayCount;
}


function Update(){
  let days = GetDayCount(CurrentYear ,CurrentMonth);
  GrosWeek = Pay * 40;
  NetWeek = GrosWeek - (GrosWeek * 0.1081) -(GrosWeek * 0.0765);

  GrosMonth = GrosWeek * days[5];
  NetMonth = NetWeek * days[5];


  DisMonth.textContent = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date(CurrentYear, CurrentMonth));;
  GrosWeektd.textContent = `$${GrosWeek.toFixed(2)}`;
  NetWeektd.textContent = `$${NetWeek.toFixed(2)}`;
  GrosMonthtd.textContent = `$${GrosMonth.toFixed(2)}`;
  NetMonthtd.textContent = `$${NetMonth.toFixed(2)}`;
}

const MonthTable = document.getElementById('MonthTable');

function MonthExpGen(){
  const row = document.createElement('tr');
  
  let expName = prompt('What is the Expense?');
  let expCost = prompt('How much?');
  let expPair = [expName,expCost];
  for (let i = 0; i < 2; i++){
    const cell = document.createElement('td');
    cell.textContent = `${expPair[i]}`
    row.append(cell);
  }
  MonthTable.append(row);
  PerMonthExp.push([expName,expCost]);
}

const AddMonthExp = document.getElementById('AddMonthExp');
AddMonthExp.addEventListener('click', function() {MonthExpGen();});


Update();

