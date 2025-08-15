
import { test, expect, Page } from '@playwright/test';

export const checkAccessibility = async (page: Page) => {
  const accessibilityScanResults = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze();
  expect(accessibilityScanResults.violations).toEqual([]);
};

export const goToCalculator = async (page: Page, calculatorName: string, slug: string) => {
    await page.goto('/');
    // Use the main search bar to navigate
    await page.getByRole('button', { name: 'Search calculators...' }).click();
    await page.getByPlaceholder('Search calculators...').fill(calculatorName);
    await page.getByRole('option', { name: calculatorName }).click();
    await expect(page).toHaveURL(`/calculators/${slug}`);
    await expect(page.getByRole('heading', { name: calculatorName })).toBeVisible();
};

export const switchTheme = async (page: Page, theme: 'light' | 'dark') => {
    await page.getByTestId('theme-toggle-trigger').click();
    await page.getByRole('menuitem', { name: theme }).click();
    await expect(page.locator('html')).toHaveAttribute('class', theme);
};
