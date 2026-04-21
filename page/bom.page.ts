import { expect, Locator, Page } from "@playwright/test";

export class bomPage {
    readonly page: Page;
    readonly bomName: Locator;
    readonly stageMenu: Locator;
    readonly addnewButton: Locator:

    constructor(page: Page) {
        this.page = page;
        this.bomName = page.locator("h4.ant-typography", { hasText: "Factory BOM" });
        this.stageMenu = page.getByRole("menuitem", { name: "Stage" });
        this.addnewButton = page.getByRole("button", { name: "Add new Stage" })

    }

    async createStage(): Promise<string> {
        await this.stageMenu.click();
        await this.addnewButton.click();

        const modal = this.page.locator(".ant-modal");
        await expect(modal).toBeVisible();

        const selectInput = modal.locator(".ant-select-selection-search-input");
        await selectInput.click();

        const stageItem = this.page.locator(".ant-select-item-option").first();
        await expect(stageItem).toBeVisible();
        const selectedStageName = await stageItem.innerText();
        await stageItem.click();

        await Promise.all([
            modal.waitFor({ state: "hidden" }),
            this.page.getByRole("button", { name: "OK" }).click(),
        ]);

        const stageText = this.page
            .locator(".ant-typography")
            .getByText(selectedStageName, { exact: true });
        await expect(stageText).toBeVisible();
        await stageText.click();

        const currentUrl = this.page.url();
        await this.page.getByText("Add New", { exact: true }).click();
        await this.page.waitForURL((url) => url.toString() !== currentUrl);
        await expect(this.bomName).toBeVisible();

        return selectedStageName;
    }
}
