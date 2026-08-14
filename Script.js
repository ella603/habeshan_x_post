document.addEventListener("DOMContentLoaded", function () {

  /* LIKE BUTTON */

  const likeButtons = document.querySelectorAll(".like-btn");

  likeButtons.forEach(function (button) {
    button.addEventListener("click", function () {

      let count = Number(button.querySelector("span").textContent);

      count++;

      button.querySelector("span").textContent = count;
    });
  });


  /* COMMENT BUTTON */

  const commentButtons = document.querySelectorAll(".comment-btn");

  commentButtons.forEach(function (button) {

    button.addEventListener("click", function () {

      const post = button.closest(".post");
      const commentBox = post.querySelector(".comment-box");

      commentBox.classList.toggle("show");
    });

  });


  /* SEND COMMENT */

  const sendButtons = document.querySelectorAll(".send-comment");

  sendButtons.forEach(function (button) {

    button.addEventListener("click", function () {

      const post = button.closest(".post");
      const input = post.querySelector("input");
      const comments = post.querySelector(".comments");

      const text = input.value.trim();

      if (text === "") {
        return;
      }

      const comment = document.createElement("div");

      comment.className = "comment-item";
      comment.textContent = text;

      comments.appendChild(comment);

      input.value = "";
    });

  });


  /* SHARE */

  const shareButtons = document.querySelectorAll(".share-btn");

  shareButtons.forEach(function (button) {

    button.addEventListener("click", async function () {

      const post = button.closest(".post");
      const title = post.querySelector("h3").textContent;

      if (navigator.share) {

        try {

          await navigator.share({
            title: "Habeshan X Post",
            text: title,
            url: window.location.href
          });

        } catch (error) {
          // Share cancelled
        }

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


  /* SEARCH */

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


  /* CATEGORY FILTER */

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


  /* DARK / LIGHT THEME */

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


  /* LOAD MORE */

  const loadMoreButton = document.getElementById("loadMore");

  if (loadMoreButton) {

    loadMoreButton.addEventListener("click", function () {

      alert("More posts will be available soon!");

    });

  }

});
