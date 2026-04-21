import { test, expect, Page, Locator } from "@playwright/test";
import { sysnData } from "../interfaces/bom.interface";
import { openSectionByIndex } from "../utils/sectionUtils";
import { fillFormFields } from "../utils/form.utils";

export const synchronizeCase = async (page: Page, sysnData: sysnData) => {
  //await page.reload();

  await page.goto("style/bom/835/create/2", {
    waitUntil: "networkidle",
  });
  // const stage = await createStage(page);
  // console.log("stageName", stage)
  const section = await openSectionByIndex(page, sysnData.sectionIndex);
  console.log("section", section);

  const rowWrapper = page.locator('div.sc-hKgJUU.cPpyKV.children-wrapper.open');
  const formData = {
    "Material Ref": sysnData.materialRef,
    "Material Name": sysnData.materialName,
    "Material Type": sysnData.materialType,
    "Material Categories": sysnData.matcate,
    "Construction": sysnData.perchaseUOM,
    "Purchase Conversion Ratio": sysnData.purchaseConversion,
    "Supplier": sysnData.supplier,
    "Technology UOM": sysnData.technologyUOM,
    "Purchase UOM": sysnData.perchaseUOM,
    "Customer": sysnData.customer,
    "Supply Mode": sysnData.supplyMode,
    "Remark": sysnData.Remark,
    "Seriation No": sysnData.seriation,
    "Part No": sysnData.partNo,
    "Part Name": sysnData.partName,
    "checkbox:matchColor": sysnData.matchColor,
    "Color": sysnData.color,
    "checkbox:matchSize": sysnData.matchSize,
    "Material Spec Adjustment": sysnData.specAdjustment,
    "SSP Usage": sysnData.ssp,
    "checkbox:matchCountry": sysnData.MatchCountry,
    "Part Id": sysnData.partid,
    "Usage Percent": sysnData.UsagePercent,
    "checkbox:usageConfirm": sysnData.UsageConfirm,
    "checkbox:matchUsage": sysnData.MatchUsage
  }
  //const FormFields = fillFormFields(page, rowWrapper, formData);

  //const wrapper = page.locator("div.sc-hKgJUU.cPpyKV.children-wrapper.open");
  await rowWrapper.locator(`input[placeholder="SSP Usage"]`).click();
  for (let i = 0; i < sysnData.enter; i++) {
    await page.keyboard.press('Enter');
  }
  const rowgroup = rowWrapper.getByRole('rowgroup');
  const rowCount = rowgroup.getByRole('row');
  const index = await rowCount.count()

  let masterMaterialRef = "";
let masterSeriationNo = "";

for (let j = 0; j < index; j++) {
    const row = rowCount.nth(j);
    
    const materialInput = row.locator("input[placeholder='Material Ref']");
    const serialTionInput = row.locator("input[placeholder='Seriation No']");

    if (j === 0) {
        await fillFormFields(page, row, formData);
        await materialInput.click({ button: 'right' });
        const menu = page.locator('nav.react-contextmenu.right-click-menu.react-contextmenu--visible');
        await menu.waitFor({ state: 'visible' });
        await menu.locator('text=Synchronize').click();
        await menu.waitFor({ state: 'hidden' }); 
        await serialTionInput.click({ button: 'right' });
        await menu.waitFor({ state: 'visible' });
        await menu.locator('text=Synchronize').click();
        await menu.waitFor({ state: 'hidden' });
        masterMaterialRef = await materialInput.inputValue();
        masterSeriationNo = await serialTionInput.inputValue();

        console.log(`Master Values Set: Material=${masterMaterialRef}, Seriation=${masterSeriationNo}`);

    } else {
        // ส่วนของ Row อื่นๆ (j > 0): ตรวจสอบว่าค่าตรงกับ Row แรกไหม    
        // ใช้ expect(...).toHaveValue() 
        await expect(materialInput).toHaveValue(masterMaterialRef);
        await expect(serialTionInput).toHaveValue(masterSeriationNo);

        console.log(`Row ${j} verified.`);
    }
}


  // await page
  //   .locator(`[value="${sysnData.materialRef}"]`)
  //   .click({button: 'right'});
  //   console.log('click')
  // const menu = page.locator('nav.react-contextmenu.right-click-menu.react-contextmenu--visible');

  // await menu.waitFor({ state: 'visible' });

  // await menu.locator('text=Synchronize').click();





};
