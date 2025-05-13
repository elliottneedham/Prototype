import { Configuration } from "@azure/msal-browser";

export const msalConfig: Configuration = {
  auth: {
    clientId: process.env.MS_CLIENT_ID || "a86a3bfb-b1a6-49de-a39c-14181259e5f6", // use your env variable if needed
    authority: `https://login.microsoftonline.com/${process.env.MS_TENANT_ID}`, // use environment variable for tenant ID
    redirectUri: "https://cuddly-space-chainsaw-x5x9gw4q6pr6h6xjq-3000.app.github.dev/", // Update if different
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: false,
  },
};