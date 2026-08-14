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
  // POST BUTTONS
  // =========================

  function activatePostButtons(post) {

    const likeBtn =
      post.querySelector(".like-btn");

    const commentBtn =
      post.querySelector(".comment-btn");

    const shareBtn =
      post.querySelector(".share-btn");

    const sendBtn =
      post.querySelector(".send-comment");


    if (likeBtn) {

      likeBtn.addEventListener("click", function () {

        const count =
          likeBtn.querySelector("span");

        count.textContent =
          Number(count.textContent) + 1;

      });

    }


    if (commentBtn) {

      commentBtn.addEventListener("click", function () {

        const box =
          post.querySelector(".comment-box");

        if (box) {
          box.classList.toggle("show");
        }

      });

    }


    if (sendBtn) {

      sendBtn.addEventListener("click", function () {

        const box =
          post.querySelector(".comment-box");

        const input =
          box.querySelector("input");

        const comments =
          box.querySelector(".comments");

        const value =
          input.value.trim();

        if (value !== "") {

          const comment =
            document.createElement("p");

          comment.textContent =
            "💬 " + value;

          comments.appendChild(comment);

          input.value = "";

        }

      });

    }


    if (shareBtn) {

      shareBtn.addEventListener("click", function () {

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


  // Activate existing posts

  document.querySelectorAll(".post").forEach(
    function (post) {
      activatePostButtons(post);
    }
  );


  // =========================
  // SEARCH
  // =========================

  const searchInput =
    document.getElementById("searchInput");

  if (searchInput) {

    searchInput.addEventListener("input", function () {

      const value =
        searchInput.value.toLowerCase();

      document.querySelectorAll(".post").forEach(
        function (post) {

          const text =
            post.textContent.toLowerCase();

          post.style.display =
            text.includes(value)
              ? ""
              : "none";

        }
      );

    });

  }


  // =========================
  // NAVIGATION
  // =========================

  document.querySelectorAll(".nav-btn").forEach(
    function (button) {

      button.addEventListener("click", function () {

        document.querySelectorAll(".nav-btn").forEach(
          function (btn) {
            btn.classList.remove("active");
          }
        );

        button.classList.add("active");

        const filter =
          button.dataset.filter;

        document.querySelectorAll(".post").forEach(
          function (post) {

            post.style.display =
              filter === "all" ||
              post.dataset.category === filter
                ? ""
                : "none";

          }
        );

      });

    }
  );


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
  // FILE READER
  // =========================

  function readFile(file) {

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

      const preview =
        document.createElement("article");

      preview.className =
        "post";

      const heading =
        document.createElement("h3");

      heading.textContent =
        title;

      preview.appendChild(heading);


      if (file.type.startsWith("image/")) {

        const image =
          document.createElement("img");

        image.src =
          url;

        image.alt =
          title;

        image.style.width =
          "100%";

        image.style.borderRadius =
          "12px";

        preview.appendChild(image);

      }


      if (file.type.startsWith("video/")) {

        const video =
          document.createElement("video");

        video.src =
          url;

        video.controls =
          true;

        video.style.width =
          "100%";

        video.style.borderRadius =
          "12px";

        preview.appendChild(video);

      }


      const text =
        document.createElement("p");

      text.textContent =
        description;

      preview.appendChild(text);

      uploadPreview.appendChild(preview);

    });

  }


  // =========================
  // SAVE POST
  // =========================

  function savePost(data) {

    let posts = [];

    const oldPosts =
      localStorage.getItem("habeshanXPosts");

    if (oldPosts) {

      try {
        posts = JSON.parse(oldPosts);
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
        "⚠️ Storage is full. Please use a smaller photo or video."
      );

    }

  }


  // =========================
  // CREATE POST ELEMENT
  // =========================

  function createPost(data) {

    const postsContainer =
      document.getElementById("posts");

    const post =
      document.createElement("article");

    post.className =
      "post";

    post.dataset.category =
      "latest";


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


    if (data.type.startsWith("video/")) {

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


    const description =
      document.createElement("p");

    description.textContent =
      data.description;


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

    content.appendChild(description);

    content.appendChild(actions);

    content.appendChild(commentBox);

    post.appendChild(media);

    post.appendChild(content);

    postsContainer.prepend(post);


    activatePostButtons(post);

  }


  // =========================
  // PUBLISH POST
  // =========================

  if (publishBtn) {

    publishBtn.addEventListener(
      "click",
      async function () {

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
            await readFile(file);


          const data = {

            title: title,

            description: description,

            media: media,

            type: file.type,

            date: "Just now"

          };


          createPost(data);

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
            "❌ Could not save the post."
          );

        }

      }
    );

  }


  // =========================
  // LOAD SAVED POSTS
  // =========================

  const saved =
    localStorage.getItem("habeshanXPosts");

  if (saved) {

    try {

      const posts =
        JSON.parse(saved);

      posts.reverse().forEach(
        function (post) {
          createPost(post);
        }
      );

    } catch (error) {

      console.log(
        "No saved posts found."
      );

    }

  }

});
