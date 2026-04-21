// utils/formUtils.ts
import { Page, Locator, expect } from '@playwright/test';

export const fillFormFields = async (
    page: Page,
    wrapper: Locator, // Locator ที่คลุม Form หรือ Row นั้นๆ
    fields: Record<string, string | boolean>
): Promise<void> => {
    
    for (const [key, value] of Object.entries(fields)) {
        if (key.startsWith("checkbox:")) {
            const idPattern = key.replace("checkbox:", "");
            const checkbox = wrapper
                .locator(`input[type="checkbox"][id*="${idPattern}"]`)
                .first();

            if ((await checkbox.count()) === 0) continue;

            const isDisabled =
                (await checkbox.isDisabled()) ||
                (await checkbox.getAttribute("aria-disabled")) === "true";

            if (isDisabled) continue;

            const isChecked = await checkbox.isChecked();

            if (value === true && !isChecked) {
                const id = await checkbox.getAttribute("id");
                if (id) {
                    const label = wrapper.locator(`label[for="${id}"]`);
                    await label.click({ force: true });
                    console.log(`${id} were click`)
                    await expect(checkbox).toBeChecked(); 
                }
            }
            continue; 
        }
        if (typeof value !== "string") continue;

        const field = wrapper
            .locator(`input[placeholder*="${key}"]`)
            .first();

        if ((await field.count()) === 0) {console.log(`${field} is not found`); continue};

        const isInputDisabled =
            (await field.isDisabled()) ||
            (await field.getAttribute("aria-disabled")) === "true";

        if (isInputDisabled) {console.log(`${field} is disable`); continue;};

        const currentValue = await field.inputValue();
        if (currentValue?.trim()) continue;
        await field.click();
        await field.fill(value);
        console.log(`fill data ${value}`)
        const option = page.locator('[role="listbox"] [role="option"]').first();
        try {
            await option.waitFor({ state: "visible", timeout: 5000 });
            await option.click();
            console.log(`select material`, option.allInnerTexts())
        } catch {
        }
    }
};