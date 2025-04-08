// lib/msalConfig.ts
import { Configuration } from "@azure/msal-browser";

export const msalConfig: Configuration = {
  auth: {
    clientId: "a86a3bfb-b1a6-49de-a39c-14181259e5f6",
    authority: "https://login.microsoftonline.com/common", // ✅ now valid
    redirectUri: "https://cuddly-space-chainsaw-x5x9gw4q6pr6h6xjq-3000.app.github.dev/", // ✅ matches Codespace port
  
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: false,
  },
};