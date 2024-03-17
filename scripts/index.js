import Card from "./card.js";
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
  codeInput.addEventListener("keyup", (e) => {
    if (e.target.value.length === 8) {
      const card = new Card(codeInput.value, cardlist);
      sets.innerHTML = card
        .sets()
        .map(
          (set) =>
            `<option value=${set.code}>${set.name} - ${set.code}</option>`
        )
        .join("\n");
      sets.disabled = false;
    } else {
      sets.disabled = true;
      sets.innerHTML = "";
    }
  });
  const form = document.querySelector("form");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const card = new Card(codeInput.value, cardlist);
    console.log(card);
  });
};

init();
