class Edit {
  #parentEle;
  #nameEle;
  #modleEle;
  #manufacturerEle;
  #price;
  #quantity;
  #status;
  #btnContainer;
  #tableElements = [];
  #oldValues = [];
  #section = document.querySelector('.section__table');
  #removeEle;
  #removeIconEle;

  constructor() {
    this.#addHandlerBtnEdit();
    this.#addHandlerRemoveEle();
  }

  #setEleFields(parent) {
    this.#nameEle = parent.querySelector('.name');
    this.#modleEle = parent.querySelector('.model');
    this.#manufacturerEle = parent.querySelector('.manufacturer');
    this.#price = parent.querySelector('.price');
    this.#quantity = parent.querySelector('.quantity');
    this.#status = parent.querySelector('.status');
    this.#btnContainer = parent.querySelector('.btn_container');
    this.#removeEle = parent.querySelector('.remove-ele__container');
    this.#removeIconEle = parent.querySelector('.icon__remove-ele');
    this.#tableElements = [
      this.#nameEle,
      this.#modleEle,
      this.#manufacturerEle,
      this.#price,
      this.#quantity,
      this.#status,
    ];
  }

  #addHandlerBtnEdit() {
    this.#section.addEventListener('click', e => {
      const btn = e.target.closest('.btn__edit');
      if (!btn) return;
      this.#parentEle = btn.closest('.table__row');

      this.#setEleFields(this.#parentEle);
      this.#toggleRemoveBtn();
      this.#clearOldValues();

      this.#tableElements.forEach(ele => {
        console.log(ele);
        const value = ele.textContent;
        const isNumber = parseInt(value);
        const enableSelect = ele.classList.contains('status');

        this.#oldValues.push(value);
        ele.innerHTML = this.#inputMarkup(isNumber, enableSelect);
        ele.querySelector('.input').value = value;
      });

      this.#btnContainer.innerHTML = this.#btnsMarkup();
    });
  }

  addHandlerEditValues(handler) {
    this.#section.addEventListener('click', e => {
      const btn = e.target.closest('.btn-mark');
      if (!btn) return;

      const edit = btn.classList.contains('btn__correct');
      const id = this.#gettingID(btn);
      const remove = this.#removeIconEle.classList.contains(
        'icon__remove-ele__active'
      );

      edit ? this.#editInputsValues(true) : this.#editInputsValues(false);

      this.#toggleRemoveBtn();

      if (remove && edit) return handler(id, null);
      if (edit) handler(id, this.#newValuesArr());
    });
  }

  #addHandlerRemoveEle() {
    this.#section.addEventListener('click', e => {
      const btn = e.target.closest('.remove-ele__container');
      if (!btn) return;
      this.#removeIconEle.classList.toggle('icon__remove-ele__active');
    });
  }

  #editInputsValues(edit) {
    this.#tableElements.forEach((ele, i) => {
      const value = edit
        ? ele.querySelector('.input').value
        : this.#oldValues[i];
      ele.innerHTML = '';
      ele.textContent = value;
      if (ele.classList.contains('status')) {
        ele.classList.remove('green', 'red');
        ele.classList.add(`${value === 'In Stock' ? 'green' : 'red'}`);
      }
    });
    this.#btnContainer.innerHTML = this.#btnEditMarkup();
  }

  #toggleRemoveBtn() {
    this.#removeEle.classList.toggle('hidden');
  }

  #gettingID(btn) {
    return parseInt(
      btn.closest('.table__row').querySelector('.id').textContent.split('')[1]
    );
  }

  #clearOldValues() {
    this.#oldValues.splice(0);
  }

  #newValuesArr() {
    return this.#tableElements.map(ele => ele.textContent);
  }

  #inputMarkup(number, select) {
    return select
      ? `
       <select id="product__available" class="input input__edit padding-top-bot__small">
          <option value="In Stock">In Stock</option>
          <option value="out of Stock">out of Stock</option>
        </select>
      `
      : `
     <input
        type="${number ? 'number' : 'text'}"
        class="input input__edit"
    />
    `;
  }

  #btnsMarkup() {
    return `
        <button class="btn btn-mark btn__correct">&#x2713;</button>
        <button class="btn btn-mark btn__wrong">&#x2717;</button>
    `;
  }

  #btnEditMarkup() {
    return `
        <button class="btn btn__edit">
            <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="icon__edit">
                <path
                    d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z"
                />
            </svg>
        </button>
    `;
  }
}

export default new Edit();
