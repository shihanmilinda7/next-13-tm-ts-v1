import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByPlaceholder('Enter your username').click();
  await page.getByPlaceholder('Enter your username').click();
  await page.getByPlaceholder('Enter your username').fill('admin');
  await page.getByPlaceholder('Enter your username').press('Tab');
  await page.getByPlaceholder('Enter your password').fill('admin');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByRole('link', { name: 'Staff' }).click();
  // await page.goto('http://localhost:3000/staff');
  await page.getByRole('button', { name: 'Add New' }).click();
  await page.getByPlaceholder('Name', { exact: true }).click();
  await page.getByPlaceholder('Name', { exact: true }).fill('user1');
  await page.getByRole('combobox').first().selectOption('Probation');
  await page.getByPlaceholder('Username').click();
  await page.getByPlaceholder('Username').fill('user2');
  await page.locator('div').filter({ hasText: /^UsernameRoleSelect roleAdminUser$/ }).getByRole('combobox').selectOption('user');
  await page.getByPlaceholder('Contact No').click();
  await page.getByPlaceholder('Contact No').fill('11111111');
  await page.getByPlaceholder('NIC').click();
  await page.getByPlaceholder('NIC').fill('22222222');
  await page.getByPlaceholder('Password', { exact: true }).click();
  await page.getByPlaceholder('Password', { exact: true }).fill('111');
  await page.getByPlaceholder('Confirm Password').click();
  await page.getByPlaceholder('Confirm Password').fill('111');
  await page.getByRole('button', { name: 'Submit' }).click();
});