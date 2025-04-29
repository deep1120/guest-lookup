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

// Display the guests in the list
function displayGuests(guests) {
  const guestList = document.getElementById('guestList');
  guestList.innerHTML = '';

  if (guests.length === 0) {
    guestList.style.display = 'none';
    return;
  }

  guestList.style.display = 'block';

  guests.forEach(guest => {
    const li = document.createElement('li');

    const leftWrapper = document.createElement('div');
    leftWrapper.classList.add('guest-left');

    const sideSpan = document.createElement('span');
    sideSpan.classList.add('guest-side');
    sideSpan.textContent = guest['Side'];

    const nameSpan = document.createElement('span');
    nameSpan.classList.add('guest-name');
    nameSpan.textContent = `${guest['First Name']} ${guest['Last Name']}`;

    leftWrapper.appendChild(sideSpan);
    leftWrapper.appendChild(nameSpan);

    const tableSpan = document.createElement('span');
    tableSpan.classList.add('guest-table');
    tableSpan.textContent = `Table ${guest['Table Number']}`;

    li.appendChild(leftWrapper);
    li.appendChild(tableSpan);

    guestList.appendChild(li);
  });
}



// Search function
function searchGuests() {
  const input = document.getElementById('searchInput').value.toLowerCase();
  
  if (input.length > 0) {
    const filteredGuests = guestData.filter(guest => {
      return guest['First Name'].toLowerCase().includes(input) || guest['Last Name'].toLowerCase().includes(input);
    });
    displayGuests(filteredGuests);
  } else {
    displayGuests([]);
  }
}
