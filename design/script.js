const cards = document.querySelectorAll(".card");
const links = document.querySelectorAll(".link");

// Fetch and parse the JSON data
fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    // Loop through the cards and update the data
    cards.forEach((card, index) => {
      const title = card.querySelector(".card-type");
      const current = card.querySelector(".current-hours");
      const previous = card.querySelector(".previous-hours");

      // Initial data display
      title.textContent = data[index].title;
      current.textContent = data[index].timeframes.weekly.current + "hrs";
      previous.textContent =
        "Last week - " + data[index].timeframes.weekly.previous + "hrs";

      // Link event listeners
      links.forEach((link) => {
        link.addEventListener("click", (e) => {
          e.preventDefault(); // Prevent the default link behavior

          const timeframe = link.getAttribute("data-timeframe");
          current.textContent =
            data[index].timeframes[timeframe].current + "hrs";
          const reducedName = timeframe.replace(/ly$/i, "");
          const goodName = reducedName.replace(/i/i, "y");

          previous.textContent =
            "Last " +
            goodName +
            " - " +
            data[index].timeframes[timeframe].previous +
            "hrs";
          links.forEach((link) => link.classList.remove("activated"));
          link.classList.add("activated");
        });
      });
    });
  })
  .catch((error) => console.error(error));

const tiltCards = document.querySelectorAll(".tilt-card");

tiltCards.forEach((card) => {
  card.addEventListener("mousemove", handleMouseMove);
  card.addEventListener("mouseout", handleMouseOut);
});

function handleMouseMove(event) {
  const card = event.currentTarget;
  const cardRect = card.getBoundingClientRect();
  const cardCenterX = cardRect.left + cardRect.width / 2;
  const cardCenterY = cardRect.top + cardRect.height / 2;

  const mouseX = event.clientX;
  const mouseY = event.clientY;

  const rotateX = (mouseY - cardCenterY) / 20;
  const rotateY = (mouseX - cardCenterX) / 20;

  card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
}

function handleMouseOut(event) {
  const card = event.currentTarget;
  card.style.transform = "";
}