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


document.addEventListener('DOMContentLoaded', function(){
  const btn = document.querySelector('.nav-toggle');
  const menu = document.querySelector('.nav-items');
  if (!btn || !menu) return;
  btn.addEventListener('click', function(e){
    e.stopPropagation();
    const isOpen = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', (!isOpen).toString());
    menu.style.display = isOpen ? 'none' : 'flex';
  });
  // ปิดเมนูเมื่อคลิกนอก
  document.addEventListener('click', function(ev){
    if (!menu.contains(ev.target) && !btn.contains(ev.target)) {
      menu.style.display = 'none';
      btn.setAttribute('aria-expanded', 'false');
    }
  });
  // ปรับให้ซ่อนเมนูเมื่อรีไซส์ขึ้นเป็น desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      menu.style.display = 'flex';
      btn.setAttribute('aria-expanded', 'false');
    } else {
      menu.style.display = 'none';
    }
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const btn = document.querySelector('.nav-toggle');
  const menu = document.querySelector('.nav-items');

  // ป้องกัน error ถ้าไม่เจอ element
  if (!btn || !menu) return;

  // เปิด–ปิดเมนู
  btn.addEventListener('click', function (e) {
    e.stopPropagation();
    menu.classList.toggle('open');
    btn.setAttribute(
      'aria-expanded',
      menu.classList.contains('open') ? 'true' : 'false'
    );
  });

  // ปิดเมนูเมื่อคลิกนอก
  document.addEventListener(
    'click',
    function (evt) {
      if (!menu.contains(evt.target) && !btn.contains(evt.target)) {
        menu.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      }
    },
    true
  );

  // รีเซ็ตเมื่อขยายจอกลับเป็น desktop
  window.addEventListener('resize', function () {
    if (window.innerWidth > 768) {
      menu.classList.remove('open');
      menu.style.display = 'flex';
    } else {
      menu.style.display = '';
    }
  });
});
