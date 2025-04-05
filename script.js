window.onload = function() {
    console.log(Tabletop);  // This should log 'function Tabletop() {...}' if loaded correctly
    var publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTGuMnAPk-T3UDF4VOPzpPuAXyiY8T3RpfepZ11KxL_0j4FnjO8KwUE_cB1XpIgEyAi4ScTASWDYgDf/pubhtml';

    Tabletop.init({
        key: publicSpreadsheetUrl,
        callback: function(data, tabletop) {
            console.log(data);  // This will log the data from the sheet
            displayGuestList(data);
        },
        simpleSheet: true
    });
};


// Function to display the guest list in your table
function displayGuestList(data) {
    const tableBody = document.querySelector('tbody');  // Get the table body
    tableBody.innerHTML = "";  // Clear any existing rows

    data.forEach(function(guest) {
        const row = document.createElement('tr');

        // Assuming your sheet columns are in the order: First Name, Last Name, Table Number
        const firstNameCell = document.createElement('td');
        firstNameCell.textContent = guest['First Name'];  // Replace with your column name
        row.appendChild(firstNameCell);

        const lastNameCell = document.createElement('td');
        lastNameCell.textContent = guest['Last Name'];  // Replace with your column name
        row.appendChild(lastNameCell);

        const tableNumberCell = document.createElement('td');
        tableNumberCell.textContent = guest['Table Number'];  // Replace with your column name
        row.appendChild(tableNumberCell);

        // Append the new row to the table body
        tableBody.appendChild(row);
    });
}

// Function to filter the guest list based on search input
function filterGuests() {
    const input = document.getElementById("searchInput");
    const filter = input.value.toLowerCase();
    const rows = document.querySelectorAll("tbody tr");

    rows.forEach(function(row) {
        const firstName = row.cells[0].textContent.toLowerCase();
        const lastName = row.cells[1].textContent.toLowerCase();
        const tableNumber = row.cells[2].textContent.toLowerCase();

        // Show or hide rows based on search match
        if (firstName.includes(filter) || lastName.includes(filter) || tableNumber.includes(filter)) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    });
}
