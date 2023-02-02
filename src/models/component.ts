export default class Component {
  appendToBody(template: DocumentFragment) {
    const body = document.getElementById('viewContainer') as HTMLBodyElement;
    body.innerHTML = '';
    body.appendChild(template);
  }

  fillTemplate(template: string, item: object): string {
    const entries = Object.entries(item);
    let filled = template;
    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of entries) {
      const searchKey = new RegExp(`{{${key}}}`, 'g');
      filled = filled.replace(searchKey, value.toString());
    }
    return filled;
  }
}
