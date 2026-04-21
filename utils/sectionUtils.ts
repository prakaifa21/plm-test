import { Page } from "@playwright/test";

export const openSectionByIndex = async (
  page: Page,
  index: number
): Promise<string> => {
  const sections = await page
    .locator('.sc-hKgJUU.cPpyKV.title-wrapper span')
    .allTextContents();
    console.log('swction', sections)
  const sectionName = sections[index];
  await page
    .locator(`.sc-hKgJUU.cPpyKV.title-wrapper span:text("${sectionName}")`)
    .click();
  return sectionName;
};