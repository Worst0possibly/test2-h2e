const header=document.getElementById("header");
const hero=document.getElementById("hero");
const sectionContents=document.querySelectorAll(".sec-content");
const Sbtn=document.getElementById("subjectBtn");
const SingUpBtn=document.getElementById("SBtn");
const LogInBtn=document.getElementById("LBtn");
const SignUpD=document.getElementById("SignInOverlay");
const LogInD=document.getElementById("LogInOverlay");
const passwordFields=document.querySelectorAll('input[type="password"]');
passwordFields.forEach((field) => {
    field.addEventListener("input", () => {
        field.value = field.value.replace(/\s/g, "");
        field.setCustomValidity("");
    });

    field.addEventListener("change", () => {
        if (field.value.length < 5) {
            field.setCustomValidity("Password must be at least 5 characters");
        } else {
            field.setCustomValidity("");
        }
    });
});
const signupForm = document.getElementById("SignUpForm");
if (signupForm) {
    signupForm.addEventListener("submit", (event) => {
        const password = signupForm.querySelector('input[type="password"]');
        const classSelect = signupForm.querySelector('select[name="class"]');

        if (!signupForm.checkValidity()) {
            event.preventDefault();
            signupForm.reportValidity();
            return;
        }
        if (password && password.value.length < 5) {
            event.preventDefault();
            password.focus();
            password.setCustomValidity("Password must be at least 5 characters");
            password.reportValidity();
            return;
        }
        if (password) {
            password.setCustomValidity("");
        }
        event.preventDefault();
        const selectedClass = classSelect && classSelect.value === "12" ? "12" : "10";
        window.location.href = selectedClass === "12" ? "class12.html" : "class10.html";
    });
}
if (SingUpBtn && SignUpD && LogInD) {
    SingUpBtn.addEventListener("click", () => {
        if (SignUpD.open) SignUpD.close();
        LogInD.showModal();
    });
}
if (LogInBtn && SignUpD && LogInD) {
    LogInBtn.addEventListener("click", () => {
        if (LogInD.open) LogInD.close();
        SignUpD.showModal();
    });
}
if (header && hero) {
    const handleScroll = () => {
        header.classList.toggle("scrolled", window.scrollY > 80);
        hero.classList.toggle("scrolled", window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
}
const cards = [...document.querySelectorAll(".card")];
let current = 0;
function update() {
    const radius = 1100;
    const cardAngle = 18;
    cards.forEach((card, index) => {
        let offset = index - current;
        if (offset > cards.length / 2)
            offset -= cards.length;
        if (offset < -cards.length / 2)
            offset += cards.length;
        const angle = offset * cardAngle;
        const rad = angle * Math.PI / 180;
        const x = Math.sin(rad) * radius;
        const z = Math.cos(rad) * 140;
        const y = Math.abs(offset) * 10;
        const rotate = -angle * 0.8;
        let scale = 1 - Math.abs(offset) * 0.12;
        scale = Math.max(scale, 0.7);
        let opacity = 1 - Math.abs(offset) * 0.2;
        opacity = Math.max(opacity, 0.35);
        if (Math.abs(offset) > 2) {
            opacity = 0;
            card.style.pointerEvents = "none";
        } else {
            card.style.pointerEvents = "auto";
        }
        card.style.transform = `
            translate(-50%, -50%)
            translateX(${x}px)
            translateY(${y}px)
            translateZ(${z}px)
            rotateY(${rotate}deg)
            scale(${scale})
        `;
        card.style.opacity = opacity;
        card.style.zIndex = 100 - Math.abs(offset);
        if (offset === 0) {
            card.style.boxShadow = "0 30px 60px rgba(0,0,0,.25)";
        } else {
            card.style.boxShadow = "0 12px 25px rgba(0,0,0,.12)";
        }
    });
}
if (cards.length) {
    update();
    const nextBtn = document.querySelector(".next");
    const prevBtn = document.querySelector(".prev");
    nextBtn?.addEventListener("click", () => {
        current = (current + 1) % cards.length;
        update();
    });
    prevBtn?.addEventListener("click", () => {
        current = (current - 1 + cards.length) % cards.length;
        update();
    });
    function nextSlide() {
        current = (current + 1) % cards.length;
        update();
    }
    let timer = setInterval(nextSlide, 2900);
    const carousel = document.querySelector(".carousel");
    if (carousel) {
        carousel.addEventListener("mouseenter", () => {
            clearInterval(timer);
        });
        carousel.addEventListener("mouseleave", () => {
            clearInterval(timer);
            timer = setInterval(nextSlide, 2900);
        });
    }
}
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }else{
            entry.target.classList.remove("show");
        }
    });
}, {
    threshold: 0.2
});
sectionContents.forEach(card => {
    observer.observe(card);
});
Sbtn.onclick=()=>{
    document.getElementById('Subject-sec').scrollIntoView({behavior:'smooth'})
}