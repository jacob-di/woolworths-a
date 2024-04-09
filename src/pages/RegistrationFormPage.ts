import { Locator, Page, expect } from '@playwright/test';

export class RegistrationFormPage {
  private page: Page;

  private firstName: Locator;
  private lastName: Locator;

  //maritalStatus
  private maritalStatusSingle: Locator;
  private maritalStatusMarried: Locator;
  private maritalStatusDivorced: Locator;

  //hobby
  private hobbyReading: Locator;
  private hobbyDance: Locator;
  private hobbyCricket: Locator;

  private country: Locator;

  //DOB
  private dobMonth: Locator;
  private dobDay: Locator;
  private dobYear: Locator;

  private phone: Locator;
  private userName: Locator;
  private email: Locator;
  private image: Locator;
  private aboutMe: Locator;
  private password: Locator;
  private repeatPassword: Locator;
  private buttonSubmit: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstName = page.locator('#register_form input[name="name"]');
    this.lastName = page.locator('p').filter({ hasText: 'Last Name:' }).getByRole('textbox');

    //maritalStatus
    this.maritalStatusSingle = page.getByLabel('Single');
    this.maritalStatusMarried = page.getByLabel('Married');
    this.maritalStatusDivorced = page.getByLabel('Divorced');

    //hobby
    this.hobbyReading = page.getByLabel('Reading');
    this.hobbyDance = page.getByLabel('Dance');
    this.hobbyCricket = page.getByLabel('Cricket');

    this.country = page.locator('fieldset').filter({ hasText: 'Country: India India' }).getByRole('combobox');

    //DOB
    this.dobMonth = page.locator('#register_form div').filter({ hasText: 'Month' }).getByRole('combobox');
    this.dobDay = page.locator('#register_form div').filter({ hasText: 'Day' }).getByRole('combobox');
    this.dobYear = page.locator('#register_form div').filter({ hasText: 'Year' }).getByRole('combobox');

    this.phone = page.locator('#register_form input[name="phone"]');
    this.userName = page.locator('#register_form input[name="username"]');
    this.email = page.locator('#register_form input[name="email"]');
    this.image = page.locator('input[type="file"]');
    this.aboutMe = page.locator('textarea');
    this.password = page.locator('#register_form input[name="password"]');
    this.repeatPassword = page.locator('input[name="c_password"]');

    this.buttonSubmit = page.getByRole('button', { name: 'submit' });
    
  }

  // Verify the form is empty
  async verifyIsEmpty() {
    await expect((await this.firstName.inputValue()).length).toBe(0);
    await expect((await this.lastName.inputValue()).length).toBe(0);
    await expect(await this.maritalStatusSingle.isChecked()).toBe(false);
    await expect(await this.maritalStatusMarried.isChecked()).toBe(false);
    await expect(await this.maritalStatusDivorced.isChecked()).toBe(false);
    await expect(await this.hobbyReading.isChecked()).toBe(false);
    await expect(await this.hobbyDance.isChecked()).toBe(false);
    await expect(await this.hobbyCricket.isChecked()).toBe(false);
    await expect((await this.phone.inputValue()).length).toBe(0);
    await expect((await this.userName.inputValue()).length).toBe(0);
    await expect((await this.email.inputValue()).length).toBe(0);
    await expect((await this.aboutMe.inputValue()).length).toBe(0);
    await expect((await this.password.inputValue()).length).toBe(0);
    await expect((await this.repeatPassword.inputValue()).length).toBe(0);
  }

  async fillFirstName(name: string) {
    await this.firstName.fill(name)  ;
  } 

  async fillLastName(name: string) {
    await this.lastName.fill(name);
  }

  async selectMaritalStatus(maritalStatus: string) {
    if (maritalStatus === 'Single') {
      await this.maritalStatusSingle.click();
    }else if (maritalStatus === 'Married') {
      await this.maritalStatusMarried.click();
    }else if (maritalStatus === 'Divorced') {
      await this.maritalStatusDivorced.click();
    }else {
      throw new Error('Invalid marital status');
    }
  }

  async selectHobby(hobby: string) {
    if (hobby === 'Reading') {
      await this.hobbyReading.click();
    }else if (hobby === 'Dance') {
      await this.hobbyDance.click();
    } else if (hobby === 'Cricket') {
      await this.hobbyCricket.click();
    } else {
      throw new Error('Invalid hobby');
    }
  }

  async selectCountry(country: string) {
    await this.country.selectOption(country);
  }

  async selectDob(day: string, month: string, year: string) {
    await this.dobMonth.selectOption(month);
    await this.dobDay.selectOption(day);
    await this.dobYear.selectOption(year);
  }
  async selectDobMonth() {
    await this.dobMonth.click();
  }

  async selectDobDay() {
    await this.dobDay.click();
  }

  async selectDobYear() {
    await this.dobYear.click();
  }

  async fillPhone(phone: string) {
    await this.phone.fill(phone);
  }

  async fillUserName(username: string) {
    await this.userName.fill(username);
  }

  async fillEmail(email: string) {
    await this.email.fill(email);
  }

  async uploadImage(image: string) {
    await this.image.setInputFiles(image);
  }
  async fillAboutMe(aboutme: string) {
    await this.aboutMe.fill(aboutme);
  }

  async fillPassword(password: string) {
    await this.password.fill(password);
  }

  async fillRepeatPassword(password: string) {
    await this.repeatPassword.fill(password);
  }

  async clickButtonSubmit() {
    await this.buttonSubmit.click();
  }

}
