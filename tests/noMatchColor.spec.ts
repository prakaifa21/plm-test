import { test, expect, Page, Locator } from "@playwright/test";
import { bomData } from "../interfaces/bom.interface";
import { openSectionByIndex } from "../utils/sectionUtils";
import { createStage } from "../utils/stageUtils";

export const CreateBom = async (page: Page, bomdata: bomData) => {
    // caseNoMatch customer
    await page.goto("style/bom/1086/create/1396", {
        waitUntil: "networkidle",
    });
    // const stage = await createStage(page);
    // console.log("stageName", stage)
    const section = await openSectionByIndex(page, bomdata.sectionIndex);
    console.log("section", section);
       const timestamp = new Date().toLocaleString("en-GB").replace(/\//g, "-");
    await page.getByPlaceholder('Name', { exact: true }).fill(`Create by playwright ${timestamp}`);
    const fillFields = async (
        page: Page,
        wrapper: Locator,
        fields: Record<string, string | boolean>,
    ): Promise<void> => {
        for (const [key, value] of Object.entries(fields)) {
            if (key.startsWith("checkbox:")) {
                const idPattern = key.replace("checkbox:", "");

                const checkbox = wrapper
                    .locator(`input[type="checkbox"][id*="${idPattern}"]`)
                    .first();

                if (!(await checkbox.count())) continue;

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
    await expect(checkbox).toBeChecked();
  }
}
                continue;
            }

        const field = wrapper
            .locator(`input[placeholder*="${key}"]`)
            .first();

        if (!(await field.count())) continue;

        const isDisabled =
            (await field.isDisabled()) ||
            (await field.getAttribute("aria-disabled")) === "true";

        if (isDisabled) continue;

        if (typeof value !== "string") continue;

        const currentValue = await field.inputValue();
        if (currentValue?.trim()) continue;
        await field.click();
        await field.fill(value);
        const option = page.locator('[role="listbox"] [role="option"]').first();
        try {
            await option.waitFor({ state: "visible", timeout: 2000 });
            await option.click();
        } catch {
            await field.fill(value);
        }
    }
};

const wrapper = page.locator("div.sc-hKgJUU.cPpyKV.children-wrapper.open");

await fillFields(page, wrapper, {
    "Material Ref": bomdata.materialRef,
    "Material Name": bomdata.materialName,
    "Material Type": bomdata.materialType,
    "Material Categories": bomdata.matcate,
    "Construction": bomdata.perchaseUOM,
    "Purchase Conversion Ratio": bomdata.purchaseConversion,
    "Supplier": bomdata.supplier,
    "Technology UOM": bomdata.technologyUOM,
    "Purchase UOM": bomdata.perchaseUOM,
    "Customer": bomdata.customer,
    "Supply Mode": bomdata.supplyMode,
    "Remark": bomdata.Remark,
    "Seriation No": bomdata.seriation,
    "Part No": bomdata.partNo,
    "Part Name": bomdata.partName,
    "checkbox:matchColor": bomdata.matchColor,
    "Color": bomdata.color,
    "checkbox:matchSize": bomdata.matchSize,
    "Material Spec Adjustment": bomdata.specAdjustment,
    "SSP Usage": bomdata.ssp,
    "checkbox:matchCountry": bomdata.MatchCountry,
    "Part Id": bomdata.partid,
    "Usage Percent": bomdata.UsagePercent,
    "checkbox:usageConfirm": bomdata.UsageConfirm,
    "checkbox:matchUsage": bomdata.MatchUsage
});

 const button = page.getByRole("button", {name:"Save"});
  await button.click()
};
