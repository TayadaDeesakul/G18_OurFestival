document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("feedbackForm");
    const ratingDisplay = document.getElementById("ratingDisplay");

    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        const satisfaction = document.querySelector('input[name="satisfaction"]:checked');

        if (!satisfaction) {
            ratingDisplay.textContent = "No rating selected.";
            alert("Please select a satisfaction rating before submitting.");
            return;
        }

        const rating = satisfaction.value;

        const formData = {
            type: "feedback",
            fullname: document.getElementById("name").value,
            email: document.getElementById("email").value,
            satisfaction: rating,
            message: document.getElementById("feedback").value
        };

        try {
            const res = await fetch("submit.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            if (data.status === "success") {
                ratingDisplay.textContent = `You rated: ${rating}`;
                alert(`Thank you! Your rating of ${rating} has been recorded.`);
                form.reset();
            } else {
                alert("Error: " + data.message);
            }
        } catch (err) {
            alert("Cannot connect to server: " + err);
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("show");
    });
});