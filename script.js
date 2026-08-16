/* =========================
   VIP PLANS
========================= */

function openVIPPlans() {

  const modal =
    document.getElementById("vipPlansModal");

  if (!modal) return;

  modal.classList.add("show");

  document.body.style.overflow = "hidden";
}


/* =========================
   CLOSE VIP PLANS
========================= */

function closeVIPPlans() {

  const modal =
    document.getElementById("vipPlansModal");

  if (modal) {
    modal.classList.remove("show");
  }

  document.body.style.overflow = "";
}


/* =========================
   SELECT VIP PLAN
========================= */

function selectVIPPlan(plan, price) {

  const paymentModal =
    document.getElementById("paymentModal");

  const paymentPlan =
    document.getElementById("paymentPlan");

  if (paymentPlan) {

    paymentPlan.textContent =
      plan + " — " + price;

  }

  closeVIPPlans();

  if (paymentModal) {

    paymentModal.classList.add("show");

    document.body.style.overflow = "hidden";

  }

}


/* =========================
   CLOSE PAYMENT
========================= */

function closePayment() {

  const paymentModal =
    document.getElementById("paymentModal");

  if (paymentModal) {

    paymentModal.classList.remove("show");

  }

  document.body.style.overflow = "";
}


/* =========================
   BACKDROP CLOSE
========================= */

document.addEventListener(
  "DOMContentLoaded",
  function () {

    const vipPlansModal =
      document.getElementById("vipPlansModal");

    const paymentModal =
      document.getElementById("paymentModal");


    if (vipPlansModal) {

      vipPlansModal.addEventListener(
        "click",
        function (event) {

          if (event.target === vipPlansModal) {

            closeVIPPlans();

          }

        }
      );

    }


    if (paymentModal) {

      paymentModal.addEventListener(
        "click",
        function (event) {

          if (event.target === paymentModal) {

            closePayment();

          }

        }
      );

    }

  }
);
