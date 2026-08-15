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

      if (document.body.classList.contains("dark-mode")) {
        themeBtn.textContent = "☀️ Light";
      } else {
        themeBtn.textContent = "🌙 Theme";
      }

    });

  }


  // =========================
  // VIP PAYMENT
  // =========================

  window.joinVIP = function (plan) {

    let message = "";

    if (plan === "VIP") {

      message =
        "💎 VIP — Monthly\n\n" +
        "💰 990 Birr / $10\n\n" +
        "📱 Telebirr: 0959760968\n" +
        "👤 Name: Marifa Jibril\n\n" +
        "Please complete your payment and keep your receipt.";

    }

    else if (plan === "VIP Plus") {

      message =
        "👑 VIP Plus — 3 Months\n\n" +
        "💰 2,750 Birr / $25\n\n" +
        "📱 Telebirr: 0959760968\n" +
        "👤 Name: Marifa Jibril\n\n" +
        "Please complete your payment and keep your receipt.";

    }

    else if (plan === "VIP Premium") {

      message =
        "💎 VIP Premium — Yearly\n\n" +
        "💰 6,100 Birr / $60\n\n" +
        "📱 Telebirr: 0959760968\n" +
        "👤 Name: Marifa Jibril\n\n" +
        "Please complete your payment and keep your receipt.";

    }

    if (message !== "") {
      alert(message);
    }

  };


  // =========================
  // LIKE COUNT
  // =========================

  async function getLikeCount(postId) {

    try {

      const response = await fetch(
        SUPABASE_URL +
        "/rest/v1/post_likes?post_id=eq." +
        postId +
        "&select=id",
        {
          headers: {
            "apikey": SUPABASE_KEY,
            "Authorization":
              "Bearer " + SUPABASE_KEY
          }
        }
      );

      if (!response.ok) return 0;

      const likes = await response.json();

      return likes.length;

    } catch (error) {

      console.error(
        "LIKE LOAD ERROR:",
        error
      );

      return 0;

    }

  }


  // =========================
  // LOAD COMMENTS
  // =========================

  async function loadComments(
    postId,
    commentsContainer
  ) {

    if (!commentsContainer) return;

    try {

      const response = await fetch(
        SUPABASE_URL +
        "/rest/v1/post_comments?post_id=eq." +
        postId +
        "&select=comment,created_at&order=created_at.asc",
        {
          headers: {
            "apikey": SUPABASE_KEY,
            "Authorization":
              "Bearer " + SUPABASE_KEY
          }
        }
      );

      if (!response.ok) return;

      const comments =
        await response.json();

      commentsContainer.innerHTML = "";

      comments.forEach(function (item) {

        const comment =
          document.createElement("p");

        comment.textContent =
          "💬 " + item.comment;

        commentsContainer.appendChild(
          comment
        );

      });

    } catch (error) {

      console.error(
        "COMMENT LOAD ERROR:",
        error
      );

    }

  }


  // =========================
  // POST BUTTONS
  // =========================

  function activatePostButtons(
    post,
    postId
  ) {

    const likeBtn =
      post.querySelector(".like-btn");

    const commentBtn =
      post.querySelector(".comment-btn");

    const shareBtn =
      post.querySelector(".share-btn");

    const sendBtn =
      post.querySelector(".send-comment");

    const commentBox =
      post.querySelector(".comment-box");

    const commentsContainer =
      post.querySelector(".comments");


    // LIKE

    if (likeBtn) {

      likeBtn.addEventListener(
        "click",
        async function () {

          likeBtn.disabled = true;

          try {

            const response =
              await fetch(
                SUPABASE_URL +
                "/rest/v1/post_likes",
                {
                  method: "POST",

                  headers: {
                    "apikey":
                      SUPABASE_KEY,

                    "Authorization":
                      "Bearer " +
                      SUPABASE_KEY,

                    "Content-Type":
                      "application/json",

                    "Prefer":
                      "return=minimal"
                  },

                  body:
                    JSON.stringify({
                      post_id:
                        postId
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


            const count =
              await getLikeCount(
                postId
              );


            const countSpan =
              likeBtn.querySelector(
                "span"
              );


            if (countSpan) {

              countSpan.textContent =
                count;

            }


          } catch (error) {

            console.error(
              "LIKE ERROR:",
              error
            );

            alert(
              "❌ Could not save like."
            );

          }


          likeBtn.disabled = false;

        }
      );

    }


    // COMMENT

    if (commentBtn) {

      commentBtn.addEventListener(
        "click",
        function () {

          if (commentBox) {

            commentBox.classList.toggle(
              "show"
            );

          }

        }
      );

    }


    // SEND COMMENT

    if (sendBtn) {

      sendBtn.addEventListener(
        "click",
        async function () {

          if (!commentBox) return;

          const input =
            commentBox.querySelector(
              "input"
            );


          if (!input) return;


          const value =
            input.value.trim();


          if (value === "") return;


          sendBtn.disabled = true;


          try {

            const response =
              await fetch(
                SUPABASE_URL +
                "/rest/v1/post_comments",
                {
                  method: "POST",

                  headers: {
                    "apikey":
                      SUPABASE_KEY,

                    "Authorization":
                      "Bearer " +
                      SUPABASE_KEY,

                    "Content-Type":
                      "application/json",

                    "Prefer":
                      "return=minimal"
                  },

                  body:
                    JSON.stringify({

                      post_id:
                        postId,

                      comment:
                        value

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


            input.value = "";


            await loadComments(
              postId,
              commentsContainer
            );


          } catch (error) {

            console.error(
              "COMMENT ERROR:",
              error
            );

            alert(
              "❌ Could not save comment."
            );

          }


          sendBtn.disabled = false;

        }
      );

    }


    // SHARE

    if (shareBtn) {

      shareBtn.addEventListener(
        "click",
        function () {

          if (navigator.share) {

            navigator.share({

              title:
                "Habeshan X Post",

              text:
                "Check out Habeshan X Post",

              url:
                window.location.href

            }).catch(function () {});

          } else {

            alert(
              "Share is not available on this device."
            );

          }

        }
      );

    }


    // INITIAL LIKE

    if (likeBtn) {

      getLikeCount(postId)
        .then(function (count) {

          const countSpan =
            likeBtn.querySelector(
              "span"
            );

          if (countSpan) {

            countSpan.textContent =
              count;

          }

        });

    }


    // INITIAL COMMENTS

    if (commentsContainer) {

      loadComments(
        postId,
        commentsContainer
      );

    }

  }


  // =========================
  // CREATE POST
  // =========================

  function createPost(data) {

    const postsContainer =
      document.getElementById(
        "posts"
      );

    if (!postsContainer) return;


    const post =
      document.createElement(
        "article"
      );

    post.className = "post";

    post.dataset.category =
      "latest";


    // MEDIA

    if (data.image_url) {

      const media =
        document.createElement(
          "div"
        );

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
          document.createElement(
            "video"
          );

        video.src =
          data.image_url;

        video.controls = true;

        video.playsInline = true;

        video.style.width =
          "100%";

        media.appendChild(
          video
        );

      } else {

        const image =
          document.createElement(
            "img"
          );

        image.src =
          data.image_url;

        image.alt =
          data.title ||
          "Post image";

        image.style.width =
          "100%";

        image.loading =
          "lazy";

        media.appendChild(
          image
        );

      }


      post.appendChild(
        media
      );

    }


    // CONTENT

    const content =
      document.createElement(
        "div"
      );

    content.className =
      "post-content";


    const meta =
      document.createElement(
        "div"
      );

    meta.className =
      "post-meta";


    meta.innerHTML =
      "<span>🆕 Latest</span>" +
      "<span>" +
      (
        data.created_at
          ? new Date(
              data.created_at
            ).toLocaleString()
          : "Just now"
      ) +
      "</span>";


    const heading =
      document.createElement(
        "h3"
      );

    heading.textContent =
      data.title ||
      "New Post";


    const description =
      document.createElement(
        "p"
      );

    description.textContent =
      data.content ||
      "";


    const actions =
      document.createElement(
        "div"
      );

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
      document.createElement(
        "div"
      );

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

    content.appendChild(
      heading
    );

    content.appendChild(
      description
    );

    content.appendChild(
      actions
    );

    content.appendChild(
      commentBox
    );


    post.appendChild(
      content
    );


    postsContainer.appendChild(
      post
    );


    activatePostButtons(
      post,
      data.id
    );

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
            headers: {
              "apikey":
                SUPABASE_KEY,

              "Authorization":
                "Bearer " +
                SUPABASE_KEY
            }
          }
        );


      if (!response.ok) {

        const errorText =
          await response.text();

        throw new Error(
          errorText
        );

      }


      const posts =
        await response.json();


      const postsContainer =
        document.getElementById(
          "posts"
        );


      if (!postsContainer) return;


      /*
       * IMPORTANT:
       * Only the POSTS container is cleared.
       * VIP Plans are NOT touched.
       */

      postsContainer.innerHTML = "";


      posts.forEach(
        function (post) {

          createPost(post);

        }
      );


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
        ? file.name
            .split(".")
            .pop()
            .toLowerCase()
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

            "apikey":
              SUPABASE_KEY,

            "Authorization":
              "Bearer " +
              SUPABASE_KEY,

            "Content-Type":
              file.type ||
              "application/octet-stream",

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
  // ELEMENTS
  // =========================

  const publishBtn =
    document.getElementById(
      "publishBtn"
    );

  const previewBtn =
    document.getElementById(
      "previewBtn"
    );

  const mediaInput =
    document.getElementById(
      "mediaInput"
    );

  const postTitle =
    document.getElementById(
      "postTitle"
    );

  const postDescription =
    document.getElementById(
      "postDescription"
    );

  const uploadPreview =
    document.getElementById(
      "uploadPreview"
    );


  // =========================
  // PREVIEW
  // =========================

  if (previewBtn) {

    previewBtn.addEventListener(
      "click",
      function () {

        if (!uploadPreview) return;


        const file =
          mediaInput &&
          mediaInput.files
            ? mediaInput.files[0]
            : null;


        const title =
          postTitle.value.trim() ||
          "Preview Post";


        const description =
          postDescription.value.trim() ||
          "Preview content";


        uploadPreview.innerHTML =
          "";


        const box =
          document.createElement(
            "div"
          );

        box.className =
          "post";

        box.style.marginTop =
          "20px";


        const content =
          document.createElement(
            "div"
          );

        content.className =
          "post-content";


        const heading =
          document.createElement(
            "h3"
          );

        heading.textContent =
          title;


        const text =
          document.createElement(
            "p"
          );

        text.textContent =
          description;


        if (file) {

          const url =
            URL.createObjectURL(
              file
            );


          if (
            file.type.startsWith(
              "video/"
            )
          ) {

            const video =
              document.createElement(
                "video"
              );

            video.src = url;

            video.controls =
              true;

            video.style.width =
              "100%";

            box.appendChild(
              video
            );

          } else {

            const image =
              document.createElement(
                "img"
              );

            image.src = url;

            image.style.width =
              "100%";

            box.appendChild(
              image
            );

          }

        }


        content.appendChild(
          heading
        );

        content.appendChild(
          text
        );

        box.appendChild(
          content
        );

        uploadPreview.appendChild(
          box
        );

      }
    );

  }


  // =========================
  // PUBLISH POST
  // =========================

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

          const mediaUrl =
            await uploadMedia(
              file
            );


          const response =
            await fetch(
              SUPABASE_URL +
              "/rest/v1/posts",
              {
                method:
                  "POST",

                headers: {

                  "apikey":
                    SUPABASE_KEY,

                  "Authorization":
                    "Bearer " +
                    SUPABASE_KEY,

                  "Content-Type":
                    "application/json",

                  "Prefer":
                    "return=representation"

                },

                body:
                  JSON.stringify({

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
          "📤 Publish Post";

      }
    );

  }


  // =========================
  // SEARCH
  // =========================

  const searchInput =
    document.getElementById(
      "searchInput"
    );


  if (searchInput) {

    searchInput.addEventListener(
      "input",
      function () {

        const value =
          searchInput.value
            .toLowerCase();


        document.querySelectorAll(
          ".post"
        ).forEach(
          function (post) {

            const text =
              post.textContent
                .toLowerCase();


            post.style.display =
              text.includes(value)
                ? ""
                : "none";

          }
        );

      }
    );

  }


  // =========================
  // NAVIGATION
  // =========================

  document.querySelectorAll(
    ".nav-btn"
  ).forEach(
    function (button) {

      button.addEventListener(
        "click",
        function () {

          document.querySelectorAll(
            ".nav-btn"
          ).forEach(
            function (btn) {

              btn.classList.remove(
                "active"
              );

            }
          );


          button.classList.add(
            "active"
          );


          const filter =
            button.dataset.filter;


          document.querySelectorAll(
            ".post"
          ).forEach(
            function (post) {

              post.style.display =
                filter === "all" ||
                post.dataset.category ===
                  filter
                  ? ""
                  : "none";

            }
          );

        }
      );

    }
  );


  // =========================
  // START
  // =========================

  loadPosts();

});   
