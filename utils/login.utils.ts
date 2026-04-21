import { Page, expect } from "@playwright/test";

export const login = async (
  page: Page,
  username: string,
  password: string,
): Promise<void> => {
  await page.goto("/login");
  await page
    .getByPlaceholder("Use your Username from Active Directory")
    .fill(username);
  await page
    .getByPlaceholder("Use your Password from Active Directory")
    .fill(password);
  await page.getByRole("button", { name: "Login" }).click();
};
