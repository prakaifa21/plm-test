import { LoginPage } from "../../page/loginPage";
import  login  from "../../data/user-data.json";
import test, { expect } from "@playwright/test";

test('login successful', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.login(login.email, login.password);
    await expect(page.locator('header.App-header p')).toContainText('PLM Landing Page');
    await page.waitForLoadState('networkidle');
    await page.context().storageState({ path: 'storageState.json'});
});



