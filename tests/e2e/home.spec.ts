import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test.describe('MedHelper Website E2E', () => {
  test('homepage loads, displays hero, navigation, and key sections', async ({ page }) => {
    await page.goto('/')

    // Check title contains MedHelper
    await expect(page).toHaveTitle(/MedHelper/)

    // Check header and logo
    const header = page.locator('header')
    await expect(header).toBeVisible()
    await expect(header.getByText('MedHelper')).toBeVisible()

    // Check hero heading
    const heroH1 = page.locator('h1')
    await expect(heroH1).toBeVisible()
    await expect(heroH1).toContainText('Медична практика')

    // Check key section anchors
    await expect(page.locator('#features')).toBeVisible()
    await expect(page.locator('#nhsu')).toBeVisible()
    await expect(page.locator('#scales')).toBeVisible()
    await expect(page.locator('#documents')).toBeVisible()
    await expect(page.locator('#ocr')).toBeVisible()
    await expect(page.locator('#difference')).toBeVisible()
    await expect(page.locator('#how-it-works')).toBeVisible()
    await expect(page.locator('#audience')).toBeVisible()
    await expect(page.locator('#faq')).toBeVisible()
    await expect(page.locator('#contact')).toBeVisible()
  })

  test('interactive clinical calculator updates score and recommendations', async ({ page }) => {
    await page.goto('/#scales')

    // Locate the CURB-65 calculator card
    const calc = page.locator('#scales')
    await expect(calc.getByText('Калькулятор CURB-65')).toBeVisible()

    // Check initial score (age65 is checked by default: 1/5)
    await expect(calc.getByText(/1 \/ 5/)).toBeVisible()

    // Click on Confusion toggle
    const confusionCheckbox = calc.getByLabel(/Confusion/)
    await confusionCheckbox.click()

    // Score should update to 2
    await expect(calc.getByText('2 бали', { exact: true })).toBeVisible()
    await expect(calc.getByText('Помірний ризик', { exact: true })).toBeVisible()
  })

  test('faq accordion toggles answers', async ({ page }) => {
    await page.goto('/#faq')

    const faqSection = page.locator('#faq')
    const firstTrigger = faqSection.locator('button[data-state]').first()
    await expect(firstTrigger).toBeVisible()

    // Click to open
    await firstTrigger.click()
    await expect(firstTrigger).toHaveAttribute('data-state', 'open')
  })

  test('contact form validates required fields', async ({ page }) => {
    await page.goto('/#contact')

    const form = page.locator('#contact form')
    const submitBtn = form.locator('button[type="submit"]')

    // Submit empty form
    await submitBtn.click()

    // Expect validation errors
    await expect(form.getByText(/Вкажіть ваше імʼя/)).toBeVisible()
    await expect(form.getByText(/Введіть коректну адресу/)).toBeVisible()
  })

  test('accessibility scan has no critical WCAG AA violations', async ({ page }) => {
    await page.goto('/')

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .disableRules(['color-contrast']) // Some dynamic animated backgrounds tested separately
      .analyze()

    expect(accessibilityScanResults.violations).toEqual([])
  })
})
