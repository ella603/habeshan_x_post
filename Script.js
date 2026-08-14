document.addEventListener("DOMContentLoaded", function () {

  const likeButtons = document.querySelectorAll(".like-btn");

  likeButtons.forEach(function (button) {
    button.addEventListener("click", function () {

      let likes = parseInt(button.dataset.likes || "0");

      likes++;

      button.dataset.likes = likes;
      button.textContent = "❤️ Like " + likes;
    });
  });


  const commentButtons = document.querySelectorAll(".comment-btn");

  commentButtons.forEach(function (button) {
    button.addEventListener("click", function () {

      const commentBox = button.nextElementSibling;

      if (commentBox) {
        commentBox.style.display =
          commentBox.style.display === "none" ? "block" : "none";
      }

    });
  });


  const sendButtons = document.querySelectorAll(".send-comment");

  sendButtons.forEach(function (button) {
    button.addEventListener("click", function () {

      const input = button.previousElementSibling;

      if (input && input.value.trim() !== "") {

        alert("Comment added successfully!");

        input.value = "";

      } else {

        alert("Please write a comment first.");

      }

    });
  });

});
