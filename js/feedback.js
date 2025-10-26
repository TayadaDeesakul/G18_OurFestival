document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("feedbackForm");
    const ratingDisplay = document.getElementById("ratingDisplay");

    const savedRating = localStorage.getItem("userRating");
    if (savedRating) {
        ratingDisplay.textContent = `Your last rating was: ${savedRating}`;
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault(); 

        const satisfaction = document.querySelector('input[name="satisfaction"]:checked');

        if (satisfaction) {
            const rating = satisfaction.value;
            ratingDisplay.textContent = `You rated: ${rating}`;
            
            localStorage.setItem("userRating", rating);

            alert(`Thank you! Your rating of ${rating} has been recorded.`);
        } else {
            ratingDisplay.textContent = "No rating selected.";
            alert("Please select a satisfaction rating before submitting.");
        }

        form.reset();
    });
});