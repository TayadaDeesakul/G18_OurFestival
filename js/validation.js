document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("regForm");
  const resultDiv = document.getElementById("result");
  const registeredListDiv = document.getElementById("registeredList");

  let visitors = [];

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      return;
    }

    const name = document.getElementById("fullname").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const age = document.getElementById("age").value;
    const gender = form.querySelector('input[name="gender"]:checked')?.value || "Not specified";
    const date = document.getElementById("dateAtd").value;

    const visitor = { name, email, phone, age, gender, date };
    visitors.push(visitor);

    showResult(visitor);
    updateVisitorList();
    form.reset();
    form.classList.remove("was-validated");
  });

  function showResult(visitor) {
    resultDiv.innerHTML = `
      <div class="alert alert-success">
        <strong>Thank you, ${visitor.name}!</strong> You've successfully registered for the festival.
      </div>
    `;
  }

  function updateVisitorList() {
    registeredListDiv.innerHTML = `
      <h4>Registered Visitors (${visitors.length})</h4>
      <ul class="list-group">
        ${visitors.map(v => `<li class="list-group-item">${v.name} (${v.age}, ${v.gender}) - ${v.date || "No date selected"}</li>`).join("")}
      </ul>
    `;
  }
});
