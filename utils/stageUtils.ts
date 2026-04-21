import { expect, Page } from "@playwright/test";
import { bomPage } from "../page/bomPage";

export const createStage = async (page: Page): Promise<string> => {
  return new bomPage(page).createStage();
};
