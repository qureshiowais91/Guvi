document.addEventListener("DOMContentLoaded", function () {
  // Function to handle form submission
  function addEntryToTable(data) {
    const tableBody = document
      .getElementById("dataTable")
      .getElementsByTagName("tbody")[0];
    const newRow = tableBody.insertRow();

    const cellKeys = Object.keys(data);
    console.log(cellKeys)
    for (let i = 0; i < cellKeys.length; i++) {
      const cell = newRow.insertCell();
      cell.textContent = data[cellKeys[i]];
    }
  }
  function handleSubmit(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Get form elements by their IDs
    const firstNameInput = document.getElementById("nameInput");
    const lastNameInput = document.getElementById("emailInput");
    const ageInput = document.getElementById("ageInput");
    const addressInput = document.getElementById("addressInput");
    const pincodeInput = document.getElementById("pinCodeInput");
    const foodSelect = document.getElementById("foodSelect");
    const stateInput = document.getElementById("StateInput");
    const countryInput = document.getElementById("CountryInput");

    const selectedFood = Array.from(foodSelect.selectedOptions).map(
      (option) => option.value
    );
    if (selectedFood.length == 2) {
      const formData = {
        firstName: firstNameInput?.value,
        lastName: lastNameInput?.value,
        age: ageInput?.value,
        address: addressInput?.value,
        pincode: pincodeInput?.value,
        favoriteFoods: selectedFood || ['',''],
        state: stateInput?.value,
        country: countryInput?.value,
      };
      addEntryToTable(formData);
      document.getElementById("myForm").reset();
    } else {
      alert("select only 2 food")
    }
  }
  const form = document.getElementById("myForm");
  form.addEventListener("submit", handleSubmit);
});
