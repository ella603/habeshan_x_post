document.addEventListener("DOMContentLoaded", function () {

  // Theme
  const themeBtn = document.getElementById("themeBtn");

  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      document.body.classList.toggle("dark-mode");

      if (document.body.classList.contains("dark-mode")) {
        themeBtn.textContent = "☀️ Light";
      } else {
        themeBtn.textContent = "🌙 Theme";
      }
    });
  }

  // Like buttons
  const likeButtons = document.querySelectorAll(".like-btn");

  likeButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const count = button.querySelector("span");
      let likes = Number(count.textContent);

      likes++;
      count.textContent = likes;
    });
  });

  // Comment buttons
  const commentButtons = document.querySelectorAll(".comment-btn");

  commentButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const post = button.closest(".post");
      const commentBox = post.querySelector(".comment-box");

      commentBox.classList.toggle("show");
    });
  });

  // Send comments
  const sendButtons = document.querySelectorAll(".send-comment");

  sendButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const post = button.closest(".post");
      const input = post.querySelector("input");
      const comments = post.querySelector(".comments");

      const text = input.value.trim();

      if (text !== "") {
        const newComment = document.createElement("p");
        newComment.textContent = "💬 " + text;

        comments.appendChild(newComment);
        input.value = "";
      }
    });
  });

  // Share buttons
  const shareButtons = document.querySelectorAll(".share-btn");

  shareButtons.forEach(function (button) {
    button.addEventListener("click", function () {

      if (navigator.share) {
        navigator.share({
          title: "Habeshan X Post",
          text: "Check out Habeshan X Post",
          url: window.location.href
        });
      } else {
        alert("Share is not available on this device.");
      }

    });
  });

  // Search
  const searchInput = document.getElementById("searchInput");

  if (searchInput) {
    searchInput.addEventListener("input", function () {
      const searchText = searchInput.value.toLowerCase();
      const posts = document.querySelectorAll(".post");

      posts.forEach(function (post) {
        const text = post.textContent.toLowerCase();

        if (text.includes(searchText)) {
          post.style.display = "";
        } else {
          post.style.display = "none";
        }
      });
    });
  }

  // Navigation filters
  const navButtons = document.querySelectorAll(".nav-btn");

  navButtons.forEach(function (button) {
    button.addEventListener("click", function () {

      navButtons.forEach(function (btn) {
        btn.classList.remove("active");
      });

      button.classList.add("active");

      const filter = button.dataset.filter;
      const posts = document.querySelectorAll(".post");

      posts.forEach(function (post) {

        if (filter === "all" || post.dataset.category === filter) {
          post.style.display = "";
        } else {
          post.style.display = "none";
        }

      });

    });
  });

});
