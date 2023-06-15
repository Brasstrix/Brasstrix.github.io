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


const monthlyTable = document.getElementById('monthlyTable'); // [name, $]
const weeklyTable = document.getElementById("weeklyTable"); // [name, $, dayOfWeek]

function redrawTables(){
  monthlyTable.innerHTML = '';
  weeklyTable.innerHTML = '';

  let weekTableString = localStorage.getItem('weeklyTableList');
  let weekTable = JSON.parse(weekTableString);
  for (let i = 0; i < weekTable.length; i++) {
   const rowWeek = document.createElement('tr');
    for (let ii = 0; ii < 3; ii++) {
     const cell = document.createElement('td');
     cell.textContent = `${weekTable[i][ii]}`;
     rowWeek.append(cell);
   }
    const button = delButton("weeklyTableList", weekTable[i][0],rowWeek)
    rowWeek.append(button);
    weeklyTable.append(rowWeek);
  }

  let currentTableString = localStorage.getItem('monthlyTableList');
  let CurrentTable = JSON.parse(currentTableString);
  for (let i = 0; i < CurrentTable.length; i++) {
   const rowMonth = document.createElement('tr');
    for (let ii = 0; ii < 2; ii++) {
     const cell = document.createElement('td');
     cell.textContent = `${CurrentTable[i][ii]}`;
     rowMonth.append(cell);
   }
    const button = delButton("monthlyTableList", CurrentTable[i][0],rowMonth)
    rowMonth.append(button);
    monthlyTable.append(rowMonth);
  }
  
}


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

function updateIncome(){
  calcWeekly();

  weeklyGrossTd.textContent = localStorage.getItem('weeklyGross');
  weeklyNetTd.textContent = localStorage.getItem('weeklyNet');
  monthlyGrossTd.textContent = localStorage.getItem('monthlyGross')
  monthlyNetTd.textContent = localStorage.getItem('monthlyNet')
}


function calcWeekly() {
  let weeklyGross = payRate * 40
  localStorage.setItem('weeklyGross', weeklyGross.toFixed(2));
  let weeklyNet = weeklyGross - (weeklyGross * 0.1081) - (weeklyGross * 0.0765);
  localStorage.setItem('weeklyNet', weeklyNet.toFixed(2));

  let currentTableString = localStorage.getItem('weeklyTableList');
  let CurrentTable = JSON.parse(currentTableString);
  let weeklyExpenses = 0
  for (let i = 0; i < CurrentTable.length; i++){
    weeklyExpenses += CurrentTable[i][1];
  }
  weeklyExpensesTotal.textContent = `${weeklyExpenses.toFixed(2)}`;
  calcMontly();
}

function calcMontly(){
  let days = getWeekdayCount(currentYear, currentMonth);
  localStorage.setItem('monthlyGross', (localStorage.getItem('weeklyGross') * days[5]).toFixed(2));
  localStorage.setItem('monthlyNet', (localStorage.getItem('weeklyNet') * days[5]).toFixed(2));

  let currentTableString = localStorage.getItem('monthlyTableList');
  let CurrentTable = JSON.parse(currentTableString);
  let monthlyExpenses = 0;
  for (let i = 0; i < CurrentTable.length; i += 1) {
    monthlyExpenses += CurrentTable[i][1];
  }
  monthlyExpensesTotal.textContent = `${monthlyExpenses.toFixed(2)}`;
  monthlyRemaining.textContent = `${(Number(localStorage.getItem('monthlyNet'))+monthlyExpenses).toFixed(2)}`
}


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
  const button = delButton("monthlyTableList", expenseName,row)
  row.append(button);
  monthlyTable.append(row);
  CurrentTable.push([expenseName, expenseCost]);
  localStorage.setItem("monthlyTableList", JSON.stringify(CurrentTable))
  calcWeekly();
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
  const button = delButton("weeklyTableList", expenseName,row)
  row.append(button);
  weeklyTable.append(row);
  CurrentTable.push([expenseName, expenseCost, selectedDay]);
  localStorage.setItem("weeklyTableList", JSON.stringify(CurrentTable))
  calcMontly();
}

const addWeeklyExpense = document.getElementById('addWeeklyExpense');
addWeeklyExpense.addEventListener('click', function() { generateWeeklyExpense(); });



function delButton(table, NameTd,row) {
  const button = document.createElement('button');
  button.textContent = 'X';
  button.addEventListener('click', function() {
    let currentTable = JSON.parse(localStorage.getItem(table));
    let tablePos = 0;
    for(let i = 0;i < currentTable.length; i++){
      if(currentTable[i][0] == NameTd){
        tablePos = i;
      }
    }
    currentTable.splice(tablePos, 1);
    localStorage.setItem(table, JSON.stringify(currentTable));
    row.parentNode.removeChild(row);
    calcWeekly();
  });
  return button;
}


updateIncome();
redrawTables();