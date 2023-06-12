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

let weeklyGross = 0;
let weeklyNet = 0;

let weeklyExpenses = 0;
let WeeklyMontlyExpensesTotal = 0;

let monthlyGross = 0;
let monthlyNet = 0;

let monthlyExpenses = 0;
let remainingMonthly = 0;

let weeklyExpensesList = []; // [name, $, dayOfWeek]
let monthlyExpensesList = []; // [name, $]

const weeklyGrossTd = document.getElementById("weeklyGross");
const weeklyNetTd = document.getElementById("weeklyNet");

const monthlyGrossTd = document.getElementById("monthlyGross");
const monthlyNetTd = document.getElementById("monthlyNet");

const monthlyExpensesTotal = document.getElementById('monthlyExpensesTotal');
const monthlyRemaining = document.getElementById('monthlyRemaining');

const weeklyExpensesTotal = document.getElementById("weeklyExpensesTotal");
const WeeklyMontlyExpensesTotalTd = document.getElementById('WeeklyMontlyExpensesTotal');

const monthlyTable = document.getElementById('monthlyTable');
const weeklyTable = document.getElementById("weeklyTable");


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

function updateData() {
  let days = getWeekdayCount(currentYear, currentMonth);
  weeklyGross = payRate * 40;
  weeklyNet = weeklyGross - (weeklyGross * 0.1081) - (weeklyGross * 0.0765);

  monthlyGross = weeklyGross * days[5];
  monthlyNet = weeklyNet * days[5];

  displayMonth.textContent = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date(currentYear, currentMonth));
  weeklyGrossTd.textContent = `$${weeklyGross.toFixed(2)}`;
  weeklyNetTd.textContent = `$${weeklyNet.toFixed(2)}`;
  monthlyGrossTd.textContent = `$${monthlyGross.toFixed(2)}`;
  monthlyNetTd.textContent = `$${monthlyNet.toFixed(2)}`;
}

function updateWeeklyExpensesTotal(){
  weeklyExpenses = 0
  for (let i = 0; i < weeklyExpensesList.length; i++){
    weeklyExpenses += weeklyExpensesList[i][1];
  }
  weeklyExpensesTotal.textContent = `${weeklyExpenses.toFixed(2)}`;
}


function updateMonthlyExpensesTotal() {
  monthlyExpenses = 0 + CalcMontlyWeekly();
  for (let i = 0; i < monthlyExpensesList.length; i += 1) {
    monthlyExpenses += monthlyExpensesList[i][1];
  }
  monthlyExpensesTotal.textContent = `${monthlyExpenses.toFixed(2)}`;
  monthlyRemaining.textContent = `${(monthlyNet+monthlyExpenses).toFixed(2)}`
}

function generateMonthlyExpense() {
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
  monthlyExpensesList.push([expenseName, expenseCost]);
  updateMonthlyExpensesTotal();
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
  const row = document.createElement('tr');
  if (selectedDay == 500){
    alert('Please select a day');
    return
  }

  let expenseName = prompt('What is the expense?');
  let expenseCost = -1 * prompt('How much?');

  let expensePair = [expenseName, expenseCost, selectedDay];
  for (let i = 0; i < 3; i++) {
    const cell = document.createElement('td');
    cell.textContent = `${expensePair[i]}`;
    row.append(cell);
  }
  weeklyTable.append(row);
  weeklyExpensesList.push([expenseName, expenseCost,selectedDay]);
  updateWeeklyExpensesTotal();
  CalcMontlyWeekly();
}

function CalcMontlyWeekly(){
  let total = 0;
  let WeekdayCount = getWeekdayCount(currentYear, currentMonth);

  for(i=0;i<weeklyExpensesList.length;i++){
    total += (weeklyExpensesList[i][1] * WeekdayCount[weeklyExpensesList[i][2]]);
  }

  WeeklyMontlyExpensesTotalTd.textContent = total.toFixed(2);
  return total;
}

const addWeeklyExpense = document.getElementById('addWeeklyExpense');
addWeeklyExpense.addEventListener('click', function() { generateWeeklyExpense(); });


updateData();
