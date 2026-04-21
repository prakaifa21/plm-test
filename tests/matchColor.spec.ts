import { test, expect, Page, Locator } from "@playwright/test";
import { matchData } from "../interfaces/bom.interface";
import { openSectionByIndex } from "../utils/sectionUtils";
import { createStage } from "../utils/stageUtils";

export const matchcolorCase = async (page: Page, dataMatch: matchData) => {
    // caseNoMatch customer
    await page.goto("style/bom/295/create/146", {
        waitUntil: "networkidle",
    });
    // const stage = await createStage(page);
    // console.log("stageName", stage)
    const section = await openSectionByIndex(page, dataMatch.sectionIndex);
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
    console.log('click ')
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


const fillEmptyPlaceholderInputs = async (
  wrapper: Locator,
  values: string[]
): Promise<void> => {
  const inputs = wrapper.locator('input:not([placeholder]), input[placeholder=""]');

  let valueIndex = 0;
  const count = await inputs.count();

  for (let i = 0; i < count; i++) {
    if (valueIndex >= values.length) break;

    const field = inputs.nth(i);

    const isDisabled =
      (await field.isDisabled()) ||
      (await field.getAttribute("aria-disabled")) === "true";

    if (isDisabled) continue;

    const currentValue = await field.inputValue();
    if (currentValue?.trim()) continue;

    await field.fill(values[valueIndex]);
    console.log(`Filled empty input with ${values[valueIndex]}`);

    valueIndex++;
  }
};


const wrapper = page.locator("div.sc-hKgJUU.cPpyKV.children-wrapper.open");

await fillFields(page, wrapper, {
    "Material Ref": dataMatch.materialRef,
    "Material Name": dataMatch.materialName,
    "Material Type": dataMatch.materialType,
    "Material Categories": dataMatch.matcate,
    "Construction": dataMatch.perchaseUOM,
    "Purchase Conversion Ratio": dataMatch.purchaseConversion,
    "Supplier": dataMatch.supplier,
    "Technology UOM": dataMatch.technologyUOM,
    "Purchase UOM": dataMatch.perchaseUOM,
    "Customer": dataMatch.customer,
    "Supply Mode": dataMatch.supplyMode,
    "Remark": dataMatch.Remark,
    "Seriation No": dataMatch.seriation,
    "Part No": dataMatch.partNo,
    "Part Name": dataMatch.partName,
    "checkbox:matchColor": dataMatch.matchColor,
    //"Color": dataMatch.color,
    "checkbox:matchSize": dataMatch.matchSize,
    "Material Spec Adjustment": dataMatch.specAdjustment,
    "SSP Usage": dataMatch.ssp,
    "checkbox:matchCountry": dataMatch.MatchCountry,
    "Part Id": dataMatch.partid,
    "Usage Percent": dataMatch.UsagePercent,
    "checkbox:usageConfirm": dataMatch.UsageConfirm,
    "checkbox:matchUsage": dataMatch.MatchUsage
});

await fillEmptyPlaceholderInputs(wrapper, dataMatch.Artcle);

 const button = page.getByRole("button", {name:"Save"});
  await button.click()
};
