document.addEventListener("DOMContentLoaded", function () {
  // Filter issues in project detail page
  const authorFilter = document.getElementById("authorFilter");
  const labelFilter = document.getElementById("labelFilter");
  const search = document.getElementById("search");
  const issueList = document.getElementById("issueList");

  if (authorFilter && labelFilter && search && issueList) {
    function filterIssues() {
      const authorValue = authorFilter.value.toLowerCase();
      const labelValues = Array.from(labelFilter.selectedOptions).map(
        (option) => option.value.toLowerCase()
      );
      const searchValue = search.value.toLowerCase();

      Array.from(issueList.children).forEach((issue) => {
        const title = issue
          .querySelector(".card-title")
          .textContent.toLowerCase();
        const description = issue
          .querySelector(".card-text")
          .textContent.toLowerCase();
        const author = issue.querySelector("small").textContent.toLowerCase();
        const labels = Array.from(issue.querySelectorAll(".badge")).map(
          (badge) => badge.textContent.toLowerCase()
        );

        const authorMatch = author.includes(authorValue);
        const labelMatch =
          labelValues.length === 0 ||
          labelValues.every((value) => labels.includes(value));
        const searchMatch =
          title.includes(searchValue) || description.includes(searchValue);

        issue.style.display =
          authorMatch && labelMatch && searchMatch ? "" : "none";
      });
    }

    authorFilter.addEventListener("input", filterIssues);
    labelFilter.addEventListener("change", filterIssues);
    search.addEventListener("input", filterIssues);
  }

  // Label suggestions in create issue page
  const labelsInput = document.getElementById("labels");
  const labelSuggestions = document.getElementById("labelSuggestions");

  if (labelsInput && labelSuggestions) {
    labelsInput.addEventListener("input", function () {
      const input = this.value;
      if (input.length > 0) {
        fetch(`/api/labels/suggest?q=${input}`)
          .then((response) => response.json())
          .then((labels) => {
            labelSuggestions.innerHTML = "";
            labels.forEach((label) => {
              const div = document.createElement("div");
              div.classList.add("label-suggestion");
              div.textContent = label.name;
              div.addEventListener("click", function () {
                const currentLabels = labelsInput.value
                  .split(",")
                  .map((l) => l.trim());
                if (!currentLabels.includes(label.name)) {
                  currentLabels.push(label.name);
                  labelsInput.value = currentLabels.join(", ");
                }
                labelSuggestions.innerHTML = "";
              });
              labelSuggestions.appendChild(div);
            });
          });
      } else {
        labelSuggestions.innerHTML = "";
      }
    });
  }
});
