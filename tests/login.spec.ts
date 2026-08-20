import { test, expect } from '@playwright/test';
import { login } from './helpers';

test('login shows successful entry message for valid credentials', async ({ page }) => {
  await login(page);

  await expect(page.getByText('successful entry')).toBeVisible();
  await expect(page).toHaveScreenshot('login-baseline.png');
});

test('login shows invalid credentials error for wrong password', async ({ page }) => {
  await page.goto('/login.html');
  await page.getByLabel('Username').fill('admin');
  await page.getByLabel('Password').fill('wrong-password');
  await page.getByRole('button', { name: 'Log In' }).click();

  await expect(page.getByText('invalid credentials')).toBeVisible();
});

test('login asks for both fields when empty', async ({ page }) => {
  await page.goto('/login.html');
  await page.getByRole('button', { name: 'Log In' }).click();

  await expect(page.getByText('Please fill in both fields')).toBeVisible();
});