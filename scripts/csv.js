import { LineCard } from "../template/lineCard.js";

export const load = (file) => {
  if (file.name.split(".").slice(-1)[0] !== "csv") {
    return;
  }
  const reader = new FileReader();

  reader.addEventListener(
    "load",
    () => {
      const cards = formatData(reader.result);
      const cardsDiv = document.querySelector(".cards");
      cards.map((card) => cardsDiv.appendChild(LineCard(card)));
      localStorage.setItem("csvCards", JSON.stringify(cards));
    },
    false
  );

  if (file) {
    reader.readAsText(file);
  }
};

/**
 *
 * @param {string} data CSV content
 * @returns {Map<string, string>[]}
 */
const formatData = (data) => {
  const [header, ...lines] = data.split("\n");
  const cards = [];
  const keys = header.split(";");
  lines.map((line) => {
    const card = {};
    line.split(";").map((info, i) => (card[keys[i]] = info));
    cards.push(card);
  });
  return cards;
};

// id;code;name;quantity;store
