class Search {
  #btnSearch = document.querySelector('.btn__search');
  #inputSearch = document.querySelector('.input__search');

  constructor() {
    this.#addHandlerToggleSearch();
  }

  #addHandlerToggleSearch() {
    this.#btnSearch.addEventListener('click', _ => {
      this.#inputSearch.classList.toggle('input__search-active');
    });
  }

  addHandlerInputng(handler) {
    this.#inputSearch.addEventListener('input', _ => {
      const { value } = this.#inputSearch;
      handler(value);
    });
  }
}

export default new Search();
