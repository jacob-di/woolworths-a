import { test, expect } from '@playwright/test';
import { RegistrationFormPage } from '../pages/RegistrationFormPage';

const BASE_URL = 'https://www.way2automation.com/way2auto_jquery/registration.php#load_box';

test.beforeEach(async ({ page, context }) => {
  await context.tracing.start({ screenshots: true, snapshots: true });
  await page.goto(BASE_URL);
});

test.afterEach(async ({context}) => {
  await context.tracing.stop({ path: 'trace.zip' });
});

test('test', async ({ page }) => {

  expect(await page.locator('h1').innerText()).toBe('Registration'); // on the page

  const submitForm = new RegistrationFormPage(page);
  await submitForm.verifyIsEmpty();

  // fill the form
  await submitForm.fillFirstName('John');
  await submitForm.fillLastName('Doe');
  await submitForm.selectMaritalStatus('Single');
  await submitForm.selectMaritalStatus('Married');
  await submitForm.selectHobby('Cricket');
  await submitForm.selectCountry('India');
  await submitForm.selectDob('1', '1', '2014');
  await submitForm.fillPhone('0412312312');
  await submitForm.fillUserName('jd_user');
  await submitForm.fillEmail('john.doe@example.com');
  await submitForm.uploadImage('picture.png');
  await submitForm.fillAboutMe('123456789_123456789_123456789_123456789_1234567890');
  await submitForm.fillPassword('password');
  await submitForm.fillRepeatPassword('password');

  // submit the form
  await submitForm.clickButtonSubmit();

  // verify the form is empty after submision
  expect(await page.locator('h1').innerText()).toBe('Registration');
  await submitForm.verifyIsEmpty();
});
