function likePost(button) {
  const count = button.querySelector("span");
  let likes = Number(count.textContent);

  likes++;
  count.textContent = likes;
}

function commentPost() {
  const comment = prompt("Write your comment:");

  if (comment && comment.trim() !== "") {
    alert("Comment added!");
  }
}

function sharePost() {
  if (navigator.share) {
    navigator.share({
      title: "Habeshan X Post",
      text: "Check out Habeshan X Post",
      url: window.location.href
    });
  } else {
    alert("Share is not available on this device.");
  }
}
