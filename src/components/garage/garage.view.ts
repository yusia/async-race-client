import viewTemplate from '../garage/garage.view.html';

export default class GarageView {
  private defaultTempalate = "";

  constructor() {
    this.defaultTempalate = viewTemplate;
  }

  render() {

  //  const body = document.getElementById('bodyId') as HTMLBodyElement;
    //  body.appendChild(this.buildCarList());
  }

  renderGarage(cars: { name: string }[]): void {
    // const garageView = document.createDocumentFragment();
    // garageView.appendChild(this.buildCarList(cars));

    const body = document.getElementById('viewContainer') as HTMLBodyElement;
    body.innerHTML = "";
    body.appendChild(this.buildCarList(cars));
  }

  buildCarList(carList: { name: string }[]): HTMLElement {
    // const carList = [{ name: "volvo" }, { name: "geely" }]

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