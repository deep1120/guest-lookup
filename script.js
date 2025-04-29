let guestData = [];

// Fetch the CSV from the Google Sheet
fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vTGuMnAPk-T3UDF4VOPzpPuAXyiY8T3RpfepZ11KxL_0j4FnjO8KwUE_cB1XpIgEyAi4ScTASWDYgDf/pub?output=csv')
  .then(response => response.text())
  .then(csvData => {
    Papa.parse(csvData, {
      header: true,
      dynamicTyping: true,
      complete: function(results) {
        guestData = results.data;
        displayGuests([]);
      }
    });
  })
  .catch(error => console.error('Error fetching CSV:', error));

// Display guests
function displayGuests(guests) {
  const guestList = document.getElementById('guestList');
  const columnHeaders = document.getElementById('columnHeaders');

  guestList.innerHTML = '';

  if (guests.length === 0) {
    guestList.style.display = 'none';
    columnHeaders.style.display = 'none';
    return;
  }

  guestList.style.display = 'block';
  columnHeaders.style.display = 'flex';

  guests.forEach(guest => {
    const li = document.createElement('li');

    const sideSpan = document.createElement('span');
    sideSpan.className = 'cell-side';
    sideSpan.textContent = guest['Side'];

    const nameSpan = document.createElement('span');
    nameSpan.className = 'cell-name';
    nameSpan.textContent = `${guest['First Name']} ${guest['Last Name']}`;

    const tableSpan = document.createElement('span');
    tableSpan.className = 'cell-table';
    tableSpan.textContent = `${guest['Table Number']}`;

    li.appendChild(sideSpan);
    li.appendChild(nameSpan);
    li.appendChild(tableSpan);

    guestList.appendChild(li);
  });
}

// Search function
function searchGuests() {
  const input = document.getElementById('searchInput').value.toLowerCase().trim();

  if (input.length > 0) {
    // Only search by First Name
    const filteredGuests = guestData.filter(guest => {
      return guest['First Name'].toLowerCase().includes(input);
    });
    displayGuests(filteredGuests);
  } else {
    displayGuests([]);
  }
}

