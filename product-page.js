const wrapper = document.querySelector(".scroller-wrapper");
const scroller = document.querySelector(".feature-card-scroller");
const featureTag = document.querySelector(".feature-tag");

// Clone the scrollers multiple times for smooth infinite scroll
const cloneCount = 3;
for (let i = 0; i < cloneCount; i++) {
  const clone = scroller.cloneNode(true);
  wrapper.appendChild(clone);
}

let y = 0;
const speed = 2;
let isPaused = false;

wrapper.addEventListener(
  "mouseenter",
  (e) => {
    if (e.target.classList.contains("feature-card")) {
      isPaused = true;

      const cardId = e.target.id;
      const cardText = e.target.querySelector(".feature-card-text");
      if (cardText) {
        fadeAndSlideText(featureTag, cardText.textContent);
        changeDescriptionText(cardId);
      }
    }
  },
  true,
);

wrapper.addEventListener(
  "mouseleave",
  (e) => {
    if (e.target.classList.contains("feature-card")) {
      isPaused = false;
    }
  },
  true,
);

// Wait for layout to settle, then calculate heights
setTimeout(() => {
  const allScrollers = wrapper.querySelectorAll(".feature-card-scroller");

  // Calculate the height of the original set (first 2 scrollers + gap)
  const firstScrollerHeight = allScrollers[0].offsetHeight;
  const secondScrollerHeight = allScrollers[1].offsetHeight;
  const gap = 30; // The gap between scrollers from CSS

  const resetHeight = firstScrollerHeight + gap + secondScrollerHeight + gap;

  function animate() {
    if (!isPaused) {
      y -= speed;

      // Reset seamlessly when we've scrolled one complete set
      if (Math.abs(y) >= resetHeight) {
        y = y + resetHeight;
      }

      wrapper.style.transform = `translateY(${y}px)`;
    }

    requestAnimationFrame(animate);
  }

  animate();
}, 100);

let isAnimating = false;

function fadeAndSlideText(element, newText) {
  if (isAnimating) return;
  isAnimating = true;

  element.style.transition = "opacity 0.3s ease, transform 0.3s ease";
  element.style.opacity = "0";
  element.style.transform = "translateY(-20px)";

  setTimeout(() => {
    element.textContent = newText;
    element.style.transform = "translateY(20px)";

    element.offsetHeight;

    element.style.opacity = "1";
    element.style.transform = "translateY(0)";

    setTimeout(() => {
      isAnimating = false;
    }, 300);
  }, 300);
}

function changeDescriptionText(cardId) {
  descriptionElement = document.querySelector(".feature-description");

  switch (cardId) {
    case "event-reminders":
      descriptionElement.textContent =
        "Never miss another exciting event again. Function keeps you updated with timely reminders for all your upcoming gatherings whether it's a community meetup, concert, or local workshop. You'll always know when and where to be, so you can focus on enjoying the moment, not worrying about the details.";
      break;
    case "event-rsvps":
      descriptionElement.textContent =
        "Easily RSVP to your favorite events directly through Function. Free users can join up to three events each month, while premium members enjoy unlimited access. Whether you're exploring new experiences or planning a busy social calendar, managing your attendance has never been simpler.";
      break;
    case "swipe-for-nearby-events":
      descriptionElement.textContent =
        "Discover what's happening around you with just a swipe. Function uses location-based discovery to help you find local events, from cozy community gatherings to major city festivals. It's a fun and effortless way to explore your surroundings and meet people who share your interests.";
      break;
    case "personalized-recomendations":
      descriptionElement.textContent =
        "Your time is valuable! that's why Function learns what you love. Receive customized event suggestions based on your preferences, past RSVPs, and favorite categories. The more you use the app, the smarter it gets at finding events that truly match your vibe.";
      break;
    case "community-newsletter":
      descriptionElement.textContent =
        "Stay connected with the latest happenings from the Function community. Get exclusive event previews, stories, and highlights from members across the city — all delivered straight to your inbox. It's your inside look into what's trending and what's next in your local scene.";
      break;
    case "community-and-perks":
      descriptionElement.textContent =
        "Engage with like-minded people through chat groups and shared interests. Join conversations, exchange ideas, and make meaningful connections that go beyond the event. Plus, enjoy exclusive perks like Uber discounts to make getting there even easier. Function isn't just an app — it's your social hub.";
      break;
  }
}
