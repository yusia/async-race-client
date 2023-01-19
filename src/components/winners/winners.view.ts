
import {Car,Winner} from '../../car.model';

import View from '../../models/view';

export default class WinnersView extends View{

  renderWinners(winners: Winner[]): void {
    const body = document.getElementById('viewContainer') as HTMLBodyElement;
    body.innerHTML = "";
    body.appendChild(this.buildCarList(winners));
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