let root = document.querySelector(".cards");
let rootTag = document.querySelector(".tags");
let input = document.querySelector("#input");

let allPeople = got.houses.reduce((acc, cv) => {
  acc = acc.concat(cv.people);
  return acc;
}, []);

let allTags = got.houses.map((house) => house.name);

let activeHouse = "";

// function for card creation

function createCards(data = []) {
  root.innerHTML = "";
  data.forEach((people) => {
    let card = document.createElement("div");
    card.classList.add("card");
    let image = document.createElement("img");
    image.alt = people.name;
    image.src = people.image;
    let h2 = document.createElement("h2");
    h2.textContent = people.name;
    let p = document.createElement("p");
    p.textContent = people.description;
    let button = document.createElement("button");
    button.textContent = "Know More!";
    button.addEventListener("click", () => {
      window.open(people.wikiLink, "_Blank");
    });
    card.append(image, h2, p, button);
    root.append(card);
  });
}

// function for button tag

function createTagsUI(data) {
  rootTag.innerHTML = "";
  allTags.forEach((tag) => {
    let li = document.createElement("li");
    li.innerText = tag;

    if (activeHouse === tag) {
      li.classList.add("active");
    }

    li.addEventListener("click", () => {
      activeHouse = tag;
      let peopleOfTheHouse =
        got.houses.find((house) => house.name === tag).people || [];
      createCards(peopleOfTheHouse);
      createTagsUI(allTags);
    });

    rootTag.append(li);
  });
}

function handleInput(event) {
  let searchText = event.target.value;
  let filteredPeople = allPeople.filter((people) =>
    people.name.toLowerCase().includes(searchText.toLowerCase())
  );
  createCards(filteredPeople);
}

input.addEventListener("input", handleInput);

createCards(allPeople);
createTagsUI(allTags);
