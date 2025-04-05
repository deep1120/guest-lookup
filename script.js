let guestList = [];

function init() {
  Tabletop.init({
    key: '2PACX-1vTGuMnAPk-T3UDF4VOPzpPuAXyiY8T3RpfepZ11KxL_0j4FnjO8KwUE_cB1XpIgEyAi4ScTASWDYgDf', // Example: https://docs.google.com/spreadsheets/d/1Abc.../pubhtml
    simpleSheet: true,
    callback: function(data) {
      guestList = data;
      setupSearch();
    }
  });
}

function setupSearch() {
  const searchInput = document.getElementById("searchInput");
  const resultsList = document.getElementById("results");

  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    resultsList.innerHTML = "";

    const filtered = guestList.filter(guest =>
      guest.firstName.toLowerCase().includes(query) ||
      guest.lastName.toLowerCase().includes(query)
    );

    filtered.forEach(guest => {
      const li = document.createElement("li");
      li.textContent = `${guest.firstName} ${guest.lastName} – Table ${guest.tableNumber}`;
      resultsList.appendChild(li);
    });

    if (filtered.length === 0 && query !== "") {
      const li = document.createElement("li");
      li.textContent = "No matches found.";
      resultsList.appendChild(li);
    }
  });
}

window.addEventListener("DOMContentLoaded", init);
