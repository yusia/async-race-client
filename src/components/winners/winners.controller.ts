import DataService from '../../services/data.service';
import WinnersView from './winners.view';

export default class WinnersController {
  view: WinnersView;

  constructor(private dataService:DataService) {
    this.view = new WinnersView();
  }

  async renderView() {
    const cars = await this.dataService.getWinners();
    console.log(cars);
    this.view.renderWinners(cars);
  }
}
