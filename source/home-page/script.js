import { pick } from "../utils.js";

// Define the randomize function
function randomize() {
  // Get all the card containers
  const cardContainers = document.querySelectorAll(".card-container");

  // Retrieve the corresponding card container element
  const randomCardContainer = pick(cardContainers);

  // Trigger the click event on the random card container
  randomCardContainer.click();
}

const cardContainers = document.querySelectorAll(".card-container");

// Get the "Randomize" button element
const randomizeButton = document.querySelector(".randomize-button");

/** Add click event listener to the "Randomize" button */
randomizeButton.addEventListener("click", randomize);
