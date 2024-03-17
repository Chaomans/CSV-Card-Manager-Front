export default class Card {
  constructor(id, cardlist) {
    this.id = +id;
    this.infos = this.getCardInfos(cardlist);
  }

  getCardInfos = (cardlist) => {
    return cardlist.filter((card) => card.id === this.id)[0];
  };

  sets = () => {
    return this.infos.card_sets.map((set) => {
      return {
        name: set.set_name,
        code: set.set_code,
      };
    });
  };
}
