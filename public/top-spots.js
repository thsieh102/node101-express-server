const statusMessage = document.querySelector('#status');
const list = document.querySelector('#spots');

async function loadTopSpots() {
  try {
    const response = await fetch('/data');
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const spots = await response.json();
    const items = spots.map(({ name, description, location }) => {
      const item = document.createElement('li');
      const title = document.createElement('h2');
      const details = document.createElement('p');
      const map = document.createElement('a');

      title.textContent = name;
      details.textContent = description;
      map.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.join(','))}`;
      map.textContent = 'View on map';
      map.setAttribute('aria-label', `View ${name} on map`);
      item.append(title, details, map);
      return item;
    });

    list.replaceChildren(...items);
    statusMessage.textContent = `${items.length} top spots`;
  } catch {
    statusMessage.textContent = 'Could not load the top spots. Reload the page to try again.';
  }
}

loadTopSpots();
