const photo = document.getElementById("photo");
const nameEl = document.getElementById("name");
const roleEl = document.getElementById("role");
const bioEl = document.getElementById("bio");

const list = document.getElementById("list");
const members = Array.from(document.querySelectorAll(".member"));

function activate(el, setFocus = false) {
    members.forEach((m) => {
        m.classList.remove("active");
        m.setAttribute("aria-selected", "false");
    });
    el.classList.add("active");
    el.setAttribute("aria-selected", "true");

    const nextSrc = el.dataset.img;
    const nextName = el.dataset.name;
    const nextRole = el.dataset.role;
    const nextBio = el.dataset.bio;

    photo.src = nextSrc;
    photo.alt = `${nextName} portrait`;

    nameEl.textContent = nextName;
    roleEl.textContent = nextRole;
    bioEl.textContent = nextBio;

    if (setFocus) el.focus();
}

members.forEach((el) => {
    el.addEventListener("click", () => activate(el));
    el.addEventListener("mouseenter", () => activate(el));
    el.addEventListener("focus", () => activate(el));
});

activate(members[0]);
