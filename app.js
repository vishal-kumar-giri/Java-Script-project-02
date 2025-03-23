const searchForm = document.querySelector("#search-form");
const searchBox = document.querySelector("#search-box");
const searchResult = document.querySelector("#search-result");
const showMoreBtn = document.querySelector("#show-more-btn");

let keyword = "";
let page = 1; // Initialize the page to 1
const accessKey = "ABwn7Wx1-_ip9usFPM8P-rQFoQsWROIjm1Q7oNeCfRI"; // Replace with your Unsplash API key

// Function to fetch images
async function searchImages() {
  try {
    // Construct the API URL
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;

    // Fetch images
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();

    // Display images
    if (page === 1) {
      searchResult.innerHTML = ""; // Clear results on new search
    }

    data.results.forEach((image) => {
      const imgElement = document.createElement("img");
      imgElement.src = image.urls.small; // Use small-sized images
      imgElement.alt = image.alt_description || "Image";
      imgElement.className = "image";
      searchResult.appendChild(imgElement);
    });

    // Show the "Show More" button if there are more results
    if (data.results.length > 0) {
      showMoreBtn.style.display = "block";
    } else {
      showMoreBtn.style.display = "none";
    }
  } catch (error) {
    console.error("Error fetching images:", error);
    alert("Failed to fetch images. Please try again.");
  }
}

// Event listener for form submission
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  keyword = searchBox.value.trim(); // Get the search keyword
  if (!keyword) {
    alert("Please enter a keyword to search!");
    return;
  }
  page = 1; // Reset to the first page for a new search
  searchImages();
});

// Event listener for "Show More" button
showMoreBtn.addEventListener("click", () => {
  page++; // Increment page number
  searchImages();
});
