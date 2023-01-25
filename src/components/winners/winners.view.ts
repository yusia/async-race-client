import Winner from '../../models/winner.model';
import content from './winners.html';
import View from '../../models/component';

export default class WinnersView extends View {
  renderWinners(winners: Winner[]): void {
    const fragment = document.createDocumentFragment();
    fragment.appendChild(this.buildPage(winners));

    this.appendToBody(fragment);
  }

  buildPage(winners: Winner[]): HTMLElement {
    const container = document.createElement('div');
    container.innerHTML = `<h1>Winners (${winners.length})</h1>`;
    container.innerHTML += this.buildCarList(winners);
    return container;
  }

  buildCarList(carList: Winner[]): string {
    const inner = carList.map((winner: Winner, index: number) => `
    <tr>
      <th scope="row">${index + 1}</th>
      <td> <div class="car" style="background-color:${winner.color}"></div></td>
      <td>${winner.name}</td>
      <td>${winner.wins}</td>
      <td>${winner.time}</td>
    </tr>`).join('');
    return this.fillTemplate(content, { lines: inner });
  }
}
