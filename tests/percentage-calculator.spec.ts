
import { test, expect, Page } from '@playwright/test';
import { goToCalculator, switchTheme } from './helpers';

// Known-good test vectors for the Percentage Calculator
const testVectors = {
    percentOf: [
        { a: 10, b: 50, expected: '5' },
        { a: 25, b: 200, expected: '50' },
        { a: 150, b: 80, expected: '120' },
    ],
    isWhatPercent: [
        { a: 5, b: 50, expected: '10' },
        { a: 20, b: 200, expected: '10' },
        { a: 75, b: 150, expected: '50' },
    ],
    percentageChange: [
        { a: 100, b: 120, expected: '20' },
        { a: 50, b: 25, expected: '-50' },
        { a: 80, b: 100, expected: '25' },
    ]
};

test.describe('Percentage Calculator', () => {

  test.beforeEach(async ({ page }) => {
    await goToCalculator(page, 'Percentage Calculator', 'percentage-calculator');
  });

  test('Page loads and has correct initial state', async ({ page }) => {
    await expect(page.getByTestId('mode-select-trigger')).toContainText('What is X% of Y?');
    await expect(page.getByTestId('input-a')).toHaveValue('10');
    await expect(page.getByTestId('input-b')).toHaveValue('50');
    await expect(page.getByTestId('result-value')).toContainText('5');
  });
  
  test('Keyboard navigation works correctly', async ({ page }) => {
    await page.press('body', 'Tab'); // Focus mode select
    await expect(page.getByTestId('mode-select-trigger')).toBeFocused();
    
    await page.press('body', 'Tab'); // Focus input A
    await expect(page.getByTestId('input-a')).toBeFocused();
    
    await page.press('body', 'Tab'); // Focus input B
    await expect(page.getByTestId('input-b')).toBeFocused();
  });

  test.describe('Calculation Mode: "What is X% of Y?"', () => {
    testVectors.percentOf.forEach((vector, index) => {
        test(`calculates correctly for vector ${index + 1}`, async ({ page }) => {
            await page.getByTestId('input-a').fill(vector.a.toString());
            await page.getByTestId('input-b').fill(vector.b.toString());
            await expect(page.getByTestId('result-value')).toHaveText(vector.expected);
        });
    });

    test('handles zero and invalid inputs', async ({ page }) => {
        await page.getByTestId('input-a').fill('0');
        await page.getByTestId('input-b').fill('100');
        await expect(page.getByTestId('result-value')).toHaveText('0');
        
        await page.getByTestId('input-a').fill('10');
        await page.getByTestId('input-b').fill('0');
        await expect(page.getByTestId('result-value')).toHaveText('0');
    });
  });

  test.describe('Calculation Mode: "X is what percent of Y?"', () => {
    test.beforeEach(async ({ page }) => {
        await page.getByTestId('mode-select-trigger').click();
        await page.getByRole('option', { name: 'X is what percent of Y?' }).click();
    });

    testVectors.isWhatPercent.forEach((vector, index) => {
        test(`calculates correctly for vector ${index + 1}`, async ({ page }) => {
            await page.getByTestId('input-a').fill(vector.a.toString());
            await page.getByTestId('input-b').fill(vector.b.toString());
            await expect(page.getByTestId('result-value')).toContainText(vector.expected);
        });
    });
    
    test('handles division by zero', async ({ page }) => {
        await page.getByTestId('input-a').fill('10');
        await page.getByTestId('input-b').fill('0');
        await expect(page.getByTestId('result-container')).toContainText('Enter values to calculate');
    });
  });

  test.describe('Calculation Mode: "Percentage change from X to Y"', () => {
      test.beforeEach(async ({ page }) => {
          await page.getByTestId('mode-select-trigger').click();
          await page.getByRole('option', { name: 'Percentage change from X to Y' }).click();
      });

      testVectors.percentageChange.forEach((vector, index) => {
          test(`calculates correctly for vector ${index + 1}`, async ({ page }) => {
              await page.getByTestId('input-a').fill(vector.a.toString());
              await page.getByTestId('input-b').fill(vector.b.toString());
              await expect(page.getByTestId('result-value')).toContainText(Math.abs(Number(vector.expected)).toString());
              const label = Number(vector.expected) > 0 ? 'Increase' : 'Decrease';
              await expect(page.getByTestId('result-label')).toContainText(label);
          });
      });
  });
  
  test('Theme toggle works correctly', async ({ page }) => {
    await switchTheme(page, 'dark');
    await switchTheme(page, 'light');
  });

});
