const cardContainers = document.querySelectorAll(".card-container");

// Add click event listener to each card container
cardContainers.forEach((cardContainer, index) => {
  cardContainer.addEventListener("click", () => {
    // Determine the subpage URL based on the card index
    let subpageURL;
    switch (index) {
      case 0:
        subpageURL = '../Zodiac_compatibility/index.html';
        break;
      case 1:
        subpageURL = "../FortuneCookie/index.html";
        break;
      case 2:
        subpageURL = "../PalmReading/index.html";
        break;
      // Add more cases for additional card containers if needed
      default:
        subpageURL = "index.html";
        break;
    }
    // Navigate to the subpage
    window.location.href = subpageURL;
  });
});

// Get the "Randomize" button element
const randomizeButton = document.querySelector(".randomize-button");

// Add click event listener to the "Randomize" button
randomizeButton.addEventListener("click", () => {
  // Get a random index for the card containers
  const randomIndex = Math.floor(Math.random() * cardContainers.length);

  // Retrieve the corresponding card container element
  const randomCardContainer = cardContainers[randomIndex];

  // Trigger the click event on the random card container
  randomCardContainer.click();
});
