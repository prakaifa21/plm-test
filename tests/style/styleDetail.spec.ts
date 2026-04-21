import { Page } from "@playwright/test";
import { styleDatas } from "../../interfaces/style.interface";
import { StylePage } from "../../page/style.page";

export const creatStype = async (page: Page, styleData: styleDatas, createdStyleNo?: string) => {
    const stylePage = new StylePage(page);
    await stylePage.expectStyleDetail(styleData, createdStyleNo ?? styleData.styleName);
};