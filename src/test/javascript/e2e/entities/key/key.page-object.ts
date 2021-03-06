import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class KeyComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-key div table .btn-danger'));
  title = element.all(by.css('jhi-key div h2#page-heading span')).first();

  async clickOnCreateButton(timeout?: number) {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(timeout?: number) {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons() {
    return this.deleteButtons.count();
  }

  async getTitle() {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class KeyUpdatePage {
  pageTitle = element(by.id('jhi-key-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  valueInput = element(by.id('field_value'));
  statusSelect = element(by.id('field_status'));
  itemSelect = element(by.id('field_item'));
  cartLineSelect = element(by.id('field_cartLine'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setValueInput(value) {
    await this.valueInput.sendKeys(value);
  }

  async getValueInput() {
    return await this.valueInput.getAttribute('value');
  }

  async setStatusSelect(status) {
    await this.statusSelect.sendKeys(status);
  }

  async getStatusSelect() {
    return await this.statusSelect.element(by.css('option:checked')).getText();
  }

  async statusSelectLastOption(timeout?: number) {
    await this.statusSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async itemSelectLastOption(timeout?: number) {
    await this.itemSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async itemSelectOption(option) {
    await this.itemSelect.sendKeys(option);
  }

  getItemSelect(): ElementFinder {
    return this.itemSelect;
  }

  async getItemSelectedOption() {
    return await this.itemSelect.element(by.css('option:checked')).getText();
  }

  async cartLineSelectLastOption(timeout?: number) {
    await this.cartLineSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async cartLineSelectOption(option) {
    await this.cartLineSelect.sendKeys(option);
  }

  getCartLineSelect(): ElementFinder {
    return this.cartLineSelect;
  }

  async getCartLineSelectedOption() {
    return await this.cartLineSelect.element(by.css('option:checked')).getText();
  }

  async save(timeout?: number) {
    await this.saveButton.click();
  }

  async cancel(timeout?: number) {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class KeyDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-key-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-key'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
