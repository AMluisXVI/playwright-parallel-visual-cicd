import { Page } from '@playwright/test';

export async function login(page: Page, username = 'admin', password = '1234') {
  await page.goto('/login.html');
  await page.getByLabel('Username').fill(username);
  await page.getByLabel('Password').fill(password);
  await page.getByRole('button', { name: 'Log In' }).click();
  await page.getByText('successful entry').waitFor();
}