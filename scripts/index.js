import Card from "./card.js";
import { load } from "./csv.js";
const path = "data/cardlist.json";

const setAllCards = async () => {
  if (localStorage.getItem("cardlist") !== null) {
    return JSON.parse(LZString.decompress(localStorage.getItem("cardlist")));
  }
  try {
    const res = await fetch(path, { method: "GET" });
    if (!res.ok) {
      throw new Error("Fetch response not OK");
    }
    const { data } = await res.json();
    console.info("Cards fetched successfully.");
    localStorage.setItem("cardlist", LZString.compress(JSON.stringify(data)));
    console.info("Cards successfully stored on localStorage.");
  } catch (error) {
    console.error("Can't load cards: ", error);
  }
};

const init = async () => {
  await setAllCards();
  const cardlist = JSON.parse(
    LZString.decompress(localStorage.getItem("cardlist"))
  );
  const codeInput = document.querySelector("#card_code");
  const sets = document.querySelector("#set_name");
  let timeout;
  codeInput.addEventListener("keyup", (e) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      if (e.target.value.length === 8) {
        const card = new Card(codeInput.value, cardlist);
        console.log(card);
        sets.innerHTML = card
          .sets()
          .map(
            (set) =>
              `<option value=${set.code}>${set.name} - ${set.code} (${set.rarity})</option>`
          )
          .join("\n");
        sets.disabled = false;
        const src = card.infos.card_images[0].image_url_small;
        document.querySelector(
          "#preview_art"
        ).innerHTML = `<img src="${src}" alt="${card.infos.name}"></img>`;
      } else {
        sets.disabled = true;
        sets.innerHTML = "";
        document.querySelector("#preview_art").innerHTML = "";
      }
    }, 250);
  });
  const form = document.querySelector("form");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
  });

  const loadInput = document.querySelector(".load");
  loadInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    console.log(file);
    load(file);
  });
};

init();
