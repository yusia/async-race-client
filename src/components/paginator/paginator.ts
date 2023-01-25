import Component from '../../models/component';
import content from './paginator.html';

export default class Paginator extends Component {
  currentPage = 1;

  constructor(private collection: object[], private itemsPerPage = 7) {
    super();
  }

  renderPageBar(): string {
    const template = this.fillTemplate(
      content,
      {
        currentPage: this.currentPage, links: this.getListLinks(),
      },
    );
    return template;
  }

  getListLinks(): string {
    let list = '';
    const count = this.pageCount();
    for (let i = 1; i < count; i += 1) {
      list += this.linkMarkup(i);
    }
    return list;
  }

  loadPageElements(): object[] {
    const end = (this.currentPage * this.itemsPerPage);
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.collection.slice(start, end);
  }

  linkMarkup = (i: number) => `<li class="page-item"><a class="page-link" href="#" data-id="${i}">${i}</a></li>`;

  itemCount() {
    return this.collection.length;
  }

  pageCount() {
    return Math.ceil(this.itemCount() / this.itemsPerPage);
  }

  pageItemCount(pageIndex: number): number {
    if (this.itemCount() === 0 || pageIndex < 0) return -1;
    const n = (pageIndex + 1) * this.itemsPerPage;
    if (pageIndex > this.pageCount() - 1) return -1;
    if (n > this.itemCount()) return this.itemCount() - pageIndex * this.itemsPerPage;
    return this.itemsPerPage;
  }

  pageIndex(itemIndex: number): number {
    if (this.itemCount() === 0 || itemIndex < 0) return -1;
    if (itemIndex > this.itemCount() - 1) return -1;
    return Math.floor(itemIndex / this.itemsPerPage);
  }
}
// export default class PaginationHelper {
//   constructor(private collection: object[], private itemsPerPage: number = 7) {
//     this.collection = collection;
//     this.itemsPerPage = itemsPerPage;
//   }
//   itemCount() {
//     return this.collection.length;
//   }
//   pageCount() {
//     return Math.ceil(this.itemCount() / this.itemsPerPage);
//   }
//   pageItemCount(pageIndex) {
//     if (this.itemCount() === 0 || pageIndex < 0) return -1;
//     const n = (pageIndex + 1) * this.itemsPerPage;
//     if (pageIndex > this.pageCount() - 1) return -1;
//     if (n > this.itemCount()) return this.itemCount() - pageIndex * this.itemsPerPage;
//     return this.itemsPerPage;
//   }
//   pageIndex(itemIndex) {
//     if (this.itemCount() === 0 || itemIndex < 0) return -1;
//     if (itemIndex > this.itemCount() - 1) return -1;
//     return Math.floor(itemIndex / this.itemsPerPage);
//   }
// }
