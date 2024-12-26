const createElementFromString = (str) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(str, 'text/html');
  return doc.body.firstChild;
}

const loadComponent = async (selector, filePath) => {
  try {
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error(`Failed to load ${filePath}: ${response.statusText}`);
    }
    const content = await response.text();
    const containers = document.querySelectorAll(`[data-insert^="${selector}"]`);

    for (let container of containers) {
      const parent = container.parentNode;
      const element = createElementFromString(content);
      parent.replaceChild(element, container);
    }
  } catch (err) {
    console.error("err:", err);
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  await loadComponent('header', 'sections/header.html');
  await loadComponent('banner', 'sections/banner.html');
  await loadComponent('bonuses', 'sections/bonuses.html');
  //
  await loadComponent('filter', 'sections/filter.html');
  await loadComponent('filter-range-1', 'sections/filter-range-1.html');
  await loadComponent('filter-range-2', 'sections/filter-range-2.html');
  await loadComponent('filter-range-3', 'sections/filter-range-3.html');
  //
  await loadComponent('search', 'sections/search.html');
  await loadComponent('cards', 'sections/cards.html');
  //
  await loadComponent('card-1', 'sections/card-1.html');
  await loadComponent('chip', 'sections/chip.html');
  await loadComponent('promo', 'sections/promo.html');
  await loadComponent('card-table', 'sections/card-table.html');
  await loadComponent('card-info-1', 'sections/card-info-1.html');
  await loadComponent('card-info-2', 'sections/card-info-2.html');
});
