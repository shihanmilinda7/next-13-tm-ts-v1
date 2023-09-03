import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByPlaceholder('Enter your username').click();
  await page.getByPlaceholder('Enter your username').fill('admin');
  await page.getByPlaceholder('Enter your username').press('Tab');
  await page.getByPlaceholder('Enter your password').fill('admin');
  await page.getByRole('button', { name: 'Sign in' }).click();
  // await page.goto('http://localhost:3000/dashboard');
  await page.getByRole('link', { name: 'Report' }).click();
});