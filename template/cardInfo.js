/**
 * @typedef {{
 * id: number,
 * name: string,
 * desc: string,
 * atk: number,
 * def: number,
 * level?: number,
 * linkval?: number,
 * scale?: number
 * race: string,
 * frameType: string
 * }} Infos
 * @param {InfosMonster} infos Card informations
 */

const CardInfosMonster = (infos) => {
  const previewInfos = document.createElement("div");
  previewInfos.classList.add("preview_info");
  previewInfos.setAttribute("id", "preview_infos");

  const name = document.createElement("p");
  name.classList.add("preview_infos_name");
  name.innerHTML = infos.name;

  const level = document.createElement("p");
  level.classList.add("preview_infos_level");
  const lvlType = {
    xyz: "Rank",
    link: "Link value",
  };
  level.innerHTML = `<span class="bold">${
    lvlType[infos.frameType.split("_")[0]] || "Level"
  }:</span> ${infos.frameType.includes("link") ? infos.linkval : infos.level}`;

  if (infos.frameType.includes("pendulum")) {
    level.innerHTML += `\t<span class="bold">Scale:</span> ${
      infos.scale || "?"
    }`;
  }

  const race = document.createElement("p");
  race.classList.add("preview_infos_race");
  race.innerHTML = `<span class="bold">Type:</span> ${infos.race}`;

  const stats = document.createElement("p");
  stats.classList.add("preview_infos_stats");
  stats.innerHTML = `<span class="bold">ATK/</span>${infos.atk} <span class="bold">DEF/</span>${infos.def}`;

  const desc = document.createElement("p");
  desc.classList.add("preview_infos_desc");
  desc.innerHTML = infos.desc;

  previewInfos.appendChild(name);
  previewInfos.appendChild(level);
  previewInfos.appendChild(race);
  previewInfos.appendChild(stats);
  previewInfos.appendChild(desc);
  return previewInfos;
};

/**
 * @typedef {{
 * id: number,
 * name: string,
 * desc: string,
 * race: string,
 * frameType: string
 * }} InfosSpellTrap
 * @param {InfosSpellTrap} infos Card informations
 */
const CardInfosOther = (infos) => {
  const previewInfos = document.createElement("div");
  previewInfos.classList.add("preview_info");
  previewInfos.setAttribute("id", "preview_infos");

  const name = document.createElement("p");
  name.classList.add("preview_infos_name");
  name.innerHTML = infos.name;

  const race = document.createElement("p");
  race.classList.add("preview_infos_race");
  race.innerHTML = `<span class="bold">Type:</span> ${infos.race}`;

  const desc = document.createElement("p");
  desc.classList.add("preview_infos_desc");
  desc.innerHTML = infos.desc;

  previewInfos.appendChild(name);
  previewInfos.appendChild(race);
  previewInfos.appendChild(desc);
  return previewInfos;
};

export const CardInfos = (infos) => {
  if (["spell", "trap"].includes(infos.frameType)) {
    return CardInfosOther(infos);
  }
  return CardInfosMonster(infos);
};
