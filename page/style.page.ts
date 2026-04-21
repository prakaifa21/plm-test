import { expect, Locator, Page } from "@playwright/test";
import { styleDatas } from "../interfaces/style.interface";

export class StylePage {
    readonly page: Page;
    readonly gender: Locator 
    readonly style: Locator 
    readonly brand: Locator 
    readonly yearSeason: Locator 
    readonly status: Locator 
    readonly styleUOM: Locator 
    readonly productType: Locator 
    readonly country: Locator 
    readonly factoryId: Locator 
    readonly segment: Locator 
    readonly projectLeadTime: Locator 
    readonly productPriorityName: Locator 
    readonly productPriorityProcess1: Locator 
    readonly productPriorityProcess2: Locator
    readonly customContact: Locator
    readonly devoloper: Locator
    readonly cadPattern: Locator
    readonly stylename: Locator
    readonly modelNo: Locator
    readonly styleStatus: Locator
    readonly series: Locator
    readonly developerT1: Locator
    readonly forecastQTY: Locator
    readonly garmanrLeadtime: Locator
    readonly buyReadyDate: Locator
    readonly creationCenter: Locator
    readonly specialUsage: Locator
    readonly sizePage: Locator
    readonly sourcingSizes: Locator
    readonly baseSize: Locator
    readonly saveBtn: Locator

    constructor(page: Page) {
        this.page = page;
        this.gender = page.locator('.ant-select-selector').nth(0);
        this.style = page.locator('.ant-select-selector').nth(1);
        this.brand = page.locator('.ant-select-selector').nth(2);
        this.yearSeason = page.locator('.ant-select-selector').nth(3);
        this.status = page.locator('.ant-select-selector').nth(4);
        this.styleUOM = page.locator('.ant-select-selector').nth(5);
        this.productType = page.locator('.ant-select-selector').nth(6);
        this.factoryId = page.locator('.ant-select-selector').nth(8);
        this.segment = page.locator('.ant-select-selector').nth(9);
        this.projectLeadTime = page.locator('.ant-select-selector').nth(10);
        this.productPriorityName = page.locator('.ant-select-selector').nth(11);
        this.productPriorityProcess1 = page.locator('.ant-select-selector').nth(12);
        this.productPriorityProcess2 = page.locator('.ant-select-selector').nth(13);
        this.customContact = page.locator('.ant-input').nth(0);
        this.devoloper = page.locator('.ant-input').nth(1);
        this.cadPattern = page.locator('.ant-input').nth(2);
        this.stylename = page.locator('.ant-input').nth(3);
        this.modelNo = page.locator('.ant-input').nth(4);
        this.styleStatus = page.locator('.ant-input').nth(5);
        this.series = page.locator('.ant-input').nth(6);
        this.developerT1 = page.locator('.ant-input').nth(7);
        this.forecastQTY = page.locator('.ant-input').nth(8);
        this.garmanrLeadtime = page.locator('.ant-input').nth(9);
        this.buyReadyDate = page.locator('.ant-input').nth(10);
        this.creationCenter = page.locator('.ant-input').nth(11);
        this.specialUsage = page.locator('.ant-input').nth(12);
        this.sizePage = page.locator('.ant-input').nth(14);
        this.sourcingSizes = page.locator('.ant-input').nth(15);
        this.baseSize = page.locator('.ant-input').nth(16);
        this.saveBtn = page.locator('button:has-text("create")');
    }

    async createStyle(styleData: styleDatas): Promise<string> {
        await this.page.goto('/style');
        await this.page.getByRole('button', { name: 'Add new Style' }).click();

        const randomNumber = Math.floor(Math.random() * 1000);
        const createdStyleNo = `${styleData.styleName}_${randomNumber}`;
        const formChecks = { sentTCP: 0, isSample: 1, isPreCost: 2, isReadyForBulk: 3 };
        const inputField = (i: number) => this.page.locator('.ant-input').nth(i);
        const checkboxField = (i: number) => this.page.locator('.ant-checkbox-input').nth(i);
        const selectByText = async (field: Locator, text: string) => {
            const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            await field.click();
            await this.page
                .locator('.ant-select-item')
                .filter({ hasText: new RegExp(`^${escapeRegExp(text)}$`) })
                .click();
        };
        const selectWithEnter = async (field: Locator, text: string) => {
            await field.click();
            const input = field.locator('.ant-select-selection-search-input');
            await input.fill(text);
            await input.press('Enter');
        };

        await selectByText(this.gender, styleData.gender);
        await selectWithEnter(this.style, createdStyleNo);
        await selectByText(this.brand, styleData.brand);
        await selectByText(this.yearSeason, styleData.yearSeason);
        await selectByText(this.status, styleData.status);

        await this.customContact.fill(styleData.customcontactInput);
        await this.devoloper.fill(styleData.developer);
        await this.cadPattern.fill(styleData.cadPattern);
        await this.stylename.fill(styleData.styleNames);

        await selectByText(this.styleUOM, styleData.styleUOM);
        await selectWithEnter(this.productType, styleData.productType);

        await this.modelNo.fill(styleData.modelNo);
        await this.styleStatus.fill(styleData.styleStatus);

        const offset = styleData.tpc ? -1 : 0;
        if (styleData.tpc) await checkboxField(formChecks.sentTCP).check();

        await this.series.fill(styleData.series);
        await inputField(7 + offset).fill(styleData.developerT1);
        await inputField(8 + offset).fill(styleData.forecastQTY);
        if (styleData.isSample) await checkboxField(formChecks.isSample).check();
        if (styleData.isPreCost) await checkboxField(formChecks.isPreCost).check();

        await selectByText(this.factoryId, styleData.factoryId);

        await inputField(9 + offset).fill(styleData.garmentLeadTime);
        await inputField(10 + offset).fill(styleData.buyReadyDate);
        await inputField(11 + offset).fill(styleData.creationCenter);
        await inputField(12 + offset).fill(styleData.specialUsage);

        await selectByText(this.segment, styleData.Segment);
        await selectByText(this.projectLeadTime, styleData.projectLeadTime);
        await selectByText(this.productPriorityName, styleData.productPriorityName);
        await selectByText(this.productPriorityProcess1, styleData.productPriorityProcess1);
        await selectByText(this.productPriorityProcess2, styleData.productPriorityProcess2);
        if (styleData.isReadyForBulk) await checkboxField(formChecks.isReadyForBulk).check();

        await inputField(13 + offset).fill(styleData.sizePage);
        await inputField(14 + offset).fill(styleData.sourcingSizes);
        await inputField(15 + offset).fill(styleData.baseSize);

        const saveBtn = this.page.locator('button:has-text("create")');
        const disabledAttr = await saveBtn.getAttribute('disabled');
        if (!disabledAttr) {
            await Promise.all([this.page.waitForLoadState('networkidle'), saveBtn.click()]);
            return createdStyleNo;
        }
        throw new Error('Create button is disabled');
    }

    async expectStyleDetail(styleData: styleDatas, createdStyleNo: string) {
        await this.page.getByPlaceholder('Style No').nth(0).fill(createdStyleNo);
        await this.page.waitForLoadState('networkidle');
        const styleFound = this.page.locator('.ant-table-tbody .ant-table-cell', {
            hasText: createdStyleNo
        }).nth(0);

        await styleFound.click({ delay: 6000 });
        await expect(this.page.locator('h2.ant-typography')).toHaveText(`Style Detail (${createdStyleNo})`);

        const checkDetail = [
            { label: 'Gender', expect: styleData.gender },
            { label: 'Style No', expect: createdStyleNo },
            { label: 'Brand', expect: styleData.brand },
            { label: 'Year Season', expect: styleData.yearSeason },
            { label: 'Status', expect: styleData.status },
            { label: 'Custom contact', expect: styleData.customcontactInput },
            { label: 'Developer', expect: styleData.developer },
            { label: 'CAD Pattern Maker', expect: styleData.cadPattern },
            { label: 'Style Name', expect: styleData.styleNames },
            { label: 'Style UOM', expect: styleData.styleUOM },
            { label: 'Product Type', expect: styleData.productType },
            { label: 'Model No.', expect: styleData.modelNo },
            { label: 'Style Status', expect: styleData.styleStatus },
            { label: 'Series', expect: styleData.series },
            { label: 'Country', expect: styleData.country },
            { label: 'Is Sample', expect: styleData.isSample },
            { label: 'Is Pre Cost', expect: styleData.isPreCost },
            { label: 'DeveloperT1', expect: styleData.developerT1 },
            { label: 'ForecastQTY', expect: styleData.forecastQTY },
            { label: 'Factory Id', expect: styleData.factoryId },
            { label: 'Garment Lead Time', expect: styleData.garmentLeadTime },
            { label: 'Segment', expect: styleData.Segment },
            { label: 'Buy Ready Date (MM/DD/YYYY)', expect: styleData.buyReadyDate },
            { label: 'Is Ready For Bulk', expect: styleData.isReadyForBulk },
            { label: 'Creation Center', expect: styleData.creationCenter },
            { label: 'Special Usage', expect: styleData.specialUsage },
            { label: 'Size Page', expect: styleData.sizePage },
            { label: 'Sourcing Sizes', expect: styleData.sourcingSizes },
            { label: 'Base Size', expect: styleData.baseSize },
        ];

        const getDetailRow = (label: string) =>
            this.page.locator('.sc-hKgJUU.sc-iqHYmW.gCCRCV.jZXTJq', {
                has: this.page.locator('span.ant-typography', { hasText: new RegExp(`^\\*?\\s*${label}$`) })
            });
        const expectDetailText = async (label: string, text: string) => {
            await expect(getDetailRow(label).locator('strong')).toHaveText(text);
        };

        for (const field of checkDetail) {
            const escapeRegExp = (text: string) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const safeLabel = escapeRegExp(field.label);

            if (field.label === 'Is Sample' || field.label === 'Is Pre Cost' || field.label === 'Is Ready For Bulk') {
                if (field.expect === true) await expectDetailText(field.label, 'TRUE');
                continue;
            }

            if (field.label === 'Series') {
                const seriesText = styleData.tpc === false ? `ส่ง TPC : ${field.expect}` : 'ไม่ส่ง TPC';
                await expectDetailText(field.label, seriesText);
                continue;
            }

            const expectText = String(field.expect);
            await expectDetailText(safeLabel, expectText);
        }
    }
}
