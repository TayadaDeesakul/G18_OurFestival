const snowContainer = document.createElement("div");
snowContainer.classList.add("snow-container");
document.body.appendChild(snowContainer);

function createSnowflake() {
  const snowflake = document.createElement("span");
  snowflake.classList.add("snowflake");
  snowflake.textContent = "❄";

  // สุ่มขนาดและตำแหน่ง
  snowflake.style.left = Math.random() * window.innerWidth + "px";
  snowflake.style.fontSize = 10 + Math.random() * 20 + "px";
  snowflake.style.opacity = Math.random();
  snowflake.style.animationDuration = 5 + Math.random() * 10 + "s";

  snowContainer.appendChild(snowflake);

  setTimeout(() => {
    snowflake.remove();
  }, 15000);
}

setInterval(createSnowflake, 150);
