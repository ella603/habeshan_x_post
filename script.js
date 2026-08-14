document.addEventListener("DOMContentLoaded", function () {

  // =========================
  // THEME
  // =========================

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


  // =========================
  // LIKE
  // =========================

  const likeButtons = document.querySelectorAll(".like-btn");

  likeButtons.forEach(function (button) {

    button.addEventListener("click", function () {

      const count = button.querySelector("span");

      let likes = Number(count.textContent);

      likes++;

      count.textContent = likes;

    });

  });


  // =========================
  // COMMENTS
  // =========================

  const commentButtons =
    document.querySelectorAll(".comment-btn");

  commentButtons.forEach(function (button) {

    button.addEventListener("click", function () {

      const post = button.closest(".post");

      const commentBox =
        post.querySelector(".comment-box");

      commentBox.classList.toggle("show");

    });

  });


  const sendButtons =
    document.querySelectorAll(".send-comment");

  sendButtons.forEach(function (button) {

    button.addEventListener("click", function () {

      const post = button.closest(".post");

      const input =
        post.querySelector("input");

      const comments =
        post.querySelector(".comments");

      const text =
        input.value.trim();

      if (text !== "") {

        const newComment =
          document.createElement("p");

        newComment.textContent =
          "💬 " + text;

        comments.appendChild(newComment);

        input.value = "";

      }

    });

  });


  // =========================
  // SHARE
  // =========================

  const shareButtons =
    document.querySelectorAll(".share-btn");

  shareButtons.forEach(function (button) {

    button.addEventListener("click", function () {

      if (navigator.share) {

        navigator.share({
          title: "Habeshan X Post",
          text: "Check out Habeshan X Post",
          url: window.location.href
        });

      } else {

        alert(
          "Share is not available on this device."
        );

      }

    });

  });


  // =========================
  // SEARCH
  // =========================

  const searchInput =
    document.getElementById("searchInput");

  if (searchInput) {

    searchInput.addEventListener("input", function () {

      const searchText =
        searchInput.value.toLowerCase();

      const posts =
        document.querySelectorAll(".post");

      posts.forEach(function (post) {

        const text =
          post.textContent.toLowerCase();

        if (text.includes(searchText)) {

          post.style.display = "";

        } else {

          post.style.display = "none";

        }

      });

    });

  }


  // =========================
  // NAVIGATION FILTER
  // =========================

  const navButtons =
    document.querySelectorAll(".nav-btn");

  navButtons.forEach(function (button) {

    button.addEventListener("click", function () {

      navButtons.forEach(function (btn) {

        btn.classList.remove("active");

      });

      button.classList.add("active");

      const filter =
        button.dataset.filter;

      const posts =
        document.querySelectorAll(".post");

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


  // =========================
  // CREATE POST
  // =========================

  const previewBtn =
    document.getElementById("previewBtn");

  const publishBtn =
    document.getElementById("publishBtn");

  const mediaInput =
    document.getElementById("mediaInput");

  const postTitle =
    document.getElementById("postTitle");

  const postDescription =
    document.getElementById("postDescription");

  const uploadPreview =
    document.getElementById("uploadPreview");

  let selectedFileURL = null;


  // =========================
  // PREVIEW POST
  // =========================

  if (previewBtn) {

    previewBtn.addEventListener("click", function () {

      const file =
        mediaInput.files[0];

      if (!file) {

        alert(
          "Please select a photo or video first."
        );

        return;

      }

      const title =
        postTitle.value.trim() ||
        "New Post";

      const description =
        postDescription.value.trim() ||
        "New content from Habeshan X Post.";

      selectedFileURL =
        URL.createObjectURL(file);

      uploadPreview.innerHTML = "";

      const previewPost =
        document.createElement("article");

      previewPost.className = "post";

      const titleElement =
        document.createElement("h3");

      titleElement.textContent =
        title;

      const descriptionElement =
        document.createElement("p");

      descriptionElement.textContent =
        description;

      uploadPreview.appendChild(
        previewPost
      );

      previewPost.appendChild(
        titleElement
      );


      if (file.type.startsWith("image/")) {

        const image =
          document.createElement("img");

        image.src =
          selectedFileURL;

        image.alt =
          title;

        image.style.width =
          "100%";

        image.style.borderRadius =
          "12px";

        previewPost.appendChild(
          image
        );

      }


      else if (file.type.startsWith("video/")) {

        const video =
          document.createElement("video");

        video.src =
          selectedFileURL;

        video.controls =
          true;

        video.style.width =
          "100%";

        video.style.borderRadius =
          "12px";

        previewPost.appendChild(
          video
        );

      }


      previewPost.appendChild(
        descriptionElement
      );

    });

  }


  // =========================
  // PUBLISH POST
  // =========================

  if (publishBtn) {

    publishBtn.addEventListener("click", function () {

      const file =
        mediaInput.files[0];

      if (!file) {

        alert(
          "Please select a photo or video first."
        );

        return;

      }

      const title =
        postTitle.value.trim() ||
        "New Post";

      const description =
        postDescription.value.trim() ||
        "New content from Habeshan X Post.";

      const fileURL =
        URL.createObjectURL(file);


      const post =
        document.createElement("article");

      post.className =
        "post";

      post.dataset.category =
        "latest";


      // Media

      const media =
        document.createElement("div");

      media.className =
        "post-media";


      if (file.type.startsWith("image/")) {

        const image =
          document.createElement("img");

        image.src =
          fileURL;

        image.alt =
          title;

        image.style.width =
          "100%";

        image.style.borderRadius =
          "12px";

        media.appendChild(
          image
        );

      }


      else if (file.type.startsWith("video/")) {

        const video =
          document.createElement("video");

        video.src =
          fileURL;

        video.controls =
          true;

        video.style.width =
          "100%";

        video.style.borderRadius =
          "12px";

        media.appendChild(
          video
        );

      }


      // Content

      const content =
        document.createElement("div");

      content.className =
        "post-content";


      const meta =
        document.createElement("div");

      meta.className =
        "post-meta";

      meta.innerHTML =
        "<span>🆕 Latest</span><span>Just now</span>";


      const heading =
        document.createElement("h3");

      heading.textContent =
        title;


      const text =
        document.createElement("p");

      text.textContent =
        description;


      // Actions

      const actions =
        document.createElement("div");

      actions.className =
        "post-actions";


      const like =
        document.createElement("button");

      like.className =
        "like-btn";

      like.innerHTML =
        "❤️ <span>0</span>";


      const comment =
        document.createElement("button");

      comment.className =
        "comment-btn";

      comment.textContent =
        "💬 Comment";


      const share =
        document.createElement("button");

      share.className =
        "share-btn";

      share.textContent =
        "🔗 Share";


      actions.appendChild(like);
      actions.appendChild(comment);
      actions.appendChild(share);


      // Comment box

      const commentBox =
        document.createElement("div");

      commentBox.className =
        "comment-box";


      const commentInput =
        document.createElement("input");

      commentInput.type =
        "text";

      commentInput.placeholder =
        "Write a comment...";


      const send =
        document.createElement("button");

      send.className =
        "send-comment";

      send.textContent =
        "Send";


      const comments =
        document.createElement("div");

      comments.className =
        "comments";


      commentBox.appendChild(
        commentInput
      );

      commentBox.appendChild(
        send
      );

      commentBox.appendChild(
        comments
      );


      // Build post

      content.appendChild(meta);

      content.appendChild(heading);

      content.appendChild(text);

      content.appendChild(actions);

      content.appendChild(commentBox);

      post.appendChild(media);

      post.appendChild(content);


      const posts =
        document.getElementById("posts");

      posts.prepend(post);


      // Clear form

      postTitle.value =
        "";

      postDescription.value =
        "";

      mediaInput.value =
        "";

      uploadPreview.innerHTML =
        "";


      // Make new Like button work

      like.addEventListener("click", function () {

        const count =
          like.querySelector("span");

        count.textContent =
          Number(count.textContent) + 1;

      });


      // Make new Comment button work

      comment.addEventListener("click", function () {

        commentBox.classList.toggle(
          "show"
        );

      });


      // Make new Send button work

      send.addEventListener("click", function () {

        const value =
          commentInput.value.trim();

        if (value !== "") {

          const newComment =
            document.createElement("p");

          newComment.textContent =
            "💬 " + value;

          comments.appendChild(
            newComment
          );

          commentInput.value =
            "";

        }

      });


      // Make new Share button work

      share.addEventListener("click", function () {

        if (navigator.share) {

          navigator.share({
            title: title,
            text: description,
            url: window.location.href
          });

        } else {

          alert(
            "Share is not available on this device."
          );

        }

      });


      alert(
        "✅ Post published successfully!"
      );

    });

  }

});
