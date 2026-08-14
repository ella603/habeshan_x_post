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

        if (
          filter === "all" ||
          post.dataset.category === filter
        ) {
          post.style.display = "";
        } else {
          post.style.display = "none";
        }

      });

    });

  });


  // Upload / Preview Post
  const previewBtn = document.getElementById("previewBtn");
  const mediaInput = document.getElementById("mediaInput");
  const postTitle = document.getElementById("postTitle");
  const postDescription = document.getElementById("postDescription");
  const uploadPreview = document.getElementById("uploadPreview");

  if (previewBtn) {

    previewBtn.addEventListener("click", function () {

      const file = mediaInput.files[0];

      if (!file) {
        alert("Please select a photo or video first.");
        return;
      }

      const title =
        postTitle.value.trim() || "New Post";

      const description =
        postDescription.value.trim() ||
        "New content from Habeshan X Post.";

      const fileURL = URL.createObjectURL(file);

      uploadPreview.innerHTML = "";

      const previewPost = document.createElement("div");

      previewPost.className = "post";

      const titleElement = document.createElement("h3");
      titleElement.textContent = title;

      const descriptionElement = document.createElement("p");
      descriptionElement.textContent = description;

      uploadPreview.appendChild(previewPost);

      previewPost.appendChild(titleElement);

      if (file.type.startsWith("image/")) {

        const image = document.createElement("img");

        image.src = fileURL;
        image.alt = title;

        image.style.width = "100%";
        image.style.borderRadius = "12px";

        previewPost.appendChild(image);

      } else if (file.type.startsWith("video/")) {

        const video = document.createElement("video");

        video.src = fileURL;
        video.controls = true;

        video.style.width = "100%";
        video.style.borderRadius = "12px";

        previewPost.appendChild(video);

      }

      previewPost.appendChild(descriptionElement);

    });

  }

});
