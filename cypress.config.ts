import { defineConfig } from "cypress";
import createBundler from '@bahmutov/cypress-esbuild-preprocessor';
import { addCucumberPreprocessorPlugin } from '@badeball/cypress-cucumber-preprocessor';
import createEsbuildPlugin from '@badeball/cypress-cucumber-preprocessor/esbuild';

async function setupNodeEvents(
  on: Cypress.PluginEvents,
  config: Cypress.PluginConfigOptions
): Promise<Cypress.PluginConfigOptions> {
  // Add Cucumber Preprocessor Plugin
  await addCucumberPreprocessorPlugin(on, config);

  // Set up file preprocessor for handling feature files with ESBuild
  on(
    'file:preprocessor',
    createBundler({
      plugins: [createEsbuildPlugin(config)],
    })
  );

  return config;
}

export default defineConfig({
  e2e: {
    baseUrl: "https://ancabota09.wixsite.com/intern",  
    chromeWebSecurity: false,  
    specPattern: 'cypress/e2e/**/*.feature',  
    supportFile: 'cypress/support/e2e.ts',  
    setupNodeEvents,  // Call setupNodeEvents function for plugin configuration
  },
});
