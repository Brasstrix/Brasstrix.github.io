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

let monthlyGross = 0;
let monthlyNet = 0;

let monthlyExpenses = 0;
let remainingMonthly = 0;

const weeklyGrossTd = document.getElementById("weeklyGross");
const weeklyNetTd = document.getElementById("weeklyNet");

const monthlyGrossTd = document.getElementById("monthlyGross");
const monthlyNetTd = document.getElementById("monthlyNet");

let weeklyExpensesList = []; // [name, $, dayOfWeek]
let monthlyExpensesList = []; // [name, $]

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

const monthlyExpensesTotal = document.getElementById('monthlyExpensesTotal');

function updateMonthlyExpensesTotal() {
  monthlyExpenses = 0;
  for (let i = 0; i < monthlyExpensesList.length; i += 1) {
    monthlyExpenses += monthlyExpensesList[i][1];
  }
  monthlyExpensesTotal.textContent = `${monthlyExpenses.toFixed(2)}`;
}

const monthlyTable = document.getElementById('monthlyTable');

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

updateData();
