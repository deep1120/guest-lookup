const guestList = [
  { firstName: "Deep", lastName: "Patel", tableNumber: 3 },
  { firstName: "Shivangi", lastName: "Patel", tableNumber: 2 },
  { firstName: "Riya", lastName: "Shah", tableNumber: 1 },
  { firstName: "Mansi", lastName: "Dave", tableNumber: 19 }
];

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
