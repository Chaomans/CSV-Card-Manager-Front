/**
 *
 * @typedef {{
 *  id: string,
 *  code: string,
 *  name: string,
 *  quantity: string,
 *  store: string
 * }} Card
 *
 * @param {Card} cardInfos
 */
export const LineCard = (cardInfos) => {
  const card = document.createElement("div");
  card.classList.add("card");
  card.setAttribute("id", cardInfos.id);

  const name = document.createElement("a");
  name.classList.add("card_name");
  name.href = `./${cardInfos.id}`;
  name.innerHTML = cardInfos.name;

  const code = document.createElement("p");
  code.classList.add("card_code");
  code.innerHTML = cardInfos.code;

  const quantity = document.createElement("p");
  quantity.classList.add("card_quantity");
  quantity.innerHTML = cardInfos.quantity;

  card.appendChild(name);
  card.appendChild(code);
  card.appendChild(quantity);

  return card;
};
