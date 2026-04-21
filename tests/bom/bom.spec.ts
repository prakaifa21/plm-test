import test, { expect, Page } from "@playwright/test";

const login = async (page: Page, username: string, password: string, url: string) => {
    await page.goto(url);
    await page.getByPlaceholder('Use your Username from Active Directory').fill(username);
    await page.getByPlaceholder('Use your Password from Active Directory').fill(password);
    await page.getByRole('button', { name: 'Login' }).click()
    await expect(page).toHaveURL('https://thongthai-plm-dev.web.app');
    await expect(page.getByText('PLM Landing Page')).toBeVisible();
}



const newmaterialCase = async (page: Page) => {

    await page.goto('https://thongthai-plm-dev.web.app/style/bom/4279/create/2', {
        waitUntil: 'networkidle' // Waits until there are no new network requests
    });
    const timestamp = new Date().toLocaleString("en-GB").replace(/\//g, "-");
    await page.getByPlaceholder('Name', { exact: true }).fill(`Create by playwright ${timestamp}`);
    const textArray = await page.locator('.sc-hKgJUU.cPpyKV.title-wrapper span').allTextContents();
    const fabricSection = textArray[0]; // section one
    await page.locator(`.sc-hKgJUU.cPpyKV.title-wrapper span:text("${fabricSection}")`).click();

    // Get rows and collect data
    const parentClass = await page.locator("div.sc-hKgJUU.cPpyKV.children-wrapper.open").getAttribute('class');
    const rows = await page.locator("div.sc-hKgJUU.cPpyKV.children-wrapper.open div[role='row']").all();
    let rowData: { rowId: string | null; inputIds: string[]; inputPlaces: string[] }[] = [];

    // Collect data for each row
    for (const row of rows) {
        const rowId = await row.getAttribute('data-row-id'); // Get row ID
        const inputElements = await row.locator('input.ant-input').all();
        let inputIds: string[] = [];
        let inputPlaces: string[] = [];
        for (const input of inputElements) {
            const inputId = await input.getAttribute('id');
            const inputPlace = await input.getAttribute('placeholder');
            if (inputId) inputIds.push(inputId);
            if (inputPlace) inputPlaces.push(inputPlace);
        }
        rowData.push({ rowId, inputIds, inputPlaces });
    }

    // Loop through rowData to fill inputs dynamically
    for (let i = 0; i < rowData.length; i++) {
        const row = rowData[i];
        console.log(`Row ${row.rowId} `);
        if (i === 0) {
            console.log(`Row ${row.rowId} has inputId = 0, executing enterRow.`);

            if (row.inputIds.some(id => id.includes('materialRef'))) {
                    const index = row.inputIds.findIndex(id => id.includes('materialRef'));
                    const inputElement = await page.locator(`input[id="${row.inputIds[index]}"]`);
                    const value =  '677854'; // Example: '677854' for first row, 'T' for second row
                    await inputElement.fill(value);
                    console.log('fill new material')
            }
            if (row.inputIds.some(id => id.includes('materialName'))) {
                    const index = row.inputIds.findIndex(id => id.includes('materialName'));
                    const inputElement = await page.locator(`input[id="${row.inputIds[index]}"]`);
                    const value = (i === 0) ? 'weftknitted' : 'Other material name'; // Adjust this as needed
                    await inputElement.fill(value);
                } 
            if (row && row.inputPlaces.includes('Material Type')) {
                // เลือก input ที่ไม่เป็น disabled และไม่พบหลายตัวเลือก
                const input = await page.locator('input[placeholder="Material Type"]:not([disabled])').first();
                
                // ตรวจสอบว่าพบ input หรือไม่
                if (await input.count() > 0) {
                    await input.click();  // คลิกเพื่อเปิด dropdown
                    await page.getByRole('option', { name: 'Fabrics' }).click();  // เลือก "Fabrics"
                    console.log('Material Type selected as Fabrics.');
                } else {
                    console.log('No clickable input found for Material Type.');
                }
            }
            if (row && row.inputPlaces.includes('Material Categories')) {
                // เลือก input ที่ไม่เป็น disabled และไม่พบหลายตัวเลือก
                const input = await page.locator('input[placeholder="Material Categories"]:not([disabled])').first();
                
                // ตรวจสอบว่าพบ input หรือไม่
                if (await input.count() > 0) {
                    await input.fill('S');  // คลิกเพื่อเปิด dropdown
                    await page.getByRole('option', { name: 'SATIN' }).click(); 
                    console.log('Material Categories selected as SATIN.');
                } else {
                    console.log('No clickable input found for Material Type.');
                }
            }
            if (row && row.inputPlaces.includes('Construction')) {
                // เลือก input ที่ไม่เป็น disabled และไม่พบหลายตัวเลือก
                const input = await page.locator('input[placeholder="Construction"]:not([disabled])').first();
                
                // ตรวจสอบว่าพบ input หรือไม่
                if (await input.count() > 0) {
                    await input.fill('S');  // คลิกเพื่อเปิด dropdown
                    await page.getByRole('option', { name: 'SATIN' }).click(); 
                    console.log('Construction selected as SATIN.');
                } else {
                    console.log('No clickable input found for Material Type.');
                }
            }
            if (row.inputIds.some(id => id.includes('purchaseConversionRatio'))) {
                const index = row.inputIds.findIndex(id => id.includes('purchaseConversionRatio'));
                const inputElement = await page.locator(`input[id="${row.inputIds[index]}"]`);
                const value = (i === 0) ? '22' : 'Other material name'; // Adjust this as needed
                await inputElement.fill(value);
            } 
            if (row.inputIds.some(id => id.includes('seriationNo'))) {
                const index = row.inputIds.findIndex(id => id.includes('seriationNo'));
                const inputElement = await page.locator(`input[id="${row.inputIds[index]}"]`);
                await inputElement.fill('120');
            } 
            if (row.inputIds.some(id => id.includes('SSPUsage'))) {
                const index = row.inputIds.findIndex(id => id.includes('SSPUsage'));
                const inputElement = await page.locator(`input[id="${row.inputIds[index]}"]`);
                await inputElement.fill('1.2');
            } 
            if (row && row.inputPlaces.includes('Supplier')) {
                // เลือก input ที่ไม่เป็น disabled และไม่พบหลายตัวเลือก
                const input = await page.locator('input[placeholder="Supplier"]:not([disabled])').first();
                
                // ตรวจสอบว่าพบ input หรือไม่
                if (await input.count() > 0) {
                    await input.fill('G-0020');
                    await page.getByRole('option').first().click();
                    console.log('Supplier selected');
                } else {
                    console.log('No clickable input found for Material Type.');
                }
            }
            if (row && row.inputPlaces.includes('Technology UOM')) {
                // เลือก input ที่ไม่เป็น disabled และไม่พบหลายตัวเลือก
                const input = await page.locator('input[placeholder="Technology UOM"]:not([disabled])').first();
                
                // ตรวจสอบว่าพบ input หรือไม่
                if (await input.count() > 0) {
                    await input.fill('5');
                    await page.getByRole('option').first().click();
                    console.log('Technology UOM selected');
                } else {
                    console.log('No clickable input found for Material Type.');
                }
            }
            if (row && row.inputPlaces.includes('Purchase UOM')) {
                // เลือก input ที่ไม่เป็น disabled และไม่พบหลายตัวเลือก
                const input = await page.locator('input[placeholder="Purchase UOM"]:not([disabled])').first();
                
                // ตรวจสอบว่าพบ input หรือไม่
                if (await input.count() > 0) {
                    await input.fill('t');
                    await page.getByRole('option').first().click();
                    console.log('Purchase UOM selected');
                } else {
                    console.log('No clickable input found for Material Type.');
                }
            }
            if (row.inputIds.some(id => id.includes('matchColor'))) {
                const labelLocator = page.locator('label', { hasText: 'Match Color' });
                const inputLocator = labelLocator.locator('input');
                
                await inputLocator.waitFor({ state: 'visible', timeout: 5000 });
                await inputLocator.click();
                console.log('Clicked Match Color field');
            } else {
                console.log('No field found with matchColor in the id.');
            }
       

            
            if (!row.inputIds.some(id => id.includes('disabled'))) {
                for (const id of row.inputIds) {
                    const inputLocator = page.locator(`input[id="${id}"]`);
                try {
                    // Wait for the input to be visible
                    await inputLocator.waitFor({ state: 'visible', timeout: 5000 });
        
                    // Check if the input is disabled
                    const isDisabled = await inputLocator.isDisabled();
        
                    if (isDisabled) {
                        console.log(`Field with ID: ${id} is disabled, skipping.`);
                        continue; // Skip disabled field
                    }
        
                    // If the field is enabled, proceed with filling it
                    const value = await inputLocator.inputValue();
                    
                    if (value === '') {
                        console.log(`Field with ID: ${id} is empty and enabled, filling with random text.`);
                        const randomText = Math.random().toString(36).substring(2, 7);
                        await inputLocator.fill(randomText);
                    } else {
                        console.log(`Field with ID: ${id} already has a value: ${value}`);
                    }
                } catch (error) {
                    console.log(`Error or timeout while interacting with field with ID: ${id}.`);
                }
            }
            }

        }

    }
  const button = page.getByRole("button", {name:"Save"});
  await button.click()
    
    }




test('Create Bom', async ({ page }) => {
    await login(page, 'support@konsys.co', '12345', 'https://thongthai-plm-dev.web.app/login'); // ล็อกอิน
    //await synchronizeCase(page);
    await newmaterialCase(page);
});
