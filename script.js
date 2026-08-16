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

    });

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

    else if (plan === "VIP Plus") {

      message =
        "👑 VIP Plus — 3 Months\n\n" +
        "💰 2,750 Birr / $25\n\n" +
        "📱 Telebirr: 0959760968\n" +
        "👤 Name: Marifa Jibril";

    }

    else if (plan === "VIP Premium") {

      message =
        "💎 VIP Premium — Yearly\n\n" +
        "💰 6,100 Birr / $60\n\n" +
        "📱 Telebirr: 0959760968\n" +
        "👤 Name: Marifa Jibril";

    }

    if (message !== "") {

      alert(message);

    }

  };


  // =========================
  // START
  // =========================

  console.log(
    "Habeshan X Post loaded successfully."
  );

});
