document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("festivalForm");
  const result = document.getElementById("result");
  const registeredList = document.getElementById("registeredList");

  // Load and display existing registrations
  displayRegisteredNames();

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    let valid = true;

    // Clear previous errors
    document.querySelectorAll(".error").forEach(e => e.textContent = "");

    const name = document.getElementById("fullname").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const age = document.getElementById("age").value;
    const gender = form.querySelector('input[name="gender"]:checked');

    // Validation checks
    if (name.length < 2) {
      document.getElementById("nameError").textContent = "Please enter a valid name.";
      valid = false;
    }
    if (!email.includes("@")) {
      document.getElementById("emailError").textContent = "Invalid email address.";
      valid = false;
    }
    if (!/^\d{10}$/.test(phone)) {
      document.getElementById("phoneError").textContent = "Phone must be 10 digits.";
      valid = false;
    }
    if (!age) {
      document.getElementById("ageError").textContent = "Please select your age group.";
      valid = false;
    }
    if (!gender) {
      document.getElementById("genderError").textContent = "Please select your gender.";
      valid = false;
    }

    if (!valid) return;

    // Save registration
    const registration = {
      name,
      email,
      phone,
      age,
      gender: gender.value
    };

    let registered = JSON.parse(localStorage.getItem("festivalRegistrations")) || [];
    registered.push(registration);
    localStorage.setItem("festivalRegistrations", JSON.stringify(registered));

    // Show success message
    result.innerHTML = `<h3>Thank you for registering, ${name}!</h3>
                        <p>Your information has been saved successfully.</p>`;

    form.reset();
    displayRegisteredNames();
  });

  function displayRegisteredNames() {
    const registered = JSON.parse(localStorage.getItem("festivalRegistrations")) || [];
    if (registered.length === 0) {
      registeredList.innerHTML = "<p>No registrations yet.</p>";
      return;
    }

    let listHTML = `
      <h3>Registered Participants</h3>
      <table border="1" cellpadding="8">
        <tr>
          <th>Name</th><th>Email</th><th>Phone</th><th>Age Group</th><th>Gender</th>
        </tr>`;
    registered.forEach(r => {
      listHTML += `
        <tr>
          <td>${r.name}</td>
          <td>${r.email}</td>
          <td>${r.phone}</td>
          <td>${r.age}</td>
          <td>${r.gender}</td>
        </tr>`;
    });
    listHTML += "</table>";

    registeredList.innerHTML = listHTML;
  }
});
