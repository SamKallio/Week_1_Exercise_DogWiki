// https://dog.ceo/api/breed/beagle/images/random
// https://dog.ceo/api/breed/mastiff/images/random
// https://dog.ceo/api/breed/pinscher/images/random
// https://dog.ceo/api/breed/poodle/images/random
// https://dog.ceo/api/breed/retriever/images/random

const dogs = ["beagle", "mastiff", "pinscher", "poodle", "retriever"];

//loading the js when ready
if (document.readyState !== "loading") {
  initializeCode();
} else {
  document.addEventListener("DOMContentLoaded", function () {
    initializeCode();
  });
}

function initializeCode() {
  for (let dogIndex = 0; dogIndex < dogs.length; dogIndex++) {
    //Creating wiki item of a dog using the dogIndex
    createWikiItem(dogIndex);
  }
}

function createWikiItem(dogIndex) {
  // Selecting the container in which we will then create all the elements
  const container = document.querySelector(".container");

  //Creating all these elements
  const wikiItem = document.createElement("div");
  const wikiHeader = document.createElement("h1");
  const wikiContent = document.createElement("div");
  const wikiText = document.createElement("p");
  const imgContainer = document.createElement("div");
  const wikiImg = document.createElement("img");

  //Adding the right classes to specific elements
  wikiItem.classList.add("wiki-item");
  wikiHeader.classList.add("wiki-header");
  wikiContent.classList.add("wiki-content");
  wikiText.classList.add("wiki-text");
  imgContainer.classList.add("img-container");
  wikiImg.classList.add("wiki-img");

  //Fetching dog image
  fetch("https://dog.ceo/api/breed/" + dogs[dogIndex] + "/images/random")
    .then((response) => response.json())
    .then((data) => (wikiImg.src = data.message));

  //Setting up the header for dog
  wikiHeader.innerText = dogs[dogIndex];

  //Fetching dog description. We could also fetch the header from here, but since we sort of know the dog names already, no point doing so.
  fetch(
    "https://en.wikipedia.org/api/rest_v1/page/summary/" +
      dogs[dogIndex] +
      "?redirect=false"
  )
    .then((response) => response.json())
    .then((data) => (wikiText.innerText = data.extract));

  //Appending the elements as a child of other elements
  container.appendChild(wikiItem);
  wikiItem.appendChild(wikiHeader);
  wikiItem.appendChild(wikiContent);
  wikiContent.appendChild(imgContainer);
  imgContainer.appendChild(wikiImg);
  wikiContent.appendChild(wikiText);
}
