class Options {
  #sort = document.querySelector('.input__select');
  #btnReverse = document.querySelector('.btn__reverse');
  #btnRemove = document.querySelector('.btn__remove');
  #arrow;

  addHandlerSortChange(handler) {
    this.#sort.addEventListener('change', e => {
      const option = e.target.value;
      handler(option, this.#arrow === 'true');
    });
  }

  addHandlerArrowClick(handler) {
    this.#btnReverse.addEventListener('click', _ => {
      this.#toggleIcon(this.#btnReverse);
      this.#arrow = this.#btnReverse.dataset.arrow;
      handler(this.#arrow === 'true');
    });
  }

  addHandlerClearAll(handler) {
    this.#btnRemove.addEventListener('click', handler);
  }

  #toggleIcon(btn) {
    if (btn.dataset.arrow === 'false') {
      this.#btnReverse
        .querySelector('path')
        .setAttribute(
          'd',
          'M12 2.25a.75.75 0 0 1 .75.75v16.19l2.47-2.47a.75.75 0 1 1 1.06 1.06l-3.75 3.75a.75.75 0 0 1-1.06 0l-3.75-3.75a.75.75 0 1 1 1.06-1.06l2.47 2.47V3a.75.75 0 0 1 .75-.75Z'
        );
      btn.dataset.arrow = true;
    } else {
      this.#btnReverse
        .querySelector('path')
        .setAttribute(
          'd',
          'M11.47 2.47a.75.75 0 0 1 1.06 0l3.75 3.75a.75.75 0 0 1-1.06 1.06l-2.47-2.47V21a.75.75 0 0 1-1.5 0V4.81L8.78 7.28a.75.75 0 0 1-1.06-1.06l3.75-3.75Z'
        );
      btn.dataset.arrow = false;
    }
  }
}

export default new Options();
