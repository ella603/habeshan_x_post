document.addEventListener("DOMContentLoaded", function () {

  // =========================
  // SUPABASE
  // =========================

  const SUPABASE_URL =
    "https://vmciqvatbwicurusytea.supabase.co";

  const SUPABASE_KEY =
    "sb_publishable_PMz8wojoKkzWcwK8w9aNwQ_ENJgL7w4";


  // =========================
  // THEME
  // =========================

  const themeBtn =
    document.getElementById("themeBtn");

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


  // =========================
  // CREATE POST ELEMENT
  // =========================

  function createPost(data) {

    const postsContainer =
      document.getElementById("posts");

    if (!postsContainer) return;


    const post =
      document.createElement("article");

    post.className =
      "post";

    post.dataset.category =
      "latest";


    // =========================
    // MEDIA
    // =========================

    if (data.image_url) {

      const media =
        document.createElement("div");

      media.className =
        "post-media";


      const imageUrl =
        data.image_url.toLowerCase();


      if (
        imageUrl.includes(".mp4") ||
        imageUrl.includes(".webm") ||
        imageUrl.includes(".mov") ||
        imageUrl.includes(".m4v")
      ) {

        const video =
          document.createElement("video");

        video.src =
          data.image_url;

        video.controls =
          true;

        video.playsInline =
          true;

        video.style.width =
          "100%";

        video.style.borderRadius =
          "12px";

        media.appendChild(video);

      } else {

        const image =
          document.createElement("img");

        image.src =
          data.image_url;

        image.alt =
          data.title || "Post image";

        image.style.width =
          "100%";

        image.style.borderRadius =
          "12px";

        image.loading =
          "lazy";

        media.appendChild(image);

      }


      post.appendChild(media);

    }


    // =========================
    // CONTENT
    // =========================

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
      (
        data.created_at
          ? new Date(data.created_at).toLocaleString()
          : "Just now"
      ) +
      "</span>";


    const heading =
      document.createElement("h3");

    heading.textContent =
      data.title || "New Post";


    const description =
      document.createElement("p");

    description.textContent =
      data.content || "";


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

    post.appendChild(content);

    postsContainer.appendChild(post);

    activatePostButtons(post);

  }


  // =========================
  // LOAD POSTS
  // =========================

  async function loadPosts() {

    try {

      const response =
        await fetch(
          SUPABASE_URL +
          "/rest/v1/posts?select=*&order=created_at.desc",
          {
            method: "GET",

            headers: {
              "apikey": SUPABASE_KEY,
              "Authorization":
                "Bearer " + SUPABASE_KEY
            }
          }
        );


      if (!response.ok) {

        const errorText =
          await response.text();

        throw new Error(errorText);

      }


      const posts =
        await response.json();


      const postsContainer =
        document.getElementById("posts");


      if (postsContainer) {

        postsContainer.innerHTML = "";

        posts.forEach(function (post) {

          createPost(post);

        });

      }


    } catch (error) {

      console.error(
        "LOAD POSTS ERROR:",
        error
      );

    }

  }


  // =========================
  // UPLOAD MEDIA
  // =========================

  async function uploadMedia(file) {

    const extension =
      file.name.includes(".")
        ? file.name.split(".").pop().toLowerCase()
        : "file";


    const fileName =
      Date.now() +
      "-" +
      Math.random()
        .toString(36)
        .substring(2) +
      "." +
      extension;


    const response =
      await fetch(
        SUPABASE_URL +
        "/storage/v1/object/post-media/" +
        fileName,
        {
          method: "POST",

          headers: {
            "apikey": SUPABASE_KEY,

            "Authorization":
              "Bearer " + SUPABASE_KEY,

            "Content-Type":
              file.type || "application/octet-stream",

            "x-upsert":
              "true"
          },

          body: file
        }
      );


    if (!response.ok) {

      const errorText =
        await response.text();

      throw new Error(
        errorText
      );

    }


    return (
      SUPABASE_URL +
      "/storage/v1/object/public/post-media/" +
      fileName
    );

  }


  // =========================
  // PUBLISH POST
  // =========================

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


  if (publishBtn) {

    publishBtn.addEventListener(
      "click",
      async function () {

        const file =
          mediaInput &&
          mediaInput.files
            ? mediaInput.files[0]
            : null;


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


        publishBtn.disabled =
          true;

        publishBtn.textContent =
          "Publishing...";


        try {

          // Upload media

          const mediaUrl =
            await uploadMedia(file);


          // Save post

          const response =
            await fetch(
              SUPABASE_URL +
              "/rest/v1/posts",
              {
                method: "POST",

                headers: {
                  "apikey": SUPABASE_KEY,

                  "Authorization":
                    "Bearer " + SUPABASE_KEY,

                  "Content-Type":
                    "application/json",

                  "Prefer":
                    "return=representation"
                },

                body: JSON.stringify({

                  title:
                    title,

                  content:
                    description,

                  image_url:
                    mediaUrl

                })

              }
            );


          if (!response.ok) {

            const errorText =
              await response.text();

            throw new Error(
              errorText
            );

          }


          // Clear form

          postTitle.value =
            "";

          postDescription.value =
            "";

          mediaInput.value =
            "";


          if (uploadPreview) {

            uploadPreview.innerHTML =
              "";

          }


          alert(
            "✅ Post published successfully!"
          );


          await loadPosts();


        } catch (error) {

          console.error(
            "PUBLISH ERROR:",
            error
          );

          alert(
            "❌ Could not publish the post."
          );

        }


        publishBtn.disabled =
          false;

        publishBtn.textContent =
          "Publish Post";

      }
    );

  }


  // =========================
  // SEARCH
  // =========================

  const searchInput =
    document.getElementById("searchInput");


  if (searchInput) {

    searchInput.addEventListener(
      "input",
      function () {

        const value =
          searchInput.value.toLowerCase();


        document.querySelectorAll(
          ".post"
        ).forEach(function (post) {

          const text =
            post.textContent.toLowerCase();


          post.style.display =
            text.includes(value)
              ? ""
              : "none";

        });

      }
    );

  }


  // =========================
  // NAVIGATION
  // =========================

  document.querySelectorAll(
    ".nav-btn"
  ).forEach(function (button) {

    button.addEventListener(
      "click",
      function () {

        document.querySelectorAll(
          ".nav-btn"
        ).forEach(function (btn) {

          btn.classList.remove(
            "active"
          );

        });


        button.classList.add(
          "active"
        );


        const filter =
          button.dataset.filter;


        document.querySelectorAll(
          ".post"
        ).forEach(function (post) {

          post.style.display =
            filter === "all" ||
            post.dataset.category === filter
              ? ""
              : "none";

        });

      }
    );

  });


  // =========================
  // START
  // =========================

  loadPosts();

});
