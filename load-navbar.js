// Load navbar and highlight active page
function loadNavbar() {
  fetch("navbar.html")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Navbar not found");
      }
      return response.text();
    })
    .then((data) => {
      // Insert navbar HTML into the placeholder
      document.getElementById("navbar-placeholder").innerHTML = data;
    })
    .catch((error) => {
      console.error("Error loading navbar:", error);
    });
}

// Load navbar when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", loadNavbar);
} else {
  loadNavbar();
}
