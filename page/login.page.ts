import { Locator,Page } from "@playwright/test";


export class LoginPage {
    readonly page: Page;
    readonly email :Locator;
    readonly password :Locator;
    readonly loginButton :Locator;

    constructor(page: Page){
        this.page = page;
        this.email = page.getByPlaceholder('Use your Username from Active Directory');
        this.password = page.getByPlaceholder('Use your Password from Active Directory');
        this.loginButton = page.getByRole('button', {name: "Login"});
    }

     async login(email: string, password: string){
           await this.page.goto('/');
           await this.email.fill(email);
           await this.password.fill(password)
           await this.loginButton.click();
        }
}