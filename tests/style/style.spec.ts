import { test } from "@playwright/test";
import { styleDatas } from "../../interfaces/style.interface"
import { StylePage } from "../../page/style.page";
import styleData from "../../data/style-data.json"

test.use({ storageState: 'storageState.json' });

test('create style successfully', async ({ page },) => {
  const stylePage = new StylePage(page);
  const createdStyleNo = await stylePage.createStyle(styleData as styleDatas);
  await stylePage.expectStyleDetail(styleData as styleDatas, createdStyleNo);
});


