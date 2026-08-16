document.addEventListener("DOMContentLoaded", function () {

  // =========================
  // SUPABASE
  // =========================

  const SUPABASE_URL =
    "https://vmciqvatbwicurusytea.supabase.co";

  const SUPABASE_KEY =
    "sb_publishable_PMz8wojoKkzWcwK8w9aNwQ_ENJgL7w4";


  // =========================
  // VIP STATUS
  // =========================

  let isVIP =
    localStorage.getItem("habeshanVIP") === "true";


  // =========================
  // VIP VIDEO LOCK
  // =========================

  function updateVIPVideos() {

    document.querySelectorAll(".vip-video").forEach(function (box) {

      const video =
        box.querySelector("video");

      const lock =
        box.querySelector(".vip-lock");

      if (!video || !lock) return;


      if (isVIP) {

        video.style.filter = "none";
        video.style.opacity = "1";
        video.style.pointerEvents = "auto";
        video.controls = true;

        lock.style.display = "none";

      } else {

        video.style.filter = "blur(12px)";
        video.style.opacity = ".45";
        video.style.pointerEvents = "none";
        video.controls = false;

        lock.style.display = "flex";

      }

    });

  }


  // =========================
  // DEMO VIP UNLOCK
  // =========================

  window.unlockVIPDemo = function () {

    isVIP = true;

    localStorage.setItem(
      "habeshanVIP",
      "true"
    );

    updateVIPVideos();

    alert(
      "💎 VIP unlocked successfully!"
    );

  };


  // =========================
  // RESET VIP
  // =========================

  window.resetVIPDemo = function () {

    isVIP = false;

    localStorage.removeItem(
      "habeshanVIP"
    );

    updateVIPVideos();

  };


  // =========================
  // THEME
  // =========================

  const themeBtn =
    document.getElementById("themeBtn");

  if (themeBtn) {

    themeBtn.addEventListener(
      "click",
      function () {

        document.body.classList.toggle(
          "dark-mode"
        );

      }
    );

  }


  // =========================
  // VIP PAYMENT INFO
  // =========================

  window.joinVIP = function (plan) {

    let message = "";

    if (plan === "VIP") {

      message =
        "💎 VIP — Monthly\n\n" +
        "💰 990 Birr / $10\n\n" +
        "📱 Telebirr: 0959760968\n" +
        "👤 Name: Marifa Jibril";

    }

    if (plan === "VIP Plus") {

      message =
        "👑 VIP Plus — 3 Months\n\n" +
        "💰 2,750 Birr / $25\n\n" +
        "📱 Telebirr: 0959760968\n" +
        "👤 Name: Marifa Jibril";

    }

    if (plan === "VIP Premium") {

      message =
        "💎 VIP Premium — Yearly\n\n" +
        "💰 6,100 Birr / $60\n\n" +
        "📱 Telebirr: 0959760968\n" +
        "👤 Name: Marifa Jibril";

    }

    if (message) {
      alert(message);
    }

  };


  // =========================
  // START
  // =========================

  updateVIPVideos();

});
