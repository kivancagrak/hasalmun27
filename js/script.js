/* ============================================================
   HASALMUN'27 — Shared Scripts
   Countdown · Mobile navigation · FAQ accordion
   ============================================================ */

(function () {
  "use strict";

  /* ---------------- Countdown ---------------- */
  var CONFERENCE_START = new Date("2027-05-08T09:00:00+03:00").getTime();

  var boxes = document.getElementById("cd-boxes");
  var done = document.getElementById("cd-done");
  var dEl = document.getElementById("cd-days");
  var hEl = document.getElementById("cd-hours");
  var mEl = document.getElementById("cd-mins");
  var sEl = document.getElementById("cd-secs");

  function pad(n) {
    return n < 10 ? "0" + n : "" + n;
  }

  function tick() {
    var diff = CONFERENCE_START - Date.now();

    if (diff <= 0) {
      if (boxes) boxes.style.display = "none";
      if (done) done.style.display = "block";
      return;
    }

    var d = Math.floor(diff / 86400000);
    var h = Math.floor((diff % 86400000) / 3600000);
    var m = Math.floor((diff % 3600000) / 60000);
    var s = Math.floor((diff % 60000) / 1000);

    if (dEl) dEl.textContent = pad(d);
    if (hEl) hEl.textContent = pad(h);
    if (mEl) mEl.textContent = pad(m);
    if (sEl) sEl.textContent = pad(s);
  }

  if (boxes || done) {
    tick();
    setInterval(tick, 1000);
  }

  /* ---------------- Mobile navigation ---------------- */
  var toggle = document.querySelector(".nav-toggle");

  function closeNav() {
    document.body.classList.remove("nav-open");
    if (toggle) toggle.setAttribute("aria-expanded", "false");
  }

  if (toggle) {
    toggle.addEventListener("click", function () {
      var open = document.body.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  var overlay = document.querySelector(".nav-overlay");
  if (overlay) overlay.addEventListener("click", closeNav);

  var navLinks = document.querySelectorAll(".site-nav a");
  for (var i = 0; i < navLinks.length; i++) {
    navLinks[i].addEventListener("click", closeNav);
  }

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeNav();
  });

  /* ---------------- FAQ accordion ---------------- */
  var items = document.querySelectorAll(".faq-item");
  for (var j = 0; j < items.length; j++) {
    (function (item) {
      var q = item.querySelector(".faq-q");
      if (!q) return;

      q.addEventListener("click", function () {
        var wasOpen = item.classList.contains("open");

        var openItems = document.querySelectorAll(".faq-item.open");
        for (var k = 0; k < openItems.length; k++) {
          openItems[k].classList.remove("open");
          var openBtn = openItems[k].querySelector(".faq-q");
          if (openBtn) openBtn.setAttribute("aria-expanded", "false");
        }

        if (!wasOpen) {
          item.classList.add("open");
          q.setAttribute("aria-expanded", "true");
        }
      });
    })(items[j]);
  }
})();
