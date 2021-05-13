// Pull character id
const id = localStorage.getItem("id");
let url = `https://rickandmortyapi.com/api/character/${id}`;

// Pull episodes
let episodios = [];
async function getEpisode(result) {
  const get = result.episode;
  for (let index = 0; index < get.length; index++) {
    const element = get[index];
    await fetch(element)
      .then((r) => r.json())
      .then((s) => {
        episodios.push({ air_date: s.air_date, name: s.name });
      });
  }
}

// Create card
function createIdCard(element) {
  const main = document.querySelector(".container");
  const box = document.createElement("div");
  main.appendChild(box);
  box.classList.add("box");

  const circleWrapper = document.createElement("div");
  box.appendChild(circleWrapper);
  circleWrapper.classList.add("circleWrapper-wrapper");

  const imageCircle = document.createElement("img");
  circleWrapper.appendChild(imageCircle);
  imageCircle.classList.add("character");
  imageCircle.getAttribute("src");
  imageCircle.setAttribute("src", `${element.image}`);

  const information = document.createElement("div");
  box.appendChild(information);
  information.classList.add("info");

  const name = document.createElement("div");
  information.appendChild(name);
  name.classList.add("name");

  const nameCharacter = document.createElement("h1");
  name.appendChild(nameCharacter);
  nameCharacter.innerHTML = `${element.name}`;

  const description = document.createElement("div");
  information.appendChild(description);
  description.classList.add("description");

  const species = document.createElement("div");
  description.appendChild(species);
  species.classList.add("species");

  const specieCharacter = document.createElement("h2");
  species.appendChild(specieCharacter);
  specieCharacter.innerHTML = "Specie:";

  const descriptionSpecie = document.createElement("p");
  species.appendChild(descriptionSpecie);
  descriptionSpecie.innerHTML = `${element.species}`;

  const origin = document.createElement("div");
  description.appendChild(origin);
  origin.classList.add("origin");

  const originCharacter = document.createElement("h2");
  origin.appendChild(originCharacter);
  originCharacter.innerHTML = "Origin:";

  const descriptionOrigin = document.createElement("p");
  origin.appendChild(descriptionOrigin);
  descriptionOrigin.innerHTML = `${element.origin.name}`;

  const locationId = document.createElement("div");
  description.appendChild(locationId);
  locationId.classList.add("location");

  const locationCharacter = document.createElement("h2");
  locationId.appendChild(locationCharacter);
  locationCharacter.innerHTML = "Location:";

  const descriptionLocation = document.createElement("p");
  locationId.appendChild(descriptionLocation);
  descriptionLocation.innerHTML = `${element.location.name}`;

  const episode = document.createElement("div");
  description.appendChild(episode);
  episode.classList.add("episode");

  const episodeCharacter = document.createElement("h2");
  episode.appendChild(episodeCharacter);
  episodeCharacter.innerHTML = "Episode:";

  const positionEpisode = document.createElement("div");
  episode.appendChild(positionEpisode);
  positionEpisode.classList.add("positionEpisode");

  episodios.forEach((element) => {
    const descriptionEpisode = document.createElement("p");
    positionEpisode.appendChild(descriptionEpisode);
    descriptionEpisode.innerHTML = `${element.name} >  ${element.air_date}`;
  });
}

// Consume API
// Rotate function
fetch(url)
  .then((response) => response.json())
  .then((jsonData) => {
    getEpisode(jsonData).then(() => {
      createIdCard(jsonData);
    });
  })

  .catch((error) => {
    console.log(error);
  });
