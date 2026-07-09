# E2E Tests

This folder contains the Playwright BDD implementation for the UkViet journey.

## Folder structure

- `features/`
  - UkViet Gherkin scenarios and validations.
- `steps/`
  - Step definitions mapping Selenium behavior to Playwright APIs.
- `fixture/`
  - Shared Playwright fixture and page object wiring.
- `pages/`
  - UkViet page object model classes.
- `utility-helper/`
  - Constants, switch-case scenario data, and date utilities.

## Running

```powershell
cd c:\1WorkSpaceHM\CoreCloudPlayGroud\end-tenancy
yarn install
yarn bddgen
yarn test:e2e
```
