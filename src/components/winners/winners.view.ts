import Winner from '../../models/winner.model';
import content from './winners.html';
import View from '../../models/component';
import Paginator from '../paginator/paginator';

export default class WinnersView extends View {
  paginator: Paginator;

  constructor() {
    super();
    this.paginator = new Paginator([], this.onPageChanged.bind(this), 10);
  }

  private onPageChanged() {
    this.loadPage();
  }

  renderWinners(winners: Winner[]): void {
    const fragment = document.createDocumentFragment();
    fragment.appendChild(this.buildPage(winners));
    fragment.append(this.paginator.renderPageBar());

    this.appendToBody(fragment);
  }

  buildPage(winners: Winner[]): HTMLElement {
    this.paginator.init(winners);
    const container = document.createElement('div');
    container.innerHTML = `
                        <h1>Winners (${winners.length})</h1>
                        <div id='winner-container'>${this.buildTable()}</div>`;
    return container;
  }

  loadPage() {
    const container = document.getElementById('winner-container') as HTMLElement;
    container.innerHTML = this.buildTable();
  }

  private buildTable(): string {
    return `<h2>Page ${this.paginator.currentPage}</h2>
             ${this.buildCarList(this.paginator.collection as Winner[], this.paginator.loadPageElements() as Winner[])}`;
  }

  buildCarList(allwinners: Winner[], carList: Winner[]): string {
    const inner = carList.map((winner: Winner) => `
    <tr>
      <th scope="row">${allwinners.indexOf(winner) + 1}</th>
      <td> <div class="car" style="background-color:${winner.color}"></div></td>
      <td>${winner.name}</td>
      <td>${winner.wins}</td>
      <td>${winner.time}</td>
    </tr>`).join('');
    return this.fillTemplate(content, { lines: inner });
  }
}
