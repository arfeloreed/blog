document.addEventListener("DOMContentLoaded", () => {
  let path = window.location.pathname;
  let homePage = document.getElementById("nav-home");
  let createPostPage = document.getElementById("nav-create-post");

  if (path === "/") homePage.classList.add("active");
  else if (path === "/create-post") createPostPage.classList.add("active");
});

// get year for automatic display
document.getElementById("year").innerText = new Date().getFullYear();
