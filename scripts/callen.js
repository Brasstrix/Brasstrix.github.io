// Get the calendar body element
const calendarBody = document.getElementById("calendar-body");
const monthDisplay = document.getElementById("month-display");

// Get the current month and year
let currentYear = new Date().getFullYear();
let currentMonth = new Date().getMonth();

// Function to generate the calendar days
function generateCalendar(year, month) {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();

  // Clear previous calendar days
  calendarBody.innerHTML = "";

  // Generate calendar days
  let day = 1;
  for (let week = 0; day <= daysInMonth; week++) {
    const row = document.createElement("tr");

    // Generate cells for each day of the week
    for (let weekday = 0; weekday < 7; weekday++) {
      if (week === 0 && weekday < firstDay) {
        // Empty cells before the first day of the month
        const emptyCell = document.createElement("td");
        row.appendChild(emptyCell);
      } else if (day > daysInMonth) {
        // Empty cells after the last day of the month
        const emptyCell = document.createElement("td");
        row.appendChild(emptyCell);
        day++;
      } else {
        // Calendar day cells
        const cell = document.createElement("td");
        cell.textContent = day;
        row.appendChild(cell);
        day++;
      }
    }

    calendarBody.appendChild(row);
  }
  
  // Update month and year display
  const monthName = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date(year, month));
  monthDisplay.textContent = `${monthName} ${year}`;
}

// Generate the initial calendar
generateCalendar(currentYear, currentMonth);

// Function to go to the previous month
function goToPreviousMonth() {
  if (currentMonth === 0) {
    currentMonth = 11;
    currentYear--;
  } else {
    currentMonth--;
  }

  generateCalendar(currentYear, currentMonth);
}

// Function to go to the next month
function goToNextMonth() {
  if (currentMonth === 11) {
    currentMonth = 0;
    currentYear++;
  } else {
    currentMonth++;
  }

  generateCalendar(currentYear, currentMonth);
}