document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("feedbackForm");
    const ratingDisplay = document.getElementById("ratingDisplay");

    const savedRating = localStorage.getItem("userRating");
    if (savedRating) {
        ratingDisplay.textContent = `Your last rating was: ${savedRating}`;
    }

    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        const fullname = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const satisfaction = document.querySelector('input[name="satisfaction"]:checked');
        const feedback = document.getElementById("feedback").value.trim();

        if (!satisfaction) {
            alert("Please select a satisfaction rating.");
            return;
        }

        const rating = satisfaction.value;

        ratingDisplay.textContent = `You rated: ${rating}`;

        localStorage.setItem("userRating", rating);

        const formData = {
            fullname: fullname,
            email: email,
            rating: rating,
            feedback: feedback
        };

        try {
            const res = await fetch("feedback.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            if (data.status === "success") {
                alert("Thank you! Your feedback has been saved.");
                form.reset();
            } else {
                alert("Error: " + data.message);
            }

        } catch (err) {
            alert("Server error: " + err);
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