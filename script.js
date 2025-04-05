// API key and Google Sheets details
const apiKey = 'AIzaSyCeba6xJZ9_S3z3KzWr5R7NBMnOkYeeugE'; // Replace with your API Key
const spreadsheetId = '2PACX-1vTGuMnAPk-T3UDF4VOPzpPuAXyiY8T3RpfepZ11KxL_0j4FnjO8KwUE_cB1XpIgEyAi4ScTASWDYgDf'; // Replace with your Spreadsheet ID
const range = 'Sheet1!A:C'; // Adjust the range if needed (e.g., 'Sheet1!A:C')

// Fetch data from Google Sheets API
function fetchGuestData() {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.values) {
                const rows = data.values;
                displayGuestList(rows);
            } else {
                console.error('No data found in Google Sheets');
            }
        })
        .catch(error => console.error('Error fetching data:', error));
}

// Display the guest list
function displayGuestList(guests) {
    const guestList = document.getElementById('guest-list');
    guestList.innerHTML = ''; // Clear any previous data

    // Loop through the data and create list items
    guests.forEach(guest => {
        const li = document.createElement('li');
        li.innerHTML = `<span>${guest[0]} ${guest[1]}</span> - Table ${guest[2]}`;
        guestList.appendChild(li);
    });
}

// Search for guests
function searchGuests() {
    const query = document.getElementById('search-bar').value.toLowerCase();
    const guestList = document.getElementById('guest-list');
    const guests = guestList.getElementsByTagName('li');

    // Loop through the guests and hide those who don't match the search query
    Array.from(guests).forEach(guest => {
        const guestName = guest.innerText.toLowerCase();
        if (guestName.includes(query)) {
            guest.style.display = '';
        } else {
            guest.style.display = 'none';
        }
    });
}

// Call the function to fetch data when the page loads
document.addEventListener('DOMContentLoaded', fetchGuestData);
