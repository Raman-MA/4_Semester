const myImage = document.querySelector("img");

if (myImage) {
  myImage.addEventListener("click", () => {
    const currentSrc = myImage.getAttribute("src");

    if (currentSrc === "ThirdStepImages/Image2.png") {
      myImage.setAttribute("src", "ThirdStepImages/ImageHeehEee.png");
    } else {
      myImage.setAttribute("src", "ThirdStepImages/Image2.png");
    }
  });
} else {
  console.error("No <img> element found on the page!");
}