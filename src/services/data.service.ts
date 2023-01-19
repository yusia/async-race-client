export class DataService {
  constructor(private url: string) {
  }
  
  async getGarage() {
    return fetch(`${this.url}/garage`).then((value) => value.json());
  }
}
