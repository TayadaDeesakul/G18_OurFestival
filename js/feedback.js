document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("feedbackForm");
    const ratingDisplay = document.getElementById("ratingDisplay");

    // โหลด rating ที่เคยเลือกไปก่อนหน้า
    const savedRating = localStorage.getItem("userRating");
    if (savedRating) ratingDisplay.textContent = `Your last rating was: ${savedRating}`;

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

        const formData = { fullname, email, rating, feedback };

        try {
            const res = await fetch("http://44.211.32.196/G18_OurFestival/feedback.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            if (!res.ok) throw new Error(`HTTP ${res.status}`);

            const data = await res.json();

            if (data.status === "success") {
                alert("ขอบคุณค่ะ! ระบบบันทึกข้อมูลเรียบร้อยแล้ว");
                form.reset();
            } else {
                alert("Error: " + data.message);
            }

        } catch (err) {
            alert("เกิดข้อผิดพลาด: " + err);
        }
    });
});
