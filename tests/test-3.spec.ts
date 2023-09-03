import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByRole('link', { name: 'Report' }).click();
  await page.getByPlaceholder('Start Date').fill('2023-09-01');
  await page.getByRole('combobox').selectOption('42');
});