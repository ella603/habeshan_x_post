document.addEventListener("DOMContentLoaded", function () {

  const likeButtons = document.querySelectorAll(".like-btn");

  likeButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const count = button.querySelector("span");

      if (count) {
        count.textContent = Number(count.textContent) + 1;
      }
    });
  });


  const commentButtons = document.querySelectorAll(".comment-btn");

  commentButtons.forEach(function (button) {
    button.addEventListener("click", function () {

      const post = button.closest(".post");

      if (!post) return;

      const commentBox = post.querySelector(".comment-box");

      if (commentBox) {
        commentBox.classList.toggle("show");
      }
    });
  });


  const sendButtons = document.querySelectorAll(".send-comment");

  sendButtons.forEach(function (button) {
    button.addEventListener("click", function () {

      const post = button.closest(".post");

      if (!post) return;

      const input = post.querySelector("input");
      const comments = post.querySelector(".comments");

      if (!input || !comments) return;

      const text = input.value.trim();

      if (text === "") return;

      const comment = document.createElement("div");

      comment.className = "comment-item";
      comment.textContent = text;

      comments.appendChild(comment);

      input.value = "";
    });
  });


  const shareButtons = document.querySelectorAll(".share-btn");

  shareButtons.forEach(function (button) {
    button.addEventListener("click", async function () {

      const post = button.closest(".post");

      if (!post) return;

      const titleElement = post.querySelector("h3");

      const title = titleElement
        ? titleElement.textContent
        : "Habeshan X Post";

      if (navigator.share) {

        try {
          await navigator.share({
            title: "Habeshan X Post",
            text: title,
            url: window.location.href
          });
        } catch (error) {}

      } else {

        try {
          await navigator.clipboard.writeText(window.location.href);
          alert("Post link copied!");
        } catch (error) {
          alert("Copy the website link from your browser.");
        }
      }
    });
  });


  const searchInput = document.getElementById("searchInput");

  if (searchInput) {

    searchInput.addEventListener("input", function () {

      const searchText = searchInput.value.toLowerCase();

      document.querySelectorAll(".post").forEach(function (post) {

        const text = post.textContent.toLowerCase();

        post.style.display =
          text.includes(searchText) ? "" : "none";
      });
    });
  }


  const navButtons = document.querySelectorAll(".nav-btn");

  navButtons.forEach(function (button) {

    button.addEventListener("click", function () {

      navButtons.forEach(function (btn) {
        btn.classList.remove("active");
      });

      button.classList.add("active");

      const filter = button.dataset.filter;

      document.querySelectorAll(".post").forEach(function (post) {

        if (filter === "all") {
          post.style.display = "";
        } else {
          post.style.display =
            post.dataset.category === filter ? "" : "none";
        }
      });
    });
  });


  const themeButton = document.getElementById("themeBtn");

  if (themeButton) {

    themeButton.addEventListener("click", function () {

      document.body.classList.toggle("light-mode");

      if (document.body.classList.contains("light-mode")) {

        document.body.style.background = "#f4f4f7";
        document.body.style.color = "#111";

        themeButton.textContent = "☀️ Light";

      } else {

        document.body.style.background = "";
        document.body.style.color = "";

        themeButton.textContent = "🌙 Theme";
      }
    });
  }


  const loadMoreButton = document.getElementById("loadMore");

  if (loadMoreButton) {

    loadMoreButton.addEventListener("click", function () {

      alert("More posts will be available soon!");

    });
  }

});
