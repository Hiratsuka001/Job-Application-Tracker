function getJobsByStatus(status) {
  var allcover = document.querySelectorAll("#jobs-list .job-card-wrapper");
  var matched = [];

  for (var i = 0; i < allcover.length; i++) {
    if (
      allcover[i].style.display === "none" &&
      allcover[i].getAttribute("data-deleted") === "true"
    )
      continue;

    var card = allcover[i].querySelector(".job-card");
    if (!card) continue;

    if (status === "all") {
      matched.push(card);
    } else if (card.getAttribute("data-status") === status) {
      matched.push(card);
    }
  }

  return matched;
}

function updateEmptyState(visibleCount) {
  var emptyState = document.getElementById("empty-state");
  var jobsList = document.getElementById("jobs-list");

  if (visibleCount === 0) {
    emptyState.style.display = "block";
    jobsList.style.display = "none";
  } else {
    emptyState.style.display = "none";
    jobsList.style.display = "block";
  }
}

function updateStats() {
  var allcover = document.querySelectorAll("#jobs-list .job-card-wrapper");

  var totalCount = 0;
  var interviewCount = 0;
  var rejectedCount = 0;

  for (var i = 0; i < allcover.length; i++) {
    if (allcover[i].getAttribute("data-deleted") === "true") continue;

    var card = allcover[i].querySelector(".job-card");
    if (!card) continue;

    totalCount++;

    var status = card.getAttribute("data-status");
    if (status === "interview") interviewCount++;
    if (status === "rejected") rejectedCount++;
  }

  document.getElementById("stat-total").innerText = totalCount;
  document.getElementById("stat-interview").innerText = interviewCount;
  document.getElementById("stat-rejected").innerText = rejectedCount;
}

function updateBadge(card, status) {
  var badge = card.querySelector(".badge");

  badge.classList.remove(
    "bg-blue-50",
    "text-blue-900",
    "bg-green-50",
    "text-green-900",
    "bg-red-50",
    "text-red-900",
  );

  if (status === "interview") {
    badge.innerText = "INTERVIEW";
    badge.classList.add("bg-green-50", "text-green-900");
  } else if (status === "rejected") {
    badge.innerText = "REJECTED";
    badge.classList.add("bg-red-50", "text-red-900");
  } else {
    badge.innerText = "NOT APPLIED";
    badge.classList.add("bg-blue-50", "text-blue-900");
  }
}
