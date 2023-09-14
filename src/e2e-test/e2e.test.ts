import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import { launch, PuppeteerLaunchOptions } from 'puppeteer'
import type { Browser, Page } from 'puppeteer'

// Set browser launch option. See the following for more details.
// https://pptr.dev/api/puppeteer.browserlaunchargumentoptions
const options: PuppeteerLaunchOptions = {
  headless: false,
  slowMo: 75,
  defaultViewport: {
    width: 1280,
    height: 1024,
  },
  devtools: true,
  args: ['--window-size=1680,1024'],
}

describe('End to End Testing', () => {
  let browser: Browser
  let page: Page

  beforeAll(async () => {
    browser = await launch(options)
    page = await browser.newPage()
  })

  afterAll(async () => {
    await browser.close()
  })

  test('If you click the submit button, should display the number of clicks', async () => {
    try {
      // Arrange
      await page.goto('http://localhost:3000/clientComponents')
      await page.screenshot({
        path: './src/e2e-test/before-click.png',
        fullPage: true,
      })
      const textBeforeClick = await page.$eval('p', (item) => {
        return item.textContent
      })

      // Act
      await page.click('button')
      const textAfterClick = await page.$eval('p', (item) => {
        return item.textContent
      })
      await page.screenshot({
        path: './src/e2e-test/after-click.png',
        fullPage: true,
      })

      // Assert
      expect(textBeforeClick).toBe('You clicked 0 times')
      expect(textAfterClick).toBe('You clicked 1 times')
    } catch (e) {
      console.error(e)
      expect(e).toBeUndefined()
    }
  }, 60000)
})
