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
const speed = 0.5;
let isPaused = false;

wrapper.addEventListener(
  "mouseenter",
  (e) => {
    if (e.target.classList.contains("feature-card")) {
      isPaused = true;

      const cardText = e.target.querySelector(".feature-card-text");
      if (cardText) {
        featureTag.textContent = cardText.textContent;
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
  const gap = 50; // The gap between scrollers from CSS

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
