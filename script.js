const guestList = [
  { firstName: "John", lastName: "Doe", tableNumber: 5 },
  { firstName: "Jane", lastName: "Smith", tableNumber: 3 },
  { firstName: "Anna", lastName: "Lee", tableNumber: 2 },
  { firstName: "Michael", lastName: "Brown", tableNumber: 4 }
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
