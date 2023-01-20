
import { Car, Winner } from '../../models/car.model';

import View from '../../models/view';

export default class WinnersView extends View {

  renderWinners(winners: Winner[]): void {
    const fragment = document.createDocumentFragment();
    fragment.appendChild(this.buildPage(winners));

    this.appendToBody(fragment);
  }

  buildPage(winners: Winner[]): HTMLElement {
    const container = document.createElement('div');
    container.innerHTML = `<h1>Winners (${winners.length})</h1>`;
    container.appendChild(this.buildCarList(winners));
    return container;
  }

  buildCarList(carList: Winner[]): HTMLElement {

    const inner = carList.map((car) => `
    <li class="row">
      <span class="col">${car.name}</span>
      <span class="col">${car.wins}</span>
      <span class="col">${car.time}</span>
    </li>`).join('');
    const ul = document.createElement('ul');
    ul.innerHTML = inner;
    return ul;
  }
}