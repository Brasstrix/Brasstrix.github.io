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
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();
const displayMonth = document.getElementById("displayMonth");

let payRate = 19.86;


const weeklyGrossTd = document.getElementById("weeklyGross");
const weeklyNetTd = document.getElementById("weeklyNet");

const monthlyGrossTd = document.getElementById("monthlyGross");
const monthlyNetTd = document.getElementById("monthlyNet");

const monthlyExpensesTotal = document.getElementById('monthlyExpensesTotal');
const monthlyRemaining = document.getElementById('monthlyRemaining');

const weeklyExpensesTotal = document.getElementById("weeklyExpensesTotal");

const weeklyMontlyExpensesTotalTd = document.getElementById('WeeklyMontlyExpensesTotal');


localStorage.setItem('monthlyTableList',(JSON.stringify([])));
localStorage.setItem('weeklyTableList',(JSON.stringify([])));
const monthlyTable = document.getElementById('monthlyTable'); // [name, $]
const weeklyTable = document.getElementById("weeklyTable"); // [name, $, dayOfWeek]


function getWeekdayCount(year, month) {
  const weekdayCount = [0, 0, 0, 0, 0, 0, 0];
  const date = new Date(year, month, 1);

  while (date.getMonth() === month) {
    const weekday = date.getDay();

    weekdayCount[weekday]++;
    date.setDate(date.getDate() + 1);
  }

  return weekdayCount;
}

function calcWeeklyGrossNet() {
  let weeklyGross = payRate * 40
  localStorage.setItem('weeklyGross', weeklyGross);
  let weeklyNet = weeklyGross - (weeklyGross * 0.1081) - (weeklyGross * 0.0765);
  localStorage.setItem('weeklyNet', weeklyNet);

  
}

function calcMontlyGrossNet(){
  let days = getWeekdayCount(currentYear, currentMonth);
  localStorage.setItem('monthlyGross', localStorage.getItem('weeklyGross') * days[5]);
  localStorage.setItem('monthlyNet', localStorage.getItem('weeklyNet') * days[5]);
}

function calcWeeklyExpensesTotal(){
  let currentTableString = localStorage.getItem('weeklyTableList');
  let CurrentTable = JSON.parse(currentTableString);
  let weeklyExpenses = 0
  for (let i = 0; i < CurrentTable.length; i++){
    weeklyExpenses += CurrentTable[i][1];
  }
  weeklyExpensesTotal.textContent = `${weeklyExpenses.toFixed(2)}`;
}


function calcMonthlyExpensesTotal() {
  let currentTableString = localStorage.getItem('monthlyTableList');
  let CurrentTable = JSON.parse(currentTableString);
  let monthlyExpenses = 0;
  for (let i = 0; i < CurrentTable.length; i += 1) {
    monthlyExpenses += CurrentTable[i][1];
  }
  monthlyExpensesTotal.textContent = `${monthlyExpenses.toFixed(2)}`;
  monthlyRemaining.textContent = `${(Number(localStorage.getItem('monthlyNet'))+monthlyExpenses).toFixed(2)}`
}


calcWeeklyGrossNet();
calcMontlyGrossNet();
calcMonthlyExpensesTotal();
calcWeeklyExpensesTotal();


function generateMonthlyExpense() {
  let currentTableString = localStorage.getItem('monthlyTableList');
  let CurrentTable = JSON.parse(currentTableString);

  const row = document.createElement('tr');

  let expenseName = prompt('What is the expense?');
  let expenseCost = -1 * prompt('How much?');
  let expensePair = [expenseName, expenseCost];
  for (let i = 0; i < 2; i++) {
    const cell = document.createElement('td');
    cell.textContent = `${expensePair[i]}`;
    row.append(cell);
  }
  monthlyTable.append(row);
  CurrentTable.push([expenseName, expenseCost]);
  localStorage.setItem("monthlyTableList", JSON.stringify(CurrentTable))
  calcMonthlyExpensesTotal();
}

const addMonthlyExpense = document.getElementById('addMonthlyExpense');
addMonthlyExpense.addEventListener('click', function() { generateMonthlyExpense(); });


const addWeeklyExpenseTr = document.getElementById('addWeeklyExpenseTr');
const dayLabels = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
let selectedDay = 500;

const dayOfWeekButtons = document.querySelectorAll('input[name="WeekdaySelected"');

  dayOfWeekButtons.forEach(function(dayOfWeekButtons){
    dayOfWeekButtons.addEventListener('change', function(){
      if (this.checked){
        selectedDay = this.value;
      }
    });
  });


function generateWeeklyExpense() {
  let currentTableString = localStorage.getItem('weeklyTableList');
  let CurrentTable = JSON.parse(currentTableString);

  const row = document.createElement('tr');
  if (selectedDay == 500){
    alert('Please select a day');
    return
  }

  let expenseName = prompt('What is the expense?');
  let expenseCost = -1 * prompt('How much?');

  let expensePair = [expenseName, expenseCost, dayLabels[selectedDay]];

  for (let i = 0; i < 3; i++) {
    const cell = document.createElement('td');
    cell.textContent = `${expensePair[i]}`;
    row.append(cell);
  }
  weeklyTable.append(row);
  CurrentTable.push([expenseName, expenseCost, selectedDay]);
  localStorage.setItem("weeklyTableList", JSON.stringify(CurrentTable))
  calcWeeklyExpensesTotal();
}

const addWeeklyExpense = document.getElementById('addWeeklyExpense');
addWeeklyExpense.addEventListener('click', function() { generateWeeklyExpense(); });