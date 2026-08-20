import { test, expect } from '@playwright/test';
import { login } from './helpers';

test('welcome page loads after login and matches baseline', async ({ page }) => {
  await login(page);
  await page.waitForURL('**/welcome.html**');

  await expect(page.getByRole('heading', { name: 'Welcome' })).toBeVisible();
  await expect(page).toHaveScreenshot('welcome-baseline.png');
});

test('welcome page shows the signed-in username', async ({ page }) => {
  await login(page);
  await page.waitForURL('**/welcome.html**');

  await expect(page.locator('#username')).toHaveText('admin');
});

test('logout returns to the login page', async ({ page }) => {
  await login(page);
  await page.waitForURL('**/welcome.html**');

  await page.getByRole('button', { name: 'Log out' }).click();

  await expect(page).toHaveURL(/login\.html/);
  await expect(page.getByRole('heading', { name: 'Log In' })).toBeVisible();
});