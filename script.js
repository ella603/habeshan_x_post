document.addEventListener("DOMContentLoaded", function () {

  // =========================
  // THEME
  // =========================

  const themeBtn = document.getElementById("themeBtn");

  if (themeBtn) {
    themeBtn.addEventListener("click", function () {

      document.body.classList.toggle("dark-mode");

      themeBtn.textContent =
        document.body.classList.contains("dark-mode")
          ? "☀️ Light"
          : "🌙 Theme";

    });
  }


  // =========================
  // HELPERS
  // =========================

  function addPostButtons(post) {

    const like = post.querySelector(".like-btn");
    const comment = post.querySelector(".comment-btn");
    const share = post.querySelector(".share-btn");
    const send = post.querySelector(".send-comment");

    if (like) {
      like.addEventListener("click", function () {

        const count = like.querySelector("span");

        count.textContent =
          Number(count.textContent) + 1;

      });
    }

    if (comment) {
      comment.addEventListener("click", function () {

        const box = post.querySelector(".comment-box");

        if (box) {
          box.classList.toggle("show");
        }

      });
    }

    if (send) {
      send.addEventListener("click", function () {

        const box = post.querySelector(".comment-box");
        const input = box.querySelector("input");
        const comments = box.querySelector(".comments");

        const value = input.value.trim();

        if (value !== "") {

          const newComment =
            document.createElement("p");

          newComment.textContent =
            "💬 " + value;

          comments.appendChild(newComment);

          input.value = "";

        }

      });
    }

    if (share) {
      share.addEventListener("click", function () {

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
    }

  }


  // =========================
  // EXISTING POSTS
  // =========================

  document.querySelectorAll(".post").forEach(function (post) {
    addPostButtons(post);
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

      document.querySelectorAll(".post").forEach(function (post) {

        const text =
          post.textContent.toLowerCase();

        post.style.display =
          text.includes(searchText)
            ? ""
            : "none";

      });

    });

  }


  // =========================
  // NAVIGATION
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

      document.querySelectorAll(".post").forEach(function (post) {

        post.style.display =
          filter === "all" ||
          post.dataset.category === filter
            ? ""
            : "none";

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


  // =========================
  // FILE TO DATA URL
  // =========================

  function fileToDataURL(file) {

    return new Promise(function (resolve, reject) {

      const reader =
        new FileReader();

      reader.onload =
        function () {
          resolve(reader.result);
        };

      reader.onerror =
        function () {
          reject(reader.error);
        };

      reader.readAsDataURL(file);

    });

  }


  // =========================
  // PREVIEW
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

      const url =
        URL.createObjectURL(file);

      uploadPreview.innerHTML = "";

      const previewPost =
        document.createElement("article");

      previewPost.className =
        "post";

      const heading =
        document.createElement("h3");

      heading.textContent =
        title;

      previewPost.appendChild(heading);


      if (file.type.startsWith("image/")) {

        const image =
          document.createElement("img");

        image.src = url;

        image.alt = title;

        image.style.width = "100%";

        image.style.borderRadius = "12px";

        previewPost.appendChild(image);

      }


      if (file.type.startsWith("video/")) {

        const video =
          document.createElement("video");

        video.src = url;

        video.controls = true;

        video.style.width = "100%";

        video.style.borderRadius = "12px";

        previewPost.appendChild(video);

      }


      const text =
        document.createElement("p");

      text.textContent =
        description;

      previewPost.appendChild(text);

      uploadPreview.appendChild(
        previewPost
      );

    });

  }


  // =========================
  // LOAD SAVED POSTS
  // =========================

  function loadSavedPosts() {

    const saved =
      localStorage.getItem(
        "habeshanXPosts"
      );

    if (!saved) {
      return;
    }

    let posts;

    try {
      posts = JSON.parse(saved);
    } catch (error) {
      return;
    }

    const postsContainer =
      document.getElementById("posts");

    if (!postsContainer) {
      return;
    }

    posts.forEach(function (data) {

      createPostElement(
        data,
        postsContainer,
        false
      );

    });

  }


  // =========================
  // SAVE POSTS
  // =========================

  function savePost(data) {

    const saved =
      localStorage.getItem(
        "habeshanXPosts"
      );

    let posts = [];

    if (saved) {

      try {
        posts = JSON.parse(saved);
      } catch (error) {
        posts = [];
      }

    }

    posts.unshift(data);

    try {

      localStorage.setItem(
        "habeshanXPosts",
        JSON.stringify(posts)
      );

    } catch (error) {

      alert(
        "⚠️ Storage is full. Try a smaller photo/video."
      );

    }

  }


  // =========================
  // CREATE POST ELEMENT
  // =========================

  function createPostElement(
    data,
    postsContainer,
    addToStorage
  ) {

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


    if (data.type.startsWith("image/")) {

      const image =
        document.createElement("img");

      image.src =
        data.media;

      image.alt =
        data.title;

      image.style.width =
        "100%";

      image.style.borderRadius =
        "12px";

      media.appendChild(image);

    }


    else if (data.type.startsWith("video/")) {

      const video =
        document.createElement("video");

      video.src =
        data.media;

      video.controls =
        true;

      video.style.width =
        "100%";

      video.style.borderRadius =
        "12px";

      media.appendChild(video);

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
      "<span>🆕 Latest</span><span>" +
      data.date +
      "</span>";


    const heading =
      document.createElement("h3");

    heading.textContent =
      data.title;


    const text =
      document.createElement("p");

    text.textContent =
      data.description;


    // Actions

    const actions =
      document.createElement("div");

    actions.className =
      "post-actions";


    actions.innerHTML = `
      <button class="like-btn">
        ❤️ <span>0</span>
      </button>

      <button class="comment-btn">
        💬 Comment
      </button>

      <button class="share-btn">
        🔗 Share
      </button>
    `;


    // Comment box

    const commentBox =
      document.createElement("div");

    commentBox.className =
      "comment-box";

    commentBox.innerHTML = `
      <input
        type="text"
        placeholder="Write a comment..."
      >

      <button class="send-comment">
        Send
      </button>

      <div class="comments"></div>
    `;


    content.appendChild(meta);

    content.appendChild(heading);

    content.appendChild(text);

    content.appendChild(actions);

    content.appendChild(commentBox);

    post.appendChild(media);

    post.appendChild(content);


    postsContainer.prepend(post);


    addPostButtons(post);

  }


  // =========================
  // PUBLISH
  // =========================

  if (publishBtn) {

    publishBtn.addEventListener("click", async function () {

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


      try {

        const media =
          await fileToDataURL(file);


        const data = {

          title: title,

          description: description,

          media: media,

          type: file.type,

          date: "Just now"

        };


        const postsContainer =
          document.getElementById("posts");


        createPostElement(
          data,
          postsContainer,
          true
        );


        savePost(data);


        postTitle.value =
          "";

        postDescription.value =
          "";

        mediaInput.value =
          "";

        uploadPreview.innerHTML =
          "";


        alert(
          "✅ Post published and saved!"
        );


      } catch (error) {

        alert(
          "❌ Could not save this post."
        );

      }

    });

  }


  // =========================
  // LOAD POSTS ON START
  // =========================

  loadSavedPosts();

});
