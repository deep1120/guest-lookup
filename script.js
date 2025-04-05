// Google Sheets API URL
const sheetUrl = "https://sheets.googleapis.com/v4/spreadsheets/2PACX-1vTGuMnAPk-T3UDF4VOPzpPuAXyiY8T3RpfepZ11KxL_0j4FnjO8KwUE_cB1XpIgEyAi4ScTASWDYgDf/values/Sheet1?key=AIzaSyCeba6xJZ9_S3z3KzWr5R7NBMnOkYeeugE";

// Fetch guest data from Google Sheets
fetch(sheetUrl)
    .then(response => response.json())
    .then(data => {
        const guests = data.values;
        displayGuests(guests);
    })
    .catch(error => console.error("Error fetching data:", error));

// Display guests in the list
function displayGuests(guests) {
    const guestList = document.getElementById("guest-list");
    guestList.innerHTML = "";  // Clear the list before populating it

    guests.forEach(guest => {
        const listItem = document.createElement("li");
        listItem.textContent = `${guest[0]} - Table ${guest[1]}`;
        guestList.appendChild(listItem);
    });
}

// Search for guests by name
function searchGuests() {
    const query = document.getElementById("search-bar").value.toLowerCase();
    const guestList = document.getElementById("guest-list");
    const guests = guestList.getElementsByTagName("li");

    Array.from(guests).forEach(guest => {
        const guestName = guest.innerText.toLowerCase();
        if (guestName.includes(query)) {
            guest.style.display = "";
        } else {
            guest.style.display = "none";
        }
    });
}
