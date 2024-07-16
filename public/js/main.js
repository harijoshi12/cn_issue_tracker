document.addEventListener("DOMContentLoaded", function () {
  // Filter issues in project detail page
  const searchInput = document.getElementById("search");
  const authorFilters = document.querySelectorAll('input[name="authorFilter"]');
  const labelFilters = document.querySelectorAll('input[name="labelFilter"]');
  const issueList = document.getElementById("issueList");

  function filterIssues() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedAuthors = Array.from(authorFilters)
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => checkbox.value.toLowerCase());
    const selectedLabels = Array.from(labelFilters)
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => checkbox.value.toLowerCase());

    Array.from(issueList.children).forEach((issue) => {
      const title = issue
        .querySelector(".card-title")
        .textContent.toLowerCase();
      const description = issue
        .querySelector(".card-text")
        .textContent.toLowerCase();
      const author = issue
        .querySelector("small")
        .textContent.toLowerCase()
        .replace("author: ", "");
      const labels = Array.from(issue.querySelectorAll(".badge")).map((badge) =>
        badge.textContent.toLowerCase()
      );

      const matchesSearch =
        title.includes(searchTerm) || description.includes(searchTerm);
      const matchesAuthor =
        selectedAuthors.length === 0 || selectedAuthors.includes(author);
      const matchesLabels =
        selectedLabels.length === 0 ||
        selectedLabels.every((label) => labels.includes(label));

      issue.style.display =
        matchesSearch && matchesAuthor && matchesLabels ? "" : "none";
    });
  }

  searchInput.addEventListener("input", filterIssues);
  authorFilters.forEach((checkbox) =>
    checkbox.addEventListener("change", function () {
      updateFilterButtonText("author");
      filterIssues();
    })
  );
  labelFilters.forEach((checkbox) =>
    checkbox.addEventListener("change", function () {
      updateFilterButtonText("label");
      filterIssues();
    })
  );

  // Update button text when selections change
  function updateFilterButtonText(filterName) {
    const btn = document.getElementById(`${filterName}FilterBtn`);
    const filters = document.querySelectorAll(
      `input[name="${filterName}Filter"]:checked`
    );
    if (filters.length === 0) {
      btn.textContent =
        filterName.charAt(0).toUpperCase() + filterName.slice(1);
    } else if (filters.length === 1) {
      btn.textContent = filters[0].value;
    } else {
      btn.textContent = `${filters.length} ${filterName}s`;
    }
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
