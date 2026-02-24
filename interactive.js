document.addEventListener("DOMContentLoaded", function () {
  var activeFilter = "all";

  var filterContainer = document.querySelector(".flex.gap-2.pb-2");
  var filterButtons = filterContainer.querySelectorAll(".btn");

  filterContainer.addEventListener("click", function (event) {
    var clickedBtn = event.target;

    if (clickedBtn.tagName !== "BUTTON") return;

    activeFilter = clickedBtn.innerText.trim().toLowerCase();

    for (var i = 0; i < filterButtons.length; i++) {
      filterButtons[i].classList.remove(
        "bg-[#002c5c]",
        "text-white",
        "hover:bg-[#001a38]",
        "border-none",
      );
      filterButtons[i].classList.add(
        "btn-ghost",
        "bg-base-100",
        "shadow-sm",
        "border-gray-200",
        "text-gray-600",
      );
    }
    clickedBtn.classList.add(
      "bg-[#002c5c]",
      "text-white",
      "hover:bg-[#001a38]",
      "border-none",
    );
    clickedBtn.classList.remove(
      "btn-ghost",
      "bg-base-100",
      "shadow-sm",
      "border-gray-200",
      "text-gray-600",
    );

    applyFilter(activeFilter);
  });

  var jobsList = document.getElementById("jobs-list");

  jobsList.addEventListener("click", function (event) {
    var clickedBtn = event.target;

    var trashBtn = clickedBtn.closest(".btn-circle");
    if (trashBtn) {
      var wrapper = trashBtn.closest(".job-card-wrapper");
      if (wrapper) {
        wrapper.setAttribute("data-deleted", "true");
        wrapper.style.display = "none";
        updateStats();
        updateJobCount();
        applyFilter(activeFilter);
      }
      return;
    }

    if (clickedBtn.tagName !== "BUTTON") return;

    var btnText = clickedBtn.innerText.trim().toLowerCase();

    if (btnText !== "interview" && btnText !== "rejected") return;

    var card = clickedBtn.closest(".job-card");
    if (!card) return;

    card.setAttribute("data-status", btnText);

    updateBadge(card, btnText);

    updateStats();

    applyFilter(activeFilter);
  });

  function applyFilter(filter) {
    var allCards = document.querySelectorAll("#jobs-list .job-card-wrapper");

    for (var j = 0; j < allCards.length; j++) {
      if (allCards[j].getAttribute("data-deleted") === "true") continue;

      var card = allCards[j].querySelector(".job-card");
      var cardStatus = card.getAttribute("data-status");

      if (filter === "all" || cardStatus === filter) {
        allCards[j].style.display = "block";
      } else {
        allCards[j].style.display = "none";
      }
    }

    var matchingJobs = getJobsByStatus(filter);
    updateEmptyState(matchingJobs.length);
  }

  function updateJobCount() {
    var allcover = document.querySelectorAll("#jobs-list .job-card-wrapper");
    var Count = 0;

    for (var i = 0; i < allcover.length; i++) {
      if (allcover[i].style.display !== "none") {
        Count++;
      }
    }

    var jobCount = document.querySelector("section .text-gray-500.font-medium");
    if (jobCount) {
      jobCount.innerText = Count + " jobs";
    }
  }

  applyFilter("all");
});
