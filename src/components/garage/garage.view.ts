import viewTemplate from '../garage/garage.view.html';

export default class GarageView {
  private defaultTempalate = "";

  constructor() {
    this.defaultTempalate = viewTemplate;
  }

  render() {

    const body = document.getElementById('bodyId') as HTMLBodyElement;
    body.appendChild(this.buildCarList());
  }

  renderGarage(): void {
    const garageView = document.createDocumentFragment();
    garageView.appendChild(this.buildCarList());
  }

  buildCarList(): HTMLElement {
    const carList = [{ name: "volvo" }, { name: "geely" }]

    const inner = carList.map((car) => `
    <li class="row">
      <p>${car.name}</p>
      <div class="car"></div>
    </li>`).join('');
    const ul = document.createElement('ul');
    ul.innerHTML = inner;
    return ul;
  }
}