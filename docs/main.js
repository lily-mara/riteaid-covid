const CHECK = '✔️';
const CROSS = '❌';

async function load_results() {
  const area = document.getElementById('result-area');
  while (area.firstChild) {
    area.removeChild(area.firstChild);
  }

  const button = document.getElementById('load_results');
  button.disabled = true;
  button.innerText = 'loading...';

  const loader = document.createElement('div');
  loader.classList.add('loader');
  loader.id = 'loader';

  area.appendChild(loader);

  const zip = document.getElementById('zip').value;

  const availability = await (
    await fetch(`https://riteaid-covid.app.natemara.com/availability/${zip}`)
  ).json();

  loader.remove();

  for (const item of availability) {
    const elt = document.createElement('div');
    elt.classList.add('row');

    let marker = CROSS;
    if (item.possible_availability) {
      marker = CHECK;
    }

    elt.innerText = `${marker} ${item.address} - ${item.zip} - ${item.phone}`;

    area.appendChild(elt);
  }

  button.disabled = false;
  button.innerText = 'Load';
}
