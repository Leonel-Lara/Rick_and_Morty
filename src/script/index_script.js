// Delay function
const debounce = (func, wait, immediate) => {
  let timeout;
  return (...args) => {
    const context = this;
    const later = () => {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

// Header effect
window.addEventListener("scroll", () => {
  let header = document.getElementById("sticky");

  if (window.pageYOffset > 0) {
    header.classList.add("effect-header");
  } else {
    header.classList.remove("effect-header");
  }
});

// Paralax effect
window.addEventListener(
  "scroll",
  debounce(() => {
    const parallax = document.querySelector(".parallax");
    let scrollPosition = window.pageYOffset;

    parallax.style.transform = "translateY(" + scrollPosition * 0.5 + "px)";
  }, 10)
);

// Navigation, togle and search animation
const target = document.querySelectorAll("[data-anime]");
const animation = "animation";
function animeScroll() {
  const windTop = window.pageYOffset + 800;
  target.forEach((element) => {
    if (windTop > element.offsetTop) {
      element.classList.add(animation);
    } else {
      element.classList.remove(animation);
    }
  });
}

if (target.length) {
  window.addEventListener(
    "scroll",
    debounce(() => {
      animeScroll();
    }, 150)
  );
}

// Search effect
let searchIcon = document.getElementsByClassName("boxicon")[0];
let searchBox = document.getElementsByClassName("searchBox")[0];

searchIcon.addEventListener("click", active);

function active() {
  searchBox.classList.toggle("active");
}

// Reset the value of the search button
let search = "";

// Reset the value of the page
let indexPage = "";

// Delete and replace page values
function characterClear() {
  const container = document.querySelector(".container-cards");
  container.innerHTML = "";
}

function pageClear() {
  const container = document.querySelector(".numbers");
  container.innerHTML = "";
}

// Create card
function creatCharacter(character) {
  character.forEach((element) => {
    const container = document.querySelector(".container-cards");
    const box = document.createElement("div");
    container.appendChild(box);
    box.classList.add("box");

    const status = document.createElement("div");
    box.appendChild(status);
    status.classList.add("status");

    const statusCharacter = document.createElement("p");
    status.appendChild(statusCharacter);
    statusCharacter.innerHTML = `${element.status}`;

    if (element.status == "unknown") {
      statusCharacter.setAttribute("id", "assigns-unknown");
    }

    const nameCharacter = document.createElement("h2");
    box.appendChild(nameCharacter);
    nameCharacter.classList.add("name");
    nameCharacter.innerHTML = `${element.name}`;

    const link = document.createElement("a");
    box.appendChild(link);
    link.classList.add("link_info");
    link.setAttribute("id", `${element.id}`);
    link.innerHTML = "Know more";
    link.setAttribute("target", "_blank");
    link.setAttribute("href", "./pages/description.html");
    link.setAttribute("click", "getId(this.id)");

    const circleWrapper = document.createElement("div");
    box.appendChild(circleWrapper);
    circleWrapper.classList.add("circleWrapper");

    const imageCircle = document.createElement("img");
    circleWrapper.appendChild(imageCircle);
    imageCircle.getAttribute("src");
    imageCircle.setAttribute("src", `${element.image}`);

    const gender = document.createElement("div");
    box.appendChild(gender);
    gender.classList.add("gender");

    const genderCharacter = document.createElement("p");
    gender.appendChild(genderCharacter);
    genderCharacter.innerHTML = `${element.gender}`;

    if (element.gender == "unknown") {
      genderCharacter.setAttribute("id", "assigns-unknown");
    }

    if (element.gender == "Genderless") {
      genderCharacter.setAttribute("id", "gender-genderless");
    }

    VanillaTilt.init(document.querySelectorAll(".box"), {
      max: 25,
      speed: 400,
    });
  });
}

// Toggle effect
const alive = document.getElementById("alive");
alive.onclick = () => {
  dead.checked = false;
  unknown.checked = false;
  searchShow();
};

const dead = document.getElementById("dead");
dead.onclick = () => {
  alive.checked = false;
  unknown.checked = false;
  searchShow();
};

const unknown = document.getElementById("unknown");
unknown.onclick = () => {
  alive.checked = false;
  dead.checked = false;
  searchShow();
};

const male = document.getElementById("male");
male.onclick = () => {
  female.checked = false;
  genderless.checked = false;
  unknowng.checked = false;
  searchShow();
};

const female = document.getElementById("female");
female.onclick = () => {
  male.checked = false;
  genderless.checked = false;
  unknowng.checked = false;
  searchShow();
};

const genderless = document.getElementById("genderless");
genderless.onclick = () => {
  male.checked = false;
  female.checked = false;
  unknowng.checked = false;
  searchShow();
};

const unknowng = document.getElementById("unknowng");
unknowng.onclick = () => {
  male.checked = false;
  female.checked = false;
  genderless.checked = false;
  searchShow();
};

// Search function
function searchShow() {
  let url = `https://rickandmortyapi.com/api/character/`;
  let name = `${search}`;
  let pages = `${indexPage}`;

  let statusAlive = "alive";
  let aliveStart = alive.checked;

  let statusDead = "dead";
  let deadStart = dead.checked;

  let statusUnknown = "unknown";
  let unknownStart = unknown.checked;

  let genderMale = "male";
  let maleStart = male.checked;

  let genderFemale = "female";
  let femaleStart = female.checked;

  let genderGenderless = "genderless";
  let genderlessStart = genderless.checked;

  let genderUnknown = "unknown";
  let unknownStartg = unknowng.checked;

  //Search name

  url = `https://rickandmortyapi.com/api/character/?name=${name}&page=${pages}`;

  // Filter status and gender
  if (
    aliveStart ||
    deadStart ||
    unknownStart ||
    maleStart ||
    femaleStart ||
    genderlessStart ||
    unknownStartg
  ) {
    let status = "";
    let gender = "";

    // Search status
    if (aliveStart) {
      status = statusAlive;
    }

    if (deadStart) {
      status = statusDead;
    }

    if (unknownStart) {
      status = statusUnknown;
    }

    // Search gender
    if (maleStart) {
      gender = genderMale;
    }

    if (femaleStart) {
      gender = genderFemale;
    }

    if (genderlessStart) {
      gender = genderGenderless;
    }

    if (unknownStartg) {
      gender = genderUnknown;
    }

    url = `https://rickandmortyapi.com/api/character/?name=${name}&status=${status}&gender=${gender}&page=${pages}`;
  }

  // Create pages
  function creatPage(pages) {
    const numbers = document.querySelector(".numbers");
    for (let index = 0; index < pages; index++) {
      const numberPage = document.createElement("a");
      numbers.appendChild(numberPage);
      numberPage.setAttribute("id", `page${index + 1}`);
      numberPage.addEventListener("click", () => skip(`page${index + 1}`));
      numberPage.innerHTML = `${index + 1}`;
    }
  }

  // Consume API
  // Rotate functions
  fetch(url)
    .then((response) => response.json())
    .then((jsonData) => {
      const result = jsonData.results;
      const pages = jsonData.info;
      characterClear();
      pageClear();
      creatCharacter(result);
      creatPage(pages.pages);
    })
    .catch(() => {
      const container = document.querySelector(".container-cards");
      const noSearch = document.createElement("h2");
      container.appendChild(noSearch);
      noSearch.classList.add("noSearch");
      noSearch.innerHTML = "Não encontrado...";
    });
}

// value entered by the user
window.onload = () => {
  const searchElement = document.getElementById("searchChar");
  searchElement.onkeyup = () => {
    search = searchElement.value;
    indexPage = 0;
    searchShow();
  };
};

// Page value
function skip(id) {
  const searchIdNumber = document.getElementById(id);
  let value = searchIdNumber.innerHTML;
  indexPage = value;
  searchShow();
}
